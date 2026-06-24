import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <div
      style={{
        height: "70px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        style={{
          width: "300px",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          outline: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <FaBell size={22} color="#555" />
        <FaUserCircle size={38} color="#2563EB" />
      </div>
    </div>
  );
}