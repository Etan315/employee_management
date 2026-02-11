import Modal from "../Modal";
import IcPlus from "../../../icons/ic-plus.svg";
import IcWork from "../../../icons/ic-work.svg";
import { useState } from "react";
import "./add-department.css";

export default function addDepartment({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = 'http://localhost:5000/api';

    try {
      const res = await fetch(`${API_URL}/adddepartment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      alert("Event added successfully!");
      onClose();
      setFormData({
        position: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className="modal-header">
        <div className="left">
          <img src={IcWork} alt="event" />
          <div className="header-text">
            <h2>Add New Position</h2>
            <p>Fill in the data below to add Department</p>
          </div>
        </div>
        <button onClick={onClose}>
          <img src={IcPlus} alt="close" className="btn-close" />
        </button>
      </header>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            id="department"
            name="department"
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="toggleBtn">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
