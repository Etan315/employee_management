import { useState } from "react";
import Modal from "../Modal";
import IcPlus from "../../../icons/ic-plus.svg";
import IcWork from "../../../icons/ic-work.svg";
import "./add-postion.css";
import position from "../../../api/position.api";

export default function addPosition({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    position: "",
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


    try {
      const res = await position(formData);

      if (res.status === 201 || res.message) { 
        alert("Position added successfully!");
        onClose();
        setFormData({
          position: "",
        });
      }
      
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
            <p>Fill in the data below to add position</p>
          </div>
        </div>
        <button onClick={onClose}>
          <img src={IcPlus} alt="close" className="btn-close" />
        </button>
      </header>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            id="position"
            name="position"
            type="text"
            placeholder="Position"
            value={formData.position}
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
