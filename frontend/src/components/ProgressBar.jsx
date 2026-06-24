import { motion } from "framer-motion";

export default function ProgressBar({
  currentQuestion,
  totalQuestions,
}) {

  const progress =
    ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div
      style={{
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
          color: "#555",
          fontWeight: "600",
        }}
      >
        <span>
          Question {currentQuestion + 1} of {totalQuestions}
        </span>

        <span>{Math.round(progress)}%</span>
      </div>

      <div
        style={{
          width: "100%",
          height: "14px",
          background: "#E5E7EB",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 0.5,
          }}
          style={{
            height: "100%",
            background:
              "linear-gradient(90deg,#2563EB,#3B82F6)",
            borderRadius: "999px",
          }}
        />
      </div>
    </div>
  );
}