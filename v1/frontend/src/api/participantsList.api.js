import api from "../api/axiosInstance.api.js";
const API_URL = "http://localhost:5000/api";

const getParticipantsList = async () => {
    try {
        const response = await api.get("/participants"); 
        return response.data;
    } catch (error) {
        console.error("Error fetching the list of participants: ", error);
        throw error;
    }
}

export default getParticipantsList;