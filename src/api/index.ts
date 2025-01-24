import Axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.response?.data.error ||
      error.message;
    console.log(errorMessage);

    return Promise.reject(error);
  }
);

const getLayout = async () => {
  try {
    const response = await axios.get("/getLayout");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error in getting layout: ", error);
  }
};

const uploadImage = async (image: any) => {
  try {
    const response = await axios.post("/uploadImage", image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error in uploading image: ", error);
  }
};

const saveEmailConfig = async (emailConfig: any) => {
  try {
    const response = await axios.post("/uploadEmailConfig", emailConfig);
    return response.data;
  } catch (error) {
    console.log(" Error in saving email config", error);
  }
};

const renderAndDownloadTemplate = async (id: any) => {
  try {
    const response = await axios.get(`/renderAndDownloadTemplate/${id}`);
    return response;
  } catch (error) {
    console.log("Error in downloading template: ", error);
  }
};

export { getLayout, uploadImage, saveEmailConfig, renderAndDownloadTemplate };
