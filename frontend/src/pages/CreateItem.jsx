import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";
import { useEffect } from "react";

function CreateItem() {
  useEffect(() => { //redirects user to login if un-authenticated user somehow gets to this page
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    quantity: 0
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
      const token =
        localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/items`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Create Item</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="itemName"
          placeholder="Item Name"
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateItem;