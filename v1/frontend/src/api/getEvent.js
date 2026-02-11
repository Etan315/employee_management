import api from "../api/axiosInstance.api.js";
const API_URL = 'http://localhost:5000/api'; 

const getEvent = async () => {
    try {
        const response = await api.get(`${API_URL}/getEventList`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the list of events: ', error);
        throw error;
    }
}

export default getEvent;