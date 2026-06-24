import { useState } from "react";
import API from "../services/api";

function CareerSuggestions() {
  const [filename, setFilename] = useState("");
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    if (!filename.trim()) {
      alert("Please enter the uploaded resume filename.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/career-suggestions?filename=${encodeURIComponent(filename)}`
      );

      if (res.data.success) {
        setCareers(res.data.recommended_careers || []);
      } else {
        alert(res.data.message);
        setCareers([]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch career suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        background: "#fff",
        padding: "35px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#1E293B",
        }}
      >
        Career Suggestions
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
          placeholder="Enter uploaded filename (example: Resume.docx)"
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
          onClick={getSuggestions}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            background: "#2563EB",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Loading..." : "Get Suggestions"}
        </button>
      </div>

      <div
        style={{
          background: "#F8FAFC",
          padding: "25px",
          borderRadius: "15px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Suggested Careers
        </h2>

        {careers.length === 0 ? (
          <p style={{ color: "#666" }}>
            No career suggestions available.
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            {careers.map((career, index) => (
              <li
                key={index}
                style={{
                  padding: "15px",
                  marginBottom: "12px",
                  background: "#E0F2FE",
                  borderRadius: "10px",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                💼 {career}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CareerSuggestions;