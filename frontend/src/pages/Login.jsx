import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const login = async () => {
    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("email", res.data.email);

        navigate("/dashboard");
      }   else {
        setError(res.data.message);
      }
    } catch {
      setError("Unable to login.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#2563EB,#3B82F6,#1E3A8A)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
        style={{
          width: "420px",
          background: "rgba(255,255,255,.15)",
          backdropFilter: "blur(20px)",
          borderRadius: "25px",
          padding: "40px",
          boxShadow: "0 15px 40px rgba(0,0,0,.25)",
          color: "white",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <FaRobot
            size={70}
            color="white"
          />

          <h1
            style={{
              marginTop: "15px",
            }}
          >
            AI Interview Prep
          </h1>

          <p
            style={{
              opacity: .8,
            }}
          >
            Welcome Back 👋
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#dc2626",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ position: "relative", marginBottom: "20px" }}>
          <FaEnvelope
            style={{
              position: "absolute",
              left: "15px",
              top: "17px",
              color: "#777",
            }}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "15px 15px 15px 45px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ position: "relative" }}>
          <FaLock
            style={{
              position: "absolute",
              left: "15px",
              top: "17px",
              color: "#777",
            }}
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "15px 45px 15px 45px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <div
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "16px",
              cursor: "pointer",
              color: "#555",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          onClick={login}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            background: "white",
            color: "#2563EB",
            fontWeight: "bold",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          Don't have an account?

          <Link
            to="/register"
            style={{
              color: "#fff",
              fontWeight: "bold",
              marginLeft: "8px",
            }}
          >
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
}