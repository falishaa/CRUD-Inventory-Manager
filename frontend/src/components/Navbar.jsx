import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav
      style={{
        padding: "10px",
        borderBottom: "1px solid black",
        marginBottom: "20px"
      }}
    >
      <Link to="/">All Items</Link>

      {" | "}

      {!token && (
        <>
          <Link to="/login">Login</Link>

          {" | "}

          <Link to="/register">Register</Link>
        </>
      )}

      {token && (
        <>
          <Link to="/dashboard">Dashboard</Link>

          {" | "}

          <Link to="/create-item">
            Create Item
          </Link>

          {" | "}

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;