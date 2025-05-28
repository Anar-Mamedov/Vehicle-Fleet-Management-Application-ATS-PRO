import { Button, message } from 'antd';
import axios from 'axios';

export const AracKaydet = ({ kontrolSonuclari }) => {
  const handleKaydet = async () => {
    const uygunlar = kontrolSonuclari.filter(i => !i.Sonuc || i.Sonuc.length === 0);
    if (uygunlar.length === 0) {
      message.warning("Kaydedilecek uygun veri yok.");
      return;
    }

    try {
      const toSend = uygunlar.map(({ PLAKA, LOKASYON, MARKA, MODEL, ARAC_TIPI, YAKIT_TIPI, URETIM_YILI }) => ({
        PLAKA, LOKASYON, MARKA, MODEL, ARAC_TIPI, YAKIT_TIPI, URETIM_YILI
      }));
      await axios.post('https://localhost:44338/api/AracAktarimKayit/ekle', toSend);
      message.success("Veriler başarıyla kaydedildi.");
    } catch (err) {
      message.error("Veri kaydetme hatası.");
    }
  };

  return <Button type="primary" onClick={handleKaydet} style={{ marginTop: 16, marginLeft: 8 }}>Veritabanına Kaydet</Button>;
};