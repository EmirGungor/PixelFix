import { useState } from "react";
import SplineBackground from "./components/SplineBackground";
import "./App.css";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError("Lütfen bir görsel dosyası seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setError("");
    setInputUrl(URL.createObjectURL(file));
    setResultUrl("");

    try {
      const res = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });
      const filename = await res.text();
      setResultUrl(`http://localhost:8080/result/${filename}`);
    } catch (err) {
      console.error(err);
      setError("Yükleme sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      {/* <SplineBackground /> */}

      <div className="content-wrapper">
        <label className="upload-area">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <span>{loading ? "Yükleniyor..." : "Görsel Seç veya Sürükle"}</span>
        </label>

        {error && <p className="error">{error}</p>}

        {resultUrl && (
          <div className="result-card">
            <div className="result-images">
              <img src={inputUrl} alt="Önce" />
              <img src={resultUrl} alt="Sonra" />
            </div>
            <p className="success">Görsel başarıyla iyileştirildi!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
