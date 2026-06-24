import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import AnswerBox from "../components/AnswerBox";
import ScoreCard from "../components/ScoreCard";
import FeedbackCard from "../components/FeedbackCard";


export default function Interview() {

  const navigate = useNavigate();

  // ===========================
  // Company & Difficulty
  // ===========================

  const company =
    localStorage.getItem("company") || "Google";

  const difficulty =
    localStorage.getItem("difficulty") || "Medium";

  // ===========================
  // States
  // ===========================

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [score, setScore] = useState(0);

  const [feedback, setFeedback] = useState(
    "Answer the question and click Submit."
  );
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [completed, setCompleted] = useState(false);

  const [questionNumber, setQuestionNumber] = useState(1);

  const [isListening, setIsListening] = useState(false);
  

  // ===========================
  // Load First Question
  // ===========================

  useEffect(() => {

    loadQuestion();

  }, []);

  // ===========================
  // Text To Speech
  // ===========================

  const speakQuestion = (text) => {

    if (!text) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);

  };

  // ===========================
  // Speech To Text
  // ===========================

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition is not supported in this browser.");

      return;

    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.start();

    setIsListening(true);

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setAnswer(transcript);

      setIsListening(false);

    };

    recognition.onerror = () => {

      setIsListening(false);

      alert("Speech Recognition Failed.");

    };

    recognition.onend = () => {

      setIsListening(false);

    };

  };
  // ===========================
// Load Question
// ===========================

const loadQuestion = async () => {

  try {

    setLoading(true);

    const res = await api.post("/generate-question", {
      company,
      difficulty,
    });

    console.log("Backend Response:", res.data);

    setQuestion(res.data.question);

    //speakQuestion(res.data.question);

    setAnswer("");

    setScore(0);

    setFeedback(
      "Answer the question and click Submit."
    );
    setSubmitted(false);

  } catch (err) {

    console.error(err);

    alert("Unable to generate interview question.");

  } finally {

    setLoading(false);

  }

};

// ===========================
// Submit Answer
// ===========================

const submitAnswer = async () => {

  if (answer.trim() === "") {

    alert("Please write or speak your answer.");

    return;

  }

  try {

    setLoading(true);

    const userId = localStorage.getItem("user_id");

const response = await api.post(
  "/evaluate-answer",
  {
    user_id: Number(localStorage.getItem("user_id")),
    company,
    role: "Software Engineer",
    question,
    answer,
}
);

    if (response.data.success) {

  setScore(response.data.score);

  setFeedback(response.data.feedback);

  setSubmitted(true);

} else {

  alert("Evaluation failed.");

}

  } catch (err) {

    console.error(err);

    alert("Unable to evaluate answer.");

  } finally {

    setLoading(false);

  }

};
// ===========================
// Next Question
// ===========================

const nextQuestion = async () => {

  if (!submitted) {
    alert("Please submit your answer first.");
    return;
  }

  if (questionNumber >= 10) {
    setCompleted(true);
    return;
  }

  setQuestionNumber((prev) => prev + 1);

  await loadQuestion();

};
// ===========================
// Previous Question
// ===========================

const previousQuestion = () => {

  alert(
    "Previous AI questions are not available because each question is generated dynamically."
  );

};
// ===========================
// Interview Completed
// ===========================

if (completed) {

  return (

    <div
      style={{
        maxWidth: "900px",
        margin: "80px auto",
        background: "#ffffff",
        padding: "50px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      }}
    >

      <h1>
        🎉 Interview Completed
      </h1>

      <h2>
        Final Interview Score
      </h2>

      <h1
        style={{
          color: "#2563EB",
          fontSize: "70px",
        }}
      >
        {score}%
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#555",
        }}
      >
        Thank you for completing your AI Interview.
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "30px",
          padding: "15px 35px",
          border: "none",
          borderRadius: "12px",
          background: "#2563EB",
          color: "#fff",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Back to Dashboard
      </button>

    </div>

  );

}

// ===========================
// Main UI
// ===========================

return (

  <div
    style={{
      maxWidth: "1000px",
      margin: "40px auto",
      padding: "20px",
    }}
  >

    <h1
      style={{
        textAlign: "center",
        color: "#2563EB",
        marginBottom: "20px",
      }}
    >
      🤖 AI Mock Interview
    </h1>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginBottom: "20px",
        fontWeight: "bold",
        color: "#2563EB",
        fontSize: "18px",
      }}
    >
      <span>
        🏢 Company: {company}
      </span>

      <span>
        📊 Difficulty: {difficulty}
      </span>
    </div>

    <ProgressBar
      currentQuestion={questionNumber}
      totalQuestions={10}
    />

    <QuestionCard
      questionNumber={questionNumber}
      totalQuestions={10}
      question={question}
    />

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginBottom: "25px",
        flexWrap: "wrap",
      }}
    >

      <button
        onClick={() => speakQuestion(question)}
        style={{
          padding: "12px 25px",
          border: "none",
          borderRadius: "10px",
          background: "#2563EB",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🔊 Speak Question
      </button>

      <button
        onClick={startListening}
        disabled={isListening}
        style={{
          padding: "12px 25px",
          border: "none",
          borderRadius: "10px",
          background: isListening ? "#EF4444" : "#16A34A",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {isListening ? "🎤 Listening..." : "🎤 Speak Answer"}
      </button>

    </div>

    <AnswerBox
      answer={answer}
      setAnswer={setAnswer}
    />
        <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "25px",
        flexWrap: "wrap",
      }}
    >

      <button
        onClick={previousQuestion}
        style={{
          padding: "12px 30px",
          border: "none",
          borderRadius: "10px",
          background: "#64748B",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ⬅ Previous
      </button>

      <button
        onClick={submitAnswer}
        disabled={loading}
        style={{
          padding: "12px 35px",
          border: "none",
          borderRadius: "10px",
          background: "#2563EB",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {loading ? "Evaluating..." : "Submit Answer"}
      </button>

      <button
        onClick={nextQuestion}
        disabled={loading}
        style={{
          padding: "12px 30px",
          border: "none",
          borderRadius: "10px",
          background: "#16A34A",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {questionNumber === 10
          ? "🏁 Finish Interview"
          : "Next Question ➜"}
      </button>

    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "25px",
        marginTop: "35px",
      }}
    >

      <ScoreCard score={score} />

      <FeedbackCard feedback={feedback} />

    </div>

  </div>

);
}