import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/items/${id}`);
      setItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to save changes.");
      return;
    }
    try {
      await axios.put(
        `${API_URL}/api/items/${id}`,
        {
          itemName: item.item_name,
          description: item.description,
          quantity: item.quantity
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditMode(false);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError("You must be logged in to save changes.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.error(error);
    }
  };

  const handleDelete = async () => {
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to delete this item.");
      return;
    }
    try {
      await axios.delete(`${API_URL}/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError("You must be logged in to delete this item.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.error(error);
    }
  };

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {editMode ? (
        <>
          <input
            value={item.item_name}
            onChange={(e) => setItem({ ...item, item_name: e.target.value })}
          />
          <br /><br />
          <textarea
            value={item.description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
          />
          <br /><br />
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => setItem({ ...item, quantity: e.target.value })}
          />
          <br /><br />
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={handleDelete}>Delete Item</button>
        </>
      ) : (
        <>
          <h1>{item.item_name}</h1>
          <p>{item.description}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default ItemDetails;