import AxiosInstance from "../api/http";
import { getItemWithExpiration } from "./expireToken";

export const uploadPhoto = async (id, group, files, isForDefault) => {
  const response = await AxiosInstance.post(`Photo/UploadPhoto?refId=${id}&refGroup=${group}&isForDefault=${isForDefault}`, files, {
    headers: {
      "Content-Type": "multipart/form-data",
      "User-Id": getItemWithExpiration("id"),
    },
  });

  return response.data;
};

export const uploadFile = async (id, group, files) => {
  const response = await AxiosInstance.post(`Document/UploadDocument?refId=${id}&refGroup=${group}`, files, {
    headers: {
      "Content-Type": "multipart/form-data",
      "User-Id": getItemWithExpiration("id"),
    },
  });

  return response.data;
};
