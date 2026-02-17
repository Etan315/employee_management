import api from "../api/axiosInstance.api";

export const addPostion = async (positionData) => {
    try {
        const res = await api.post('/addposition', positionData);
        return res.data;
    } catch (error) {
        console.error("Error adding new position: ", error);
        throw error;
    }
}