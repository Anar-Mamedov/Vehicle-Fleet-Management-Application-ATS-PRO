// src/components/YapayZekayaSor.js

import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Input, List, Typography, Divider, Spin, message as AntMessage, Table, Switch } from "antd";
import AxiosInstance from "../../../../../../../../api/http";
import { isMarkdownTable } from "./utils/isMarkdownTable";
import { parseMarkdownTable } from "./utils/parseMarkdownTable";
import { splitMarkdownTable } from "./utils/splitMarkdownTable";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./YapayZekayaSor.css"; // Ensure this path is correct

const { TextArea } = Input;

// Tabloyu render eden bileşen
const TableRenderer = ({ markdown }) => {
  const { columns, data } = parseMarkdownTable(markdown);
  if (!columns || !data) {
    return <div>Tablo verisi hatalı.</div>;
  }
  return <Table columns={columns} dataSource={data} pagination={false} bordered />;
};

// Normal metni render eden bileşen
const TextRenderer = ({ text }) => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>;
};

function YapayZekayaSor({ selectedRows }) {
  // Modal görünürlüğünü kontrol eden durum
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Sohbet mesajlarını saklayan durum
  const [messages, setMessages] = useState([]);

  // Kullanıcının girdiği mesajı saklayan durum
  const [userInput, setUserInput] = useState("");

  // API'den gelen araç bilgilerini saklayan durum
  const [vehicleData, setVehicleData] = useState(null);

  // İlk yükleme durumunu tutan state
  const [initialLoading, setInitialLoading] = useState(false);

  // Yanıt beklerken (mesaj gönderdiğimizde) bekleme durumunu tutan state
  const [responseLoading, setResponseLoading] = useState(false);

  // Web arama özelliğini kontrol eden switch durumu (varsayılan: false)
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);

  // Session ID - her araç için benzersiz
  const [sessionId, setSessionId] = useState(null);

  // Mesaj listesini otomatik kaydırmak için ref
  const messageListRef = useRef(null);

  // LocalStorage'dan mesaj geçmişini yükle
  const loadChatHistory = (vehicleId) => {
    try {
      const storageKey = `ai_chat_${vehicleId}`;
      const savedHistory = localStorage.getItem(storageKey);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setMessages(parsedHistory.messages || []);
        setSessionId(parsedHistory.sessionId || `session_${vehicleId}_${Date.now()}`);
      } else {
        setSessionId(`session_${vehicleId}_${Date.now()}`);
      }
    } catch (error) {
      console.error("Chat geçmişi yüklenirken hata:", error);
      setSessionId(`session_${vehicleId}_${Date.now()}`);
    }
  };

  // LocalStorage'a mesaj geçmişini kaydet
  const saveChatHistory = (vehicleId, messagesData, sessionIdData) => {
    try {
      const storageKey = `ai_chat_${vehicleId}`;
      const dataToSave = {
        messages: messagesData,
        sessionId: sessionIdData,
        lastUpdated: new Date().toISOString(),
        vehicleId: vehicleId,
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Chat geçmişi kaydedilirken hata:", error);
    }
  };

  // Modal açıldığında araç bilgilerini çek ve sohbete başla
  const showModal = async () => {
    if (!selectedRows || !selectedRows.key) {
      AntMessage.error("Bir araç seçmelisiniz.");
      return;
    }

    setIsModalVisible(true);
    setInitialLoading(true);

    try {
      const response = await AxiosInstance.get(`Vehicle/GetVehicleById`, {
        params: { id: selectedRows.key },
      });

      setVehicleData(response.data);

      // Chat geçmişini yükle
      loadChatHistory(selectedRows.key);

      setInitialLoading(false);
    } catch (error) {
      console.error("API Hatası:", error);
      AntMessage.error("Araç bilgileri yüklenirken bir hata oluştu.");
      setIsModalVisible(false);
      setInitialLoading(false);
    }
  };

  // Modal'ı kapatma fonksiyonu
  const handleCancel = () => {
    setIsModalVisible(false);
    // Mesajları temizleme - artık geçmişi koruyoruz
    // setMessages([]);
    setUserInput("");
    setVehicleData(null);
    setWebSearchEnabled(false); // Switch'i de sıfırla
  };

  // Chat geçmişini temizleme fonksiyonu
  const clearChatHistory = () => {
    if (selectedRows?.key) {
      const storageKey = `ai_chat_${selectedRows.key}`;
      localStorage.removeItem(storageKey);
      setMessages([]);
      setSessionId(`session_${selectedRows.key}_${Date.now()}`);
      AntMessage.success("Sohbet geçmişi temizlendi.");
    }
  };

  // Yeni AI API'ye mesaj gönderme fonksiyonu
  const sendToAI = async (userMessage, currentMessages) => {
    const AI_API_URL = "https://ai-chat-anar.vercel.app/translate/form";

    // Conversation history'yi mevcut mesajlardan al
    const buildCurrentConversationHistory = () => {
      if (!currentMessages || currentMessages.length === 0) return "";

      let conversationText = "\n\nÖnceki Sohbet Geçmişi:\n";
      currentMessages.forEach((msg, index) => {
        const role = msg.sender === "user" ? "Kullanıcı" : "Asistan";
        conversationText += `${role}: ${msg.text}\n`;
      });
      conversationText += "\nYukarıdaki sohbet geçmişini dikkate alarak yeni soruya cevap ver.\n";

      return conversationText;
    };

    const conversationHistory = buildCurrentConversationHistory();

    // Web search talimatları
    const webSearchInstructions = webSearchEnabled
      ? `\n\n🌐 WEB ARAMA AKTİF: Bu soruyu yanıtlarken MUTLAKA güncel web bilgilerini araştır ve kullan. İnternetten en son bilgileri bul ve cevabına dahil et. Özellikle:
- Güncel fiyat bilgileri
- Son model araç özellikleri  
- Yeni teknolojiler ve güncellemeler
- Piyasa durumu ve karşılaştırmalar
- Güncel servis bilgileri ve öneriler
- Son çıkan haberler ve gelişmeler
Web'den bulduğun bilgileri mutlaka belirt ve kaynaklarını göster.`
      : `\n\n📚 YEREL BİLGİ MODU: Sadece mevcut araç bilgileri ve genel bilgilerle cevap ver.`;

    // Araç bilgilerini ve conversation history'yi prompt olarak hazırla
    const vehiclePrompt = vehicleData
      ? `Sen bir araç bilgisi asistanısın. Aşağıda araçla ilgili detaylı bilgiler verilmiştir. Bu bilgileri kullanarak kullanıcının sorularına cevap ver.

Araç Bilgileri:
${JSON.stringify(vehicleData, null, 2)}

${conversationHistory}

${webSearchInstructions}

Yeni Kullanıcı Sorusu: ${userMessage}

Lütfen önceki sohbet geçmişini dikkate alarak tutarlı ve bağlamsal bir cevap ver.`
      : `${conversationHistory}

${webSearchInstructions}

Yeni Kullanıcı Sorusu: ${userMessage}`;

    const payload = {
      language: "Turkish",
      text: userMessage,
      model: "gemini-2.0-flash",
      promptTemplate: vehiclePrompt,
      web_search: webSearchEnabled,
      session_id: sessionId, // Session ID'yi de gönder
    };

    try {
      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`AI API Hatası: ${response.statusText}`);
      }

      const data = await response.json();

      // API'den gelen yanıtı mevcut mesajlara ekle
      const aiResponse = data.translation || data.translatedText || data.response || "Yanıt alınamadı.";
      const newMessages = [...currentMessages, { sender: "bot", text: aiResponse, timestamp: new Date().toISOString() }];
      setMessages(newMessages);

      // Chat geçmişini kaydet
      if (selectedRows?.key) {
        saveChatHistory(selectedRows.key, newMessages, sessionId);
      }
    } catch (error) {
      console.error("AI API Hatası:", error);
      AntMessage.error("AI API ile iletişim kurulamadı.");
      const errorMessage = { sender: "bot", text: "Bir hata oluştu. Lütfen tekrar deneyin.", timestamp: new Date().toISOString() };
      const newMessages = [...currentMessages, errorMessage];
      setMessages(newMessages);

      // Hata mesajını da kaydet
      if (selectedRows?.key) {
        saveChatHistory(selectedRows.key, newMessages, sessionId);
      }
    }
  };

  // Mesaj gönderme fonksiyonu
  const handleSend = async () => {
    if (userInput.trim() === "") return;

    const userMessage = { sender: "user", text: userInput, timestamp: new Date().toISOString() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Kullanıcı mesajını hemen kaydet
    if (selectedRows?.key) {
      saveChatHistory(selectedRows.key, newMessages, sessionId);
    }

    const currentInput = userInput;
    setUserInput("");

    // Yanıt beklerken loading aç
    setResponseLoading(true);

    try {
      await sendToAI(currentInput, newMessages);
    } catch (error) {
      console.error("Mesaj gönderme sırasında hata:", error);
      const errorMessage = { sender: "bot", text: "Bir hata oluştu. Lütfen tekrar deneyin.", timestamp: new Date().toISOString() };
      const errorMessages = [...newMessages, errorMessage];
      setMessages(errorMessages);

      // Hata mesajını kaydet
      if (selectedRows?.key) {
        saveChatHistory(selectedRows.key, errorMessages, sessionId);
      }

      AntMessage.error("Mesaj gönderilirken bir hata oluştu.");
    } finally {
      setResponseLoading(false);
    }
  };

  // Mesajlar güncellendiğinde otomatik kaydır
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // Mesaj render işlemini güncelleme
  const renderMessage = (item, index) => {
    const isUser = item.sender === "user";

    if (isUser) {
      return (
        <List.Item
          key={`${item.timestamp || index}_user`} // unique key with timestamp
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              backgroundColor: "#e6f7ff",
              padding: "8px 12px",
              borderRadius: "8px",
              maxWidth: "80%",
              wordBreak: "break-word",
              textAlign: "right",
            }}
          >
            <TextRenderer text={item.text} />
            {item.timestamp && <div style={{ fontSize: "10px", color: "#999", marginTop: "4px" }}>{new Date(item.timestamp).toLocaleTimeString()}</div>}
          </div>
        </List.Item>
      );
    }

    // Bot mesajları için metni parçala
    const { before, table, after } = splitMarkdownTable(item.text);

    return (
      <List.Item
        key={`${item.timestamp || index}_bot`} // unique key with timestamp
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "8px 12px",
            borderRadius: "8px",
            maxWidth: "80%",
            wordBreak: "break-word",
            textAlign: "left",
          }}
        >
          {before && <TextRenderer text={before} />}
          {table && <TableRenderer markdown={table} />}
          {after && <TextRenderer text={after} />}
          {item.timestamp && <div style={{ fontSize: "10px", color: "#999", marginTop: "4px" }}>{new Date(item.timestamp).toLocaleTimeString()}</div>}
        </div>
      </List.Item>
    );
  };

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={showModal}>
        Yapay Zekaya Sor
      </div>

      <Modal title="Yapay Zeka ile Sohbet" open={isModalVisible} onCancel={handleCancel} footer={null} width={1200}>
        {initialLoading ? (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Spin />
            <div style={{ marginTop: "10px" }}>Araç bilgileri yükleniyor...</div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Switch checked={webSearchEnabled} onChange={setWebSearchEnabled} size="small" />
                <span style={{ fontSize: "14px", color: "#666" }}>Web Araması {webSearchEnabled ? "Açık" : "Kapalı"}</span>
              </div>
              <Button size="small" danger onClick={clearChatHistory} style={{ fontSize: "12px" }}>
                Geçmişi Temizle
              </Button>
            </div>
            <div ref={messageListRef} style={{ maxHeight: "calc(100vh - 350px)", overflowY: "auto" }}>
              <List dataSource={messages} renderItem={renderMessage} locale={{ emptyText: "Sohbete başlayın! Mesaj geçmişiniz otomatik olarak kaydedilir." }} />
            </div>
            <Divider />
            <TextArea
              rows={4}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={
                webSearchEnabled
                  ? "Araç hakkında soru sorun... (Web araması aktif - güncel bilgiler dahil edilecek)"
                  : "Araç hakkında soru sorun... (Sadece mevcut bilgilerle yanıt verilecek)"
              }
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={responseLoading}
            />
            <Button type="primary" onClick={handleSend} style={{ marginTop: "10px" }} block disabled={responseLoading}>
              {responseLoading ? <Spin /> : "Gönder"}
            </Button>
            {sessionId && <div style={{ fontSize: "10px", color: "#999", marginTop: "8px", textAlign: "center" }}>Session: {sessionId}</div>}
          </>
        )}
      </Modal>
    </div>
  );
}

export default YapayZekayaSor;
