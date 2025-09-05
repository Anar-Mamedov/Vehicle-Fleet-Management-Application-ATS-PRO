import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { Avatar, Spin, Typography, Image, Button, Modal, message } from "antd";
import { UserOutlined, EditOutlined, PictureOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../../api/http.jsx";
/* import HesapBilgileriDuzenle from "../../HesapBilgileriDuzenle.jsx"; */
import ResimUpload from "../../../../../components/Resim/ResimUpload.jsx";
import { TiDelete } from "react-icons/ti";
const { Text } = Typography;

function HesapBilgilerim({ userData }) {
  const [imageUrl, setImageUrl] = useState(null); // Resim URL'sini saklamak için state tanımlayın
  const [loadingImage, setLoadingImage] = useState(false); // Yükleme durumu için yeni bir state
  const [, setIsModalVisible] = useState(false); // Modal'ın görünürlüğünü kontrol etmek için state
  const [isModalVisible1, setIsModalVisible1] = useState(false); // Modal'ın görünürlüğünü kontrol etmek için state

  // Profil güncelleme gövdesi gerekirse oluşturulabilir; şu an silme akışında kullanılmıyor

  const [isDeleting, setIsDeleting] = useState(false);

  // const deletePicture1 = async () => {
  //   if (userData?.PRS_RESIM_ID) {
  //     try {
  //       const response = await AxiosInstance.get(
  //         `ResimSil?resimID=${userData?.PRS_RESIM_ID}`
  //       );
  //       setIsButtonClicked((prev) => !prev); // Başarılı yüklemeden sonra resim listesini yenile
  //       setImageUrl(null);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   }
  // };

  const lastObjectUrlRef = useRef(null);

  const fetchUserPhoto = useCallback(async () => {
    try {
      setLoadingImage(true);
      if (!userData?.siraNo) {
        setImageUrl(null);
        return;
      }
      const listResponse = await AxiosInstance.get(`Photo/GetPhotosByRefGroup?refId=${userData.siraNo}&refGroup=user`);
      const resimListesi = Array.isArray(listResponse?.data) ? listResponse.data : [];

      if (resimListesi.length === 0) {
        setImageUrl(null);
        return;
      }

      const tercihEdilen = resimListesi.find((r) => r.isDefault) || resimListesi[0];

      const downloadResponse = await AxiosInstance.post(
        `Photo/DownloadPhotoById`,
        {
          photoId: tercihEdilen.tbResimId,
          extension: tercihEdilen.rsmUzanti,
          fileName: tercihEdilen.rsmAd,
        },
        { responseType: "blob" }
      );

      if (lastObjectUrlRef.current) {
        URL.revokeObjectURL(lastObjectUrlRef.current);
        lastObjectUrlRef.current = null;
      }

      const objectUrl = URL.createObjectURL(downloadResponse.data);
      lastObjectUrlRef.current = objectUrl;
      setImageUrl(objectUrl);
    } catch (error) {
      console.error("Kullanıcı fotoğrafı yüklenirken hata oluştu:", error);
      setImageUrl(null);
    } finally {
      setLoadingImage(false);
    }
  }, [userData?.siraNo]);

  useEffect(() => {
    fetchUserPhoto();
    return () => {
      if (lastObjectUrlRef.current) {
        URL.revokeObjectURL(lastObjectUrlRef.current);
        lastObjectUrlRef.current = null;
      }
    };
  }, [fetchUserPhoto]);

  const handleDeleteUserPhoto = useCallback(async () => {
    if (!userData?.siraNo) return;
    try {
      setIsDeleting(true);
      const listResponse = await AxiosInstance.get(`Photo/GetPhotosByRefGroup?refId=${userData.siraNo}&refGroup=user`);
      const resimListesi = Array.isArray(listResponse?.data) ? listResponse.data : [];
      if (resimListesi.length === 0) {
        message.info("Silinecek fotoğraf bulunamadı.");
        return;
      }

      const tercihEdilen = resimListesi.find((r) => r.isDefault) || resimListesi[0];
      const response = await AxiosInstance.get(`Photo/DeletePhotoById?id=${tercihEdilen.tbResimId}`);
      if (response && response.data && response.data.success === false) {
        throw new Error(response.data.message || "Silme işlemi başarısız oldu");
      }

      message.success("Fotoğraf başarıyla silindi.");
      await fetchUserPhoto();
      window.dispatchEvent(
        new CustomEvent("user-photo-updated", {
          detail: { userId: userData?.siraNo, at: Date.now() },
        })
      );
    } catch (error) {
      console.error("Fotoğraf silinirken bir hata oluştu:", error);
      message.error(error.message || "Fotoğraf silinirken bir hata oluştu.");
    } finally {
      setIsDeleting(false);
    }
  }, [userData?.siraNo, fetchUserPhoto]);

  // useEffect(() => {
  //   setValue("userName", "Kullanıcı Adı");
  // }, []);
  //
  // useEffect(() => {
  //   console.log(userName);
  // }, [userName]);

  const showModal = () => {
    setIsModalVisible(true); // Modal'ı göster
  };

  const uploadPhoto = () => {
    setIsModalVisible1(true); // Modal'ı göster
  };

  return (
    <div
      style={{
        padding: "0 20px",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
      }}
    >
      <Text style={{ fontWeight: "500", fontSize: "16px" }}>Hesap Bilgilerim</Text>
      <div
        style={{
          borderRadius: "16px",
          border: "1px solid #e1e1e1",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ position: "relative", width: "84px", height: "84px" }}>
            {imageUrl ? (
              <Image.PreviewGroup>
                <Image
                  width={84}
                  height={84}
                  src={imageUrl}
                  placeholder={loadingImage ? <Spin /> : <UserOutlined />}
                  style={{
                    width: "84px",
                    height: "84px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Image.PreviewGroup>
            ) : (
              <Avatar
                style={{ minHeight: "84px", minWidth: "84px" }}
                size={84}
                icon={!loadingImage && <UserOutlined />} // Yükleme olmadığı ve imageUrl yoksa ikonu göster
              >
                {loadingImage && <Spin />}
                {/* Resim yüklenirken Spin göster */}
              </Avatar>
            )}
            <Button
              style={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                minHeight: "32px",
                maxHeight: "32px",
                width: "32px",
              }}
              size={"medium"}
              shape="circle"
              icon={<PictureOutlined />}
              onClick={uploadPhoto}
            />

            {imageUrl && (
              <TiDelete
                style={{
                  fontSize: "35px",
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  cursor: isDeleting ? "not-allowed" : "pointer",
                  color: isDeleting ? "#aaa" : "red",
                  dropShadow: "2px 2px 5px rgba(0,0,0,0.9)",
                }}
                onClick={isDeleting ? undefined : handleDeleteUserPhoto}
                title={isDeleting ? "Siliniyor..." : "Fotoğrafı sil"}
              />
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "500", fontSize: "15px" }}>
                {userData?.isim || "Bilinmiyor"} {userData?.soyAd || ""}
              </Text>
              <Text type="secondary">{userData?.PRS_UNVAN || ""}</Text>
              <Text type="secondary">{userData?.PRS_ADRES || ""}</Text>
            </div>
            <Button style={{ maxHeight: "32px", minHeight: "32px", minWidth: "32px", maxWidth: "32px" }} shape="circle" icon={<EditOutlined />} onClick={showModal} />
          </div>
        </div>
      </div>

      <div
        style={{
          borderRadius: "16px",
          border: "1px solid #e1e1e1",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            Kişisel Bilgilerim
          </Text>
          <Button style={{ maxHeight: "32px", minHeight: "32px", minWidth: "32px", maxWidth: "32px" }} shape="circle" icon={<EditOutlined />} onClick={showModal} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gridGap: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text type="secondary">İsim</Text>
            <Text>{userData?.isim || "Bilinmiyor"}</Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text type="secondary">Soyisim</Text>
            <Text>{userData?.soyAd || "Bilinmiyor"}</Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text type="secondary">Kullanici Kodu</Text>
            <Text>{userData?.kullaniciKod || "Bilinmiyor"}</Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text type="secondary">E-posta</Text>
            <Text>{userData?.email || "Bilinmiyor"}</Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text type="secondary">Telefon</Text>
            <Text>{userData?.telefon || "Bilinmiyor"}</Text>
          </div>
          {/*  <div style={{ display: "flex", flexDirection: "column" }}>
            <Text type="secondary">Dahili</Text>
            <Text>{userData?.PRS_DAHILI || "Bilinmiyor"}</Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text type="secondary">Adres</Text>
            <Text>{userData?.PRS_ADRES || "Bilinmiyor"}</Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text type="secondary">Açıklama</Text>
            <Text>{userData?.PRS_ACIKLAMA || "Bilinmiyor"}</Text>
          </div> */}
        </div>
      </div>
      {/*  <HesapBilgileriDuzenle
        accountEditModalOpen={isModalVisible}
        accountEditModalClose={() => {
          setIsModalVisible(false);
        }}
      /> */}

      <Modal
        title="Resim Yükle"
        centered
        open={isModalVisible1}
        onOk={() => setIsModalVisible1(false)}
        onCancel={() => setIsModalVisible1(false)}
        destroyOnClose
        afterOpenChange={(open) => {
          if (!open) {
            fetchUserPhoto();
            window.dispatchEvent(
              new CustomEvent("user-photo-updated", {
                detail: { userId: userData?.siraNo, at: Date.now() },
              })
            );
          }
        }}
        width={800}
      >
        <ResimUpload selectedRowID={userData?.siraNo} setPhotoUploaded={() => {}} setPhotoCount={() => {}} refGroup="user" isForDefault={true} />
      </Modal>
    </div>
  );
}

export default HesapBilgilerim;

HesapBilgilerim.propTypes = {
  userData: PropTypes.shape({
    siraNo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    PRS_RESIM_ID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    PRS_ISIM: PropTypes.string,
    KLL_KOD: PropTypes.string,
    KLL_TANIM: PropTypes.string,
    PRS_EMAIL: PropTypes.string,
    PRS_TELEFON: PropTypes.string,
    PRS_DAHILI: PropTypes.string,
    PRS_ADRES: PropTypes.string,
    PRS_ACIKLAMA: PropTypes.string,
    KLL_AKTIF: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    PRS_UNVAN: PropTypes.string,
    PRS_GSM: PropTypes.string,
    KLL_PERSONEL_ID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    KLL_NEW_USER: PropTypes.bool,
    KLL_DEGISTIRME_TARIH: PropTypes.string,
    isim: PropTypes.string,
    soyAd: PropTypes.string,
    kullaniciKod: PropTypes.string,
    email: PropTypes.string,
    telefon: PropTypes.string,
  }),
};
