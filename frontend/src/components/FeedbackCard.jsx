import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

export default function FeedbackCard({ feedback }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <FaRobot
          size={35}
          color="#2563eb"
        />

        <h2
          style={{
            margin: 0,
            color: "#2563eb",
          }}
        >
          AI Feedback
        </h2>
      </div>

      <p
        style={{
          fontSize: "17px",
          lineHeight: "1.8",
          color: "#444",
        }}
      >
        {feedback}
      </p>
    </motion.div>
  );
}