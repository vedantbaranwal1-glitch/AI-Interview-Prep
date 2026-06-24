import { motion } from "framer-motion";

function StatCard({ title, value, color = "#2563eb", icon }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
      }}
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "25px",
        width: "220px",
        textAlign: "center",
        borderTop: `6px solid ${color}`,
        boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          fontSize: "35px",
          color,
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          color: "#64748b",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: "#0f172a",
          fontSize: "45px",
          margin: 0,
        }}
      >
        {value}
      </h1>
    </motion.div>
  );
}

export default StatCard;