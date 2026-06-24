import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FiUploadCloud, FiFileText, FiCheckCircle } from "react-icons/fi";
import api from "../services/api";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploaded(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
    multiple: false,
  });
  const userId = localStorage.getItem("user_id");

const uploadResume = async () => {
  if (!file) {
    alert("Select a resume first");
    return;
  }

  const userId = localStorage.getItem("user_id");

  const formData = new FormData();
  formData.append("file", file);

  try {
    setLoading(true);

    const res = await api.post(
      `/upload-resume?user_id=${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);

    setUploaded(true);
  } catch (err) {
    console.log(err);
    alert("Upload Failed");
  } finally {
    setLoading(false);
  }
};



  

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: 600,
          background: "#fff",
          padding: 40,
          borderRadius: 20,
          boxShadow: "0 15px 35px rgba(0,0,0,.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 30 }}>
          Upload Resume
        </h1>

        <div
          {...getRootProps()}
          style={{
            border: "3px dashed #2563eb",
            borderRadius: 20,
            padding: 50,
            textAlign: "center",
            cursor: "pointer",
            background: isDragActive ? "#eff6ff" : "#fafafa",
          }}
        >
          <input {...getInputProps()} />

          <FiUploadCloud size={70} color="#2563eb" />

          <h2>
            {isDragActive
              ? "Drop your Resume"
              : "Drag & Drop Resume Here"}
          </h2>

          <p>or click to browse</p>

          <p
            style={{
              color: "gray",
              marginTop: 15,
            }}
          >
            PDF / DOCX
          </p>
        </div>

        {file && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: 25,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#f8fafc",
              padding: 15,
              borderRadius: 12,
            }}
          >
            <div style={{ display: "flex", gap: 15 }}>
              <FiFileText size={35} color="#2563eb" />

              <div>
                <h3>{file.name}</h3>

                <small>
                  {(file.size / 1024).toFixed(1)} KB
                </small>
              </div>
            </div>

            {uploaded && (
              <FiCheckCircle
                size={35}
                color="green"
              />
            )}
          </motion.div>
        )}

        <button
          onClick={uploadResume}
          disabled={loading}
          style={{
            marginTop: 30,
            width: "100%",
            padding: 15,
            border: "none",
            borderRadius: 12,
            background: "#2563eb",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>

        {uploaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: 25,
              background: "#dcfce7",
              color: "#166534",
              padding: 15,
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            ✅ Resume Uploaded Successfully
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}