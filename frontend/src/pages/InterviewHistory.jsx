import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function InterviewHistory() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await API.get("/interview-history");

      if (res.data.success) {
        setHistory(res.data.history || []);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load interview history");
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      return (
        item.company.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [history, search]);

  const totalInterviews = history.length;

  const averageScore =
    history.length === 0
      ? 0
      : (
          history.reduce((sum, item) => sum + item.score, 0) /
          history.length
        ).toFixed(1);

  const bestScore =
    history.length === 0
      ? 0
      : Math.max(...history.map((item) => item.score));

  const scoreColor = (score) => {
    if (score >= 80) return "#16A34A";
    if (score >= 60) return "#F59E0B";
    return "#DC2626";
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
          fontSize: "28px",
        }}
      >
        Loading Interview History...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "25px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "52px",
          marginBottom: "35px",
        }}
      >
        Interview History
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background: "#2563EB",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h3>Total Interviews</h3>
          <h1>{totalInterviews}</h1>
        </div>

        <div
          style={{
            background: "#16A34A",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h3>Average Score</h3>
          <h1>{averageScore}%</h1>
        </div>

        <div
          style={{
            background: "#7C3AED",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h3>Best Score</h3>
          <h1>{bestScore}%</h1>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          marginBottom: "25px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <div
        style={{
          overflowX: "auto",
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#2563EB",
                color: "white",
              }}
            >
              <th style={{ padding: "16px" }}>Company</th>
              <th>Role</th>
              <th>Score</th>
              <th>Feedback</th>
            </tr>
          </thead>

          <tbody>
                      {filteredHistory.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#666",
                  }}
                >
                  No interview history found.
                </td>
              </tr>
            ) : (
              filteredHistory.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td style={{ padding: "16px" }}>
                    {item.company}
                  </td>

                  <td>{item.role}</td>

                  <td>
                    <span
                      style={{
                        background: scoreColor(item.score),
                        color: "white",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.score}%
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => setSelected(item)}
                      style={{
                        background: "#2563EB",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <Link to="/dashboard">
          <button
            style={{
              background: "#2563EB",
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ← Back to Dashboard
          </button>
        </Link>
      </div>

      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              width: "700px",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "30px",
              borderRadius: "15px",
            }}
          >
            <h2>{selected.company}</h2>

            <p>
              <b>Role:</b> {selected.role}
            </p>

            <p>
              <b>Score:</b> {selected.score}%
            </p>

            <hr />

            <h3>Question</h3>

            <p>{selected.question}</p>

            <h3>Your Answer</h3>

            <p>{selected.answer}</p>

            <h3>AI Feedback</h3>

            <p>{selected.feedback}</p>

            <button
              onClick={() => setSelected(null)}
              style={{
                marginTop: "20px",
                background: "#DC2626",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}