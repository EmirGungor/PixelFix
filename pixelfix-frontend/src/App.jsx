import { useState } from "react";
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
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
  <div className="card">
    <h1 className="logo">PixelFix</h1>
    <p className="subtitle">Bulanık görüntüleri tek tıkla netleştirin.</p>

    <label className="upload-box">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <span>📁 Görsel yükle</span>
    </label>

    {inputUrl && (
      <div className="image-preview">
        <img src={inputUrl} alt="Önizleme" />
      </div>
    )}

    {inputUrl && !resultUrl && (
      <button className="btn primary" disabled={loading}>
        {loading ? "İşleniyor..." : "Resmi Düzelt"}
      </button>
    )}

    {resultUrl && (
      <div className="image-preview">
        <img src={resultUrl} alt="Sonuç" />
        <a href={resultUrl} download className="btn secondary">
          İndir
        </a>
      </div>
    )}

    {error && <p className="error">{error}</p>}
  </div>
</div>


  );
}

export default App;
