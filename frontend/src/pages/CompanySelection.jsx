import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanySelection() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("Google");
  const [difficulty, setDifficulty] = useState("Medium");

  const startInterview = () => {
    localStorage.setItem("company", company);
    localStorage.setItem("difficulty", difficulty);

    navigate("/interview");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9",
      }}
    >
      <div
        style={{
          width: "520px",
          background: "#fff",
          padding: "45px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563EB",
            marginBottom: "40px",
            fontSize: "48px",
          }}
        >
          Start AI Interview
        </h1>

        {/* Company */}
        <label
          style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: "bold",
            fontSize: "22px",
            textAlign: "center",
          }}
        >
          Company
        </label>

        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "35px",
            fontSize: "18px",
          }}
        >
          <option value="Google">Google</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Amazon">Amazon</option>
          <option value="Meta">Meta</option>
          <option value="Apple">Apple</option>
          <option value="Netflix">Netflix</option>
          <option value="Adobe">Adobe</option>
          <option value="Oracle">Oracle</option>
          <option value="IBM">IBM</option>
          <option value="Infosys">Infosys</option>
          <option value="TCS">TCS</option>
          <option value="Wipro">Wipro</option>
          <option value="Accenture">Accenture</option>
        </select>

        {/* Difficulty */}
        <label
          style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: "bold",
            fontSize: "22px",
            textAlign: "center",
          }}
        >
          Difficulty
        </label>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "40px",
            fontSize: "18px",
          }}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <button
          onClick={startInterview}
          style={{
            width: "100%",
            padding: "16px",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}