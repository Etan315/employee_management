import api from "./axiosInstance.api.js";

export const getEvent = async () => {
  try {
    const response = await api.get("/getEventList");
    return response.data;
  } catch (error) {
    console.error("Error fetching the list of events: ", error);
    throw error;
  }
};

export const addEvent = async (eventData) => {
  try {
    const response = await api.post("/addevent", eventData);
    return { ...response, ok: response.status >= 200 && response.status < 300 };
  } catch (error) {
    console.error("Error adding event: ", error);
    throw error;
  }
};
