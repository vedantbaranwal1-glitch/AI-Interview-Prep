import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

export default function ScoreCard({ score }) {

  let color = "#ef4444";

  if (score >= 85) color = "#16a34a";
  else if (score >= 70) color = "#f59e0b";
  else if (score >= 50) color = "#2563eb";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "30px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      }}
    >
      <FaTrophy
        size={50}
        color={color}
      />

      <h3
        style={{
          marginTop: "15px",
          color: "#64748b",
        }}
      >
        Current Score
      </h3>

      <h1
        style={{
          color,
          fontSize: "60px",
          margin: "15px 0",
        }}
      >
        {score}%
      </h1>

      <p
        style={{
          color: "#888",
        }}
      >
        {score >= 85
          ? "Excellent"
          : score >= 70
          ? "Good"
          : score >= 50
          ? "Average"
          : "Needs Improvement"}
      </p>
    </motion.div>
  );
}