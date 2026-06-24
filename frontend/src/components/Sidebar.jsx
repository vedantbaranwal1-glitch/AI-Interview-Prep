import { Link } from "react-router-dom";

import {
  FaHome,
  FaUpload,
  FaHistory,
  FaBrain,
  FaBriefcase,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "260px",
        background: "#0F172A",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1
          style={{
            textAlign: "center",
            padding: "30px 0",
          }}
        >
          AI Prep
        </h1>

        <MenuItem to="/dashboard" icon={<FaHome />} text="Dashboard" />
        <MenuItem to="/upload" icon={<FaUpload />} text="Upload Resume" />
        <MenuItem to="/history" icon={<FaHistory />} text="Interview History" />
        <MenuItem to="/skill-analysis" icon={<FaBrain />} text="Skill Analysis" />
        <MenuItem to="/careers" icon={<FaBriefcase />} text="Career Suggestions" />
      </div>

      <div style={{ padding: "20px" }}>
        <Link
          to="/login"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            background: "#EF4444",
            color: "white",
            padding: "15px",
            borderRadius: "10px",
            textDecoration: "none",
          }}
        >
          <FaSignOutAlt />
          Logout
        </Link>
      </div>
    </div>
  );
}

function MenuItem({ to, icon, text }) {
  return (
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        color: "white",
        textDecoration: "none",
        padding: "18px 25px",
        fontSize: "18px",
      }}
    >
      {icon}
      {text}
    </Link>
  );
}