import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        marginBottom: "25px",
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
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#2563eb",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "28px",
          }}
        >
          <FaRobot />
        </div>

        <div>
          <h3
            style={{
              margin: 0,
              color: "#2563eb",
            }}
          >
            AI Interviewer
          </h3>

          <p
            style={{
              margin: "5px 0 0",
              color: "#777",
            }}
          >
            Question {questionNumber} of {totalQuestions}
          </p>
        </div>
      </div>

      <h2
        style={{
          margin: 0,
          fontSize: "28px",
          lineHeight: "1.5",
          color: "#222",
        }}
      >
        {question}
      </h2>
    </motion.div>
  );
}

export default QuestionCard;