import { AxiosInstance } from "./axios";

export const sendGetRequest = async (url) => {
  try {
    const response = await AxiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error();
  }
};

export const sendPostRequest = async (url, body) => {
  try {
    const response = await AxiosInstance.post(url, body);
    return response.data;
  } catch (error) {
    console.error();
  }
};

export const sendEditRequest = async (url, body) => {
  try {
    await AxiosInstance.put(url, body);
  } catch (error) {
    console.error();
  }
};

export const sendDeleteRequest = async (id) => {
  try {
    await AxiosInstance.delete(`publications/${id}`);
  } catch (error) {
    console.error();
  }
};
