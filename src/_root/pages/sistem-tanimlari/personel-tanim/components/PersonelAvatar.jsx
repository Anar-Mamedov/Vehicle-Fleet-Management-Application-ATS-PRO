import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import PropTypes from "prop-types";
import { DownloadPhotoByIdService, GetPhotosByRefGroupService } from "../../../../../api/services/upload/services";

const PHOTO_REF_GROUP = "PERSONEL";
const MAX_CACHED_PHOTOS = 100;

// Sayfalar arasında gezinirken aynı personelin fotoğrafı tekrar indirilmesin diye önbellekte tutulur
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

const fetchEmployeePhotoUrl = async (personelId) => {
  try {
    const listResponse = await GetPhotosByRefGroupService(personelId, PHOTO_REF_GROUP);
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
const cachePhotoUrl = (personelId, urlPromise) => {
  if (photoUrlCache.size >= MAX_CACHED_PHOTOS) {
    const oldestId = photoUrlCache.keys().next().value;
    const oldestPromise = photoUrlCache.get(oldestId);

    photoUrlCache.delete(oldestId);
    Promise.resolve(oldestPromise).then((url) => {
      if (url) URL.revokeObjectURL(url);
    });
  }

  photoUrlCache.set(personelId, urlPromise);
};

const getEmployeePhotoUrl = (personelId) => {
  if (!photoUrlCache.has(personelId)) {
    cachePhotoUrl(personelId, fetchEmployeePhotoUrl(personelId));
  }

  return photoUrlCache.get(personelId);
};

const PersonelAvatar = ({ personelId, isim }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    let active = true;

    if (personelId) {
      getEmployeePhotoUrl(personelId).then((url) => {
        if (active) setPhotoUrl(url);
      });
    }

    return () => {
      active = false;
    };
  }, [personelId]);

  // Fotoğrafı olmayan personelde isim baş harfleri gösterilir
  return (
    <Avatar src={photoUrl || undefined} style={{ backgroundColor: "#f0f2f5", color: "#5d6786", flexShrink: 0 }}>
      {getInitials(isim)}
    </Avatar>
  );
};

PersonelAvatar.propTypes = {
  personelId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isim: PropTypes.string,
};

export default PersonelAvatar;
