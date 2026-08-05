import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import PropTypes from "prop-types";
import { DownloadPhotoByIdService, GetPhotosByRefGroupService } from "../../../../../api/services/upload/services";

const PHOTO_REF_GROUP = "SURUCU";
const MAX_CACHED_PHOTOS = 100;

// Sayfalar arasında gezinirken aynı sürücünün fotoğrafı tekrar indirilmesin diye önbellekte tutulur
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

const fetchDriverPhotoUrl = async (surucuId) => {
  try {
    const listResponse = await GetPhotosByRefGroupService(surucuId, PHOTO_REF_GROUP);
    const photos = Array.isArray(listResponse?.data) ? listResponse.data : [];

    if (photos.length === 0) {
      return null;
    }

    const photo = photos.find((item) => item.isDefault) || photos[0];
    const downloadResponse = await DownloadPhotoByIdService({
      photoId: photo.tbResimId,
      extension: photo.rsmUzanti,
      fileName: photo.rsmAd,
    });

    return URL.createObjectURL(downloadResponse.data);
  } catch {
    return null;
  }
};

// En eski kayıt temizlenerek bellekte biriken blob adresleri sınırlandırılır
const cachePhotoUrl = (surucuId, urlPromise) => {
  if (photoUrlCache.size >= MAX_CACHED_PHOTOS) {
    const oldestId = photoUrlCache.keys().next().value;
    const oldestPromise = photoUrlCache.get(oldestId);

    photoUrlCache.delete(oldestId);
    Promise.resolve(oldestPromise).then((url) => {
      if (url) URL.revokeObjectURL(url);
    });
  }

  photoUrlCache.set(surucuId, urlPromise);
};

const getDriverPhotoUrl = (surucuId) => {
  if (!photoUrlCache.has(surucuId)) {
    cachePhotoUrl(surucuId, fetchDriverPhotoUrl(surucuId));
  }

  return photoUrlCache.get(surucuId);
};

const SurucuAvatar = ({ surucuId, isim }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    let active = true;

    if (surucuId) {
      getDriverPhotoUrl(surucuId).then((url) => {
        if (active) setPhotoUrl(url);
      });
    }

    return () => {
      active = false;
    };
  }, [surucuId]);

  // Fotoğrafı olmayan sürücüde isim baş harfleri gösterilir
  return (
    <Avatar src={photoUrl || undefined} style={{ backgroundColor: "#f0f2f5", color: "#5d6786", flexShrink: 0 }}>
      {getInitials(isim)}
    </Avatar>
  );
};

SurucuAvatar.propTypes = {
  surucuId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isim: PropTypes.string,
};

export default SurucuAvatar;
