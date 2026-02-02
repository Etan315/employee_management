//Login.jsx


// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import AuthForm from "../../components/AuthForm";

const Login = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // ✅ include cookie
      });

      const data = await res.json();

      if (res.ok) {
        await fetchUser(); // refresh user context
        navigate("/dashboard");
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      console.error("❌ Login request failed:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fields configuration for AuthForm
  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      value: form.email,
      onChange: handleChange,
      inputClass: "auth-input",
      labelClass: "auth-label",
      wrapperClass: "auth-field",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      value: form.password,
      onChange: handleChange,
      inputClass: "auth-input",
      labelClass: "auth-label",
      wrapperClass: "auth-field",
    },
  ];

  return (
    <div className="login-container">
      <AuthForm
        title="Login"
        className="auth-form-container"
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel={loading ? "Logging in..." : "Login"}
      >
        {error && <p className="error-message">{error}</p>}

        <p className="auth-links">
          <a href="/forgotpass">Forgot password?</a>
        </p>

        <button className="btn-link">
          <a href="/register">Create new account</a>
        </button>
      </AuthForm>
    </div>
  );
};

export default Login;
