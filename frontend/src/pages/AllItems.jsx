import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";
import { Link } from "react-router-dom";

function AllItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/items`
      );

      setItems(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>All Items</h1>

      {items.map((item) => (
        <div
          key={item.id}
          className="card"
        >
          <h3>
            <Link to={`/items/${item.id}`}>
              {item.item_name}
            </Link>
          </h3>

          <p>
            {item.description.length > 100
              ? item.description.substring(0, 100) + "..."
              : item.description}
          </p>

          <p>
            Quantity: {item.quantity}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AllItems;