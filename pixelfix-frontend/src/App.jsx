import { useState } from "react";
import SplineBackground from "./components/SplineBackground";
import "./App.css";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setInputUrl(URL.createObjectURL(file));
    setResultUrl("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });
      const filename = await res.text();
      setResultUrl(`http://localhost:8080/result/${filename}`);
    } catch (err) {
      setError("Yükleme sırasında bir hata oluştu.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <SplineBackground />

      <div className="content-wrapper">
        <label className="upload-area">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <span>{loading ? "Yükleniyor..." : "Görsel Seç veya Sürükle"}</span>
        </label>

        {error && <p className="error">{error}</p>}

        {resultUrl && (
          <div className="result-image">
            <img src={resultUrl} alt="Sonuç" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
