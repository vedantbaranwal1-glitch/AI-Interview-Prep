import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaRobot,
} from "react-icons/fa";
import { motion } from "framer-motion";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    if (!username || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await api.post("/register", {
        username,
        email,
        password,
      });

      if (res.data.success) {
        setMessage("Registration Successful!");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(res.data.message);
      }
    } catch {
      setError("Unable to register.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
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
        transition={{ duration: 0.5 }}
        style={{
          width: "430px",
          background: "rgba(255,255,255,.15)",
          backdropFilter: "blur(20px)",
          borderRadius: "25px",
          padding: "40px",
          boxShadow: "0 15px 40px rgba(0,0,0,.25)",
          color: "white",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <FaRobot size={65} />
          <h1>Create Account</h1>
          <p>Join AI Interview Prep</p>
        </div>

        {error && (
          <div
            style={{
              background: "#dc2626",
              padding: 10,
              borderRadius: 8,
              marginBottom: 20,
            }}
          >
            {error}
          </div>
        )}

        {message && (
          <div
            style={{
              background: "#16a34a",
              padding: 10,
              borderRadius: 8,
              marginBottom: 20,
            }}
          >
            {message}
          </div>
        )}

        <div style={{ position: "relative", marginBottom: 15 }}>
          <FaUser
            style={{
              position: "absolute",
              top: 17,
              left: 15,
              color: "#666",
            }}
          />

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "15px 15px 15px 45px",
              borderRadius: 10,
              border: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ position: "relative", marginBottom: 15 }}>
          <FaEnvelope
            style={{
              position: "absolute",
              top: 17,
              left: 15,
              color: "#666",
            }}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "15px 15px 15px 45px",
              borderRadius: 10,
              border: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ position: "relative" }}>
          <FaLock
            style={{
              position: "absolute",
              top: 17,
              left: 15,
              color: "#666",
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
              borderRadius: 10,
              border: "none",
              boxSizing: "border-box",
            }}
          />

          <div
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: 17,
              right: 15,
              cursor: "pointer",
              color: "#666",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          onClick={register}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 25,
            padding: 15,
            border: "none",
            borderRadius: 10,
            background: "#fff",
            color: "#2563EB",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <div
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Already have an account?

          <Link
            to="/login"
            style={{
              color: "white",
              marginLeft: 8,
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}