import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

const getEvent = async () => {
    try {
        const response = await axios.get(`${API_URL}/getEventList`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the list of events: ', error);
        throw error;
    }
}

export default getEvent;