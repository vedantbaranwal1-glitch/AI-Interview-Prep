import { motion } from "framer-motion";

export default function QuickAction({ icon, title, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        background: "#2563EB",
        color: "white",
        borderRadius: "15px",
        padding: "30px",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(0,0,0,.12)",
      }}
    >
      <div
        style={{
          fontSize: "45px",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h2
        style={{
          margin: 0,
          fontSize: "22px",
        }}
      >
        {title}
      </h2>
    </motion.div>
  );
}