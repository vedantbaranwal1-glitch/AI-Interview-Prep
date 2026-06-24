import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import PerformanceChart from "../components/PerformanceChart";
import QuickAction from "../components/QuickAction";
import { FaFileAlt } from "react-icons/fa";
import {
  FaClipboardList,
  FaChartLine,
  FaTrophy,
  FaBrain,
  FaUpload,
  FaHistory,
  FaBriefcase,
} from "react-icons/fa";

import { GiArtificialIntelligence } from "react-icons/gi";

import api from "../services/api";

export default function Dashboard() {

  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_interviews: 0,
    average_score: 0,
    best_score: 0,
    uploaded_resumes: 0,
    resume_score: 0,
    resume_feedback: "",
  });

  const [recentInterviews, setRecentInterviews] = useState([]);

  useEffect(() => {
  const userId = localStorage.getItem("user_id");
    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    const userId = localStorage.getItem("user_id");

    try {

        const dashboard = await api.get(`/dashboard/${userId}`);

        setStats(dashboard.data);

    } catch (err) {

        console.log(err);

    }

    try {

        const history = await api.get(`/interview-history/${userId}`);

        if (history.data.success) {
            setRecentInterviews(history.data.history.slice(0, 5));
        }

    } catch (err) {

        console.log(err);

    }

    setLoading(false);
};

  if (loading) {

    return (

      <Layout>

        <h1>Loading Dashboard...</h1>

      </Layout>

    );

  }

  return (

    <Layout>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "35px",
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "38px",
              marginBottom: "8px",
            }}
          >
            Welcome Back 👋
          </h1>

          <p
            style={{
              color: "#64748B",
              fontSize: "18px",
            }}
          >
            Track your interview performance and improve every day.
          </p>

        </div>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
          gap: "25px",
          marginBottom: "35px",
        }}
      >

        <StatCard
          title="Total Interviews"
          value={stats.total_interviews}
          color="#2563EB"
          icon={<FaClipboardList />}
        />

        <StatCard
          title="Resume Score"
          value={`${stats.resume_score}%`}
          color="#0EA5E9"
          icon={<FaFileAlt />}
        />

        <StatCard
          title="Average Score"
          value={`${stats.average_score}%`}
          color="#16A34A"
          icon={<FaChartLine />}
        />

        <StatCard
          title="Best Score"
          value={`${stats.best_score}%`}
          color="#F59E0B"
          icon={<FaTrophy />}
        />

        <StatCard
          title="Uploaded Resumes"
          value={stats.uploaded_resumes}
          color="#8B5CF6"
          icon={<FaBrain />}
        />

      </div>

      <PerformanceChart />
      <div
  style={{
    background: "#fff",
    borderRadius: "20px",
    padding: "25px",
    marginTop: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
  }}
>
  <h2>Resume Feedback</h2>

  <p style={{ whiteSpace: "pre-wrap" }}>
    {stats.resume_feedback || "No resume analyzed yet."}
  </p>
</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          marginTop: "35px",
        }}
      >
            <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Recent Interviews
        </h2>

        {recentInterviews.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#64748B",
            }}
          >
            No interview history found.
          </div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#F8FAFC",
                }}
              >
                <th
                  style={{
                    padding: "14px",
                    textAlign: "left",
                  }}
                >
                  Company
                </th>

                <th
                  style={{
                    padding: "14px",
                    textAlign: "left",
                  }}
                >
                  Role
                </th>

                <th
                  style={{
                    padding: "14px",
                    textAlign: "center",
                  }}
                >
                  Score
                </th>
              </tr>
            </thead>

            <tbody>
              {recentInterviews.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  <td
                    style={{
                      padding: "15px",
                    }}
                  >
                    {item.company}
                  </td>

                  <td
                    style={{
                      padding: "15px",
                    }}
                  >
                    {item.role}
                  </td>

                  <td
                    style={{
                      padding: "15px",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#2563EB",
                    }}
                  >
                    {item.score}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Quick Actions
        </h2>

        <div
          style={{
            display: "grid",
            gap: "18px",
          }}
        >
          <QuickAction
            icon={<FaUpload />}
            title="Upload Resume"
            onClick={() => navigate("/upload")}
          />

          <QuickAction
            icon={<GiArtificialIntelligence />}
            title="Start Interview"
            onClick={() => navigate("/start-interview")}
          />

          <QuickAction
            icon={<FaHistory />}
            title="Interview History"
            onClick={() => navigate("/history")}
          />

          <QuickAction
            icon={<FaBriefcase />}
            title="Career Suggestions"
            onClick={() => navigate("/careers")}
          />
        </div>
      </div>

      </div>

    </Layout>

  );

}