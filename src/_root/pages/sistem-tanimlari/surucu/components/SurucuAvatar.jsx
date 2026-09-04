import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import PropTypes from "prop-types";
import { DownloadPhotoByIdService } from "../../../../../api/services/upload/services";

const MAX_CACHED_PHOTOS = 100;

// Sayfalar arasında gezinirken aynı fotoğraf tekrar indirilmesin diye resim id'si bazında önbellekte tutulur
const photoUrlCache = new Map();

const getInitials = (name) => {
  if (!name) return "";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toLocaleUpperCase("tr-TR");
};

const fetchPhotoUrl = async (defPhotoInfo) => {
  try {
    const downloadResponse = await DownloadPhotoByIdService({
      photoId: defPhotoInfo.tbResimId,
      extension: defPhotoInfo.rsmUzanti,
      fileName: defPhotoInfo.rsmAd,
    });

    return URL.createObjectURL(downloadResponse.data);
  } catch {
    return null;
  }
};

// En eski kayıt temizlenerek bellekte biriken blob adresleri sınırlandırılır
const cachePhotoUrl = (photoId, urlPromise) => {
  if (photoUrlCache.size >= MAX_CACHED_PHOTOS) {
    const oldestId = photoUrlCache.keys().next().value;
    const oldestPromise = photoUrlCache.get(oldestId);

    photoUrlCache.delete(oldestId);
    Promise.resolve(oldestPromise).then((url) => {
      if (url) URL.revokeObjectURL(url);
    });
  }

  photoUrlCache.set(photoId, urlPromise);
};

const getPhotoUrl = (defPhotoInfo) => {
  const photoId = defPhotoInfo.tbResimId;

  if (!photoUrlCache.has(photoId)) {
    cachePhotoUrl(photoId, fetchPhotoUrl(defPhotoInfo));
  }

  return photoUrlCache.get(photoId);
};

// Sürücünün varsayılan fotoğrafı liste yanıtındaki `defPhotoInfo` alanından gelir; güncelleme ekranı da
// aynı alanı kullandığı için iki ekran her zaman aynı resmi gösterir. `tbResimId` 0 ise kayıtlı fotoğraf yoktur.
const SurucuAvatar = ({ isim, defPhotoInfo }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const photoId = defPhotoInfo?.tbResimId || 0;

  useEffect(() => {
    let active = true;

    if (!photoId) {
      setPhotoUrl(null);
      return undefined;
    }

    getPhotoUrl(defPhotoInfo).then((url) => {
      if (active) setPhotoUrl(url);
    });

    return () => {
      active = false;
    };
  }, [photoId, defPhotoInfo]);

  // Fotoğrafı olmayan sürücüde isim baş harfleri gösterilir
  return (
    <Avatar src={photoUrl || undefined} style={{ backgroundColor: "#f0f2f5", color: "#5d6786", flexShrink: 0 }}>
      {getInitials(isim)}
    </Avatar>
  );
};

SurucuAvatar.propTypes = {
  isim: PropTypes.string,
  defPhotoInfo: PropTypes.shape({
    tbResimId: PropTypes.number,
    rsmUzanti: PropTypes.string,
    rsmAd: PropTypes.string,
  }),
};

export default SurucuAvatar;
