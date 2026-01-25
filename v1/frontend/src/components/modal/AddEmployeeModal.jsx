import { useState } from "react";
import Modal from "./Modal";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ContactInfoForm from "./forms/ContactInfoForm";
import OrganizationalInfoForm from "./forms/OrganizationalInfoForm";
import AccountInfoForm from "./forms/AccountInfoForm";
import "./Modal.css";
import IcPlus from "../../icons/ic-plus.svg";

export default function AddEmployeeModal({ isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    month: "",
    day: "",
    year: "",
    gender: "",
    phone_number: "",
    location: "",
    department_id: "",
    position_id: "",
    manager_id: "",
    employment_status: "",
    joined_month: "",
    joined_day: "",
    joined_year: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeIndex !== slides.length - 1) return;

    try {
      const API_URL="http://localhost:5000/api"
      const res = await fetch(`${API_URL}/addemployee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      alert("Employee added successfully!");
      onClose(); //close modal
      setForm({}); //reset form
      setActiveIndex(0); //reset slide
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const nextSlide = (e) => {
    e.preventDefault(); // Prevent any form submission
    if (activeIndex < 3) setActiveIndex(activeIndex + 1);
  };

  const prevSlide = (e) => {
    e.preventDefault(); // Prevent any form submission
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const slides = [
    {
      title: "Personal Information",
      form: <PersonalInfoForm formData={form} onChange={handleChange} />,
    },
    {
      title: "Contact Details",
      form: <ContactInfoForm formData={form} onChange={handleChange} />,
    },
    {
      title: "Organizational Information",
      form: <OrganizationalInfoForm formData={form} onChange={handleChange} />,
    },
    {
      title: "Account Information",
      form: <AccountInfoForm formData={form} onChange={handleChange} />,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className="modal-header">
        <h2>Add New Employee</h2>
        <button onClick={onClose}>
          <img src={IcPlus} alt="close" className="btn-close" />
        </button>
      </header>

      <div className="carousel" id="slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === activeIndex ? "active" : ""}`}
          >
            {index > 0 && <span className="separator">&gt;</span>}
            <h3>{slide.title}</h3>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="modal-form">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`form-group ${
              index === activeIndex ? "active" : "hidden"
            }`}
          >
            {slide.form}
          </div>
        ))}

        <div className="toggleBtn">
          {activeIndex > 0 && (
            <button type="button" className="back" onClick={prevSlide}>
              Back
            </button>
          )}

          {activeIndex === slides.length - 1 ? (
            <button type="submit" className="submit">
              Submit
            </button>
          ) : (
            <button type="button" className="next" onClick={nextSlide}>
              Next
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
