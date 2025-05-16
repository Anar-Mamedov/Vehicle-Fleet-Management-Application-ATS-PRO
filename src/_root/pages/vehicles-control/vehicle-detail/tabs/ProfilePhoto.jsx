import React, { useState, useEffect } from "react";
import { Carousel, Image, Spin, ConfigProvider } from "antd";
import styled from "styled-components";
import { DownloadPhotoByIdService } from "../../../../../api/services/upload/services";
import trTR from "antd/es/locale/tr_TR";
import enUS from "antd/es/locale/en_US";
import ruRU from "antd/es/locale/ru_RU";
import azAZ from "antd/es/locale/az_AZ";

const CarouselSlide = styled.div`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  overflow: hidden !important;
  max-height: 210px !important;
  height: 210px !important;
`;

const ImageCarousel = ({ imageUrls, loadingImages }) => {
  // images: Child bileşen içinde indirdiğimiz gerçek görseller (blob/base64 vs.)
  const [images, setImages] = useState([]);
  // localLoading: Sadece kendi indirme sürecimizi yönetelim
  const [localLoading, setLocalLoading] = useState(false);

  const [locale, setLocale] = useState(trTR);

  const fallbackSrc = "/images/ResimYok.jpeg";

  useEffect(() => {
    // i18n locale ayarları
    const language = localStorage.getItem("i18nextLng");
    const localeMap = {
      tr: trTR,
      en: enUS,
      ru: ruRU,
      az: azAZ,
    };
    if (language && localeMap[language]) {
      setLocale(localeMap[language]);
    }
  }, []);

  useEffect(() => {
    // Eğer parent halen imageUrls'ı fetch ediyorsa (loadingImages=true), Child hiçbir işlem yapmasın
    if (loadingImages) return;

    // Parent fetch bitti, imageUrls dolu mu boş mu diye bakalım
    if (!imageUrls || imageUrls.length === 0) {
      // Hiç resim yoksa images'i boş array yaparız
      setImages([]);
      return;
    }

    // imageUrls doluysa, bu sefer Child olarak DownloadPhotoByIdService çağrısı yapıyoruz
    const fetchImages = async () => {
      setLocalLoading(true);
      try {
        const requests = imageUrls.map((img) => {
          // Parent'tan gelen 'img' içinde tbResimId, rsmUzanti vb. alanları olduğunu varsayıyoruz
          const data = {
            photoId: img.tbResimId,
            extension: img.rsmUzanti,
            fileName: img.rsmAd,
          };
          return DownloadPhotoByIdService(data);
        });

        const responses = await Promise.all(requests);

        const fetchedImages = responses.map((response) => {
          // response.data'daki blob/base64 veriyi handle ediyoruz
          return {
            uid: response.data.photoId,
            url: URL.createObjectURL(response.data),
            name: response.data.fileName,
          };
        });

        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
        // Hata durumunda da images'i boş tutalım
        setImages([]);
      } finally {
        setLocalLoading(false);
      }
    };

    fetchImages();

    // Cleanup: bellek sızıntılarını önlemek için
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [imageUrls, loadingImages]);

  // 1) Eğer parent henüz imageUrls'ı çekmediyse (loadingImages=true), Spin döndür
  if (loadingImages) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <Spin size="large" />
      </div>
    );
  }

  // 2) Parent'tan imageUrls geldi ama Child kendi fetch'ini yapıyor olabilir (localLoading=true) → yine Spin göster
  if (localLoading) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <Spin size="large" />
      </div>
    );
  }

  // 3) Artık Child fetch de bitti, elimizde images var mı yok mu?
  return (
    <ConfigProvider locale={locale}>
      {images.length > 0 ? (
        <Image.PreviewGroup items={images.map((image) => image.url)}>
          <Carousel arrows autoplay>
            {images.map((image, index) => (
              <CarouselSlide key={`image-${index}-${image.url || image.path}`}>
                <Image
                  src={image.url || image.path}
                  alt={`Vehicle ${index + 1}`}
                  style={{
                    width: "100%",
                    maxHeight: "210px",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              </CarouselSlide>
            ))}
          </Carousel>
        </Image.PreviewGroup>
      ) : (
        // images.length === 0 ise fallback resmi gösteriyoruz
        <Carousel arrows autoplay>
          <CarouselSlide>
            <Image
              src={fallbackSrc}
              alt="Fallback"
              style={{
                width: "100%",
                maxHeight: "210px",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </CarouselSlide>
        </Carousel>
      )}
    </ConfigProvider>
  );
};

export default ImageCarousel;
