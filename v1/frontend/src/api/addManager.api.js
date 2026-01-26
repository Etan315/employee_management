import axios from "axios";

const API_URL= "http://localhost:5000/api";

export const AddManager =  async (managerInfo) => {
    try {
        const response = await axios.post(`${API_URL}/addmanager`, managerInfo);
        return response.data;
    } catch (error) {
        console.error('Error adding manager:', error);
        throw error
    }
}