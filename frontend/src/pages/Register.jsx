import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API_URL}/api/auth/register`,
        formData
      );

      alert("Account created!");

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.error ||
        "Registration failed"
      );
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Account
        </button>

      </form>
    </div>
  );
}

export default Register;