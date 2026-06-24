import { useState } from "react";
import API from "../services/api";

function SkillAnalysis() {
  const [filename, setFilename] = useState("");
  const [skills, setSkills] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [resumeScore, setResumeScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSkills = async () => {
    if (!filename.trim()) {
      alert("Please enter the uploaded filename.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/skill-analysis?filename=${encodeURIComponent(filename)}`
      );

      if (res.data.success) {
        setSkills(res.data.detected_skills || []);
        setRecommendations(res.data.recommended_skills || []);
        setResumeScore(res.data.resume_score);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Skill Analysis
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Enter uploaded filename (example: resume.docx)"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          onClick={analyzeSkills}
          style={{
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {resumeScore !== null && (
        <div
          style={{
            background: "#EFF6FF",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          <h2>Resume Score</h2>

          <h1
            style={{
              color: "#2563EB",
            }}
          >
            {resumeScore}%
          </h1>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
        }}
      >
        <div
          style={{
            background: "#F8FAFC",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h2>Detected Skills</h2>

          {skills.length === 0 ? (
            <p>No skills detected.</p>
          ) : (
            <ul>
              {skills.map((skill, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  ✅ {skill}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          style={{
            background: "#F8FAFC",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h2>Recommended Skills</h2>

          {recommendations.length === 0 ? (
            <p>No recommendations.</p>
          ) : (
            <ul>
              {recommendations.map((skill, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  📘 {skill}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillAnalysis;