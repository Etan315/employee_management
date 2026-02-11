import api from "../api/axiosInstance.api.js";
const API_URL = "http://localhost:5000/api";

const AddDepartment = async (departmentData) => {
    try {
        const res = await api.post(`${API_URL}/adddepartment`, departmentData);
        return res.data;
    } catch (error) {
        console.error('Error adding department:', error);
        throw error;
    }
}
export default AddDepartment;