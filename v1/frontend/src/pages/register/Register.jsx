import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./../../components/AuthForm";
import "./Register.css";
import "./../../App.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = 'http://localhost:5000/api';
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message || data.error);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const fields = [
    {
      label: "Username",
      name: "username",
      type: "text",
      value: form.username,
      onChange: handleChange,
      inputClass: "input username-input",
      labelClass: "label username-label",
      wrapperClass: "field username-field",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      value: form.email,
      onChange: handleChange,
      inputClass: "input email-input",
      labelClass: "label email-label",
      wrapperClass: "field email-field",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      value: form.password,
      onChange: handleChange,
      inputClass: "input password-input",
      labelClass: "label password-label",
      wrapperClass: "field password-field",
    },
  ];

  return (
    <AuthForm
      title="Create Account"
      className="center"
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Register"
    />
  );
}

export default Register;
