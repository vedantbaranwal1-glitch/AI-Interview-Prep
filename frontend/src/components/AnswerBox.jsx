import { motion } from "framer-motion";

function AnswerBox({ answer, setAnswer }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "25px",
        marginTop: "25px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          marginBottom: "15px",
          color: "#2563eb",
        }}
      >
        Your Answer
      </h3>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
        rows={8}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          border: "1px solid #ccc",
          fontSize: "16px",
          resize: "vertical",
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        <span>{answer.length} Characters</span>

        <span>
          {answer.trim() === ""
            ? 0
            : answer.trim().split(/\s+/).length}{" "}
          Words
        </span>
      </div>
    </motion.div>
  );
}

export default AnswerBox;