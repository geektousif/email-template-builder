import axios from "axios";

const getLayout = async () => {
  try {
    const response = await axios.get("/api/getLayout");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error in getting layout: ", error);
  }
};

const uploadImage = async (image: any) => {
  try {
    const response = await axios.post("/api/uploadImage", image, {
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
    const response = await axios.post("/api/uploadEmailConfig", emailConfig);
    return response.data;
  } catch (error) {
    console.log(" Error in saving email config", error);
  }
};

const renderAndDownloadTemplate = async (id: any) => {
  try {
    const response = await axios.get(`/api/renderAndDownloadTemplate/${id}`);
    return response;
  } catch (error) {
    console.log("Error in downloading template: ", error);
  }
};

export { getLayout, uploadImage, saveEmailConfig, renderAndDownloadTemplate };
