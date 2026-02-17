import api from "../api/axiosInstance.api.js";

const AddDepartment = async (departmentData) => {
    try {
        const res = await api.post(`/adddepartment`, departmentData);
        return res.data;
    } catch (error) {
        console.error('Error adding department:', error);
        throw error;
    }
}
export default AddDepartment;