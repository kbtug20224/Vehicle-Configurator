import React, { useState, useEffect } from "react";

const AboutPage = () => {
  const [data, setData] = useState({
    aboutUs: "",
    whoWeAre: "",
    whoContent: "",
    techStack: "",
    techContent: "",
  });

  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("en-US"); // Default language

  // Function to fetch API data dynamically
  const fetchData = async (key, url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept-Language": language,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Ensures session-based authentication works
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${key}: ${response.status}`);
      }

      const text = await response.text();
      setData((prevData) => ({ ...prevData, [key]: text }));
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch all required data on component mount or language change
  useEffect(() => {
    fetchData("aboutUs", "http://localhost:8080/aboutus");
    fetchData("whoWeAre", "http://localhost:8080/who");
    fetchData("whoContent", "http://localhost:8080/whocontent");
    fetchData("techStack", "http://localhost:8080/techstack");
    fetchData("techContent", "http://localhost:8080/techcontent");
  }, [language]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* Language Selector */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          style={{ padding: "5px", fontSize: "14px" }}
        >
          <option value="en-US">English</option>
          <option value="es-ES">Español</option>
          <option value="hi-IN">हिंदी</option>
        </select>
      </div>

      {/* Display Error Message (if any) */}
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{`Error: ${error}`}</div>}

      {/* About Section */}
      <h2>{data.aboutUs}</h2>
      <h3>{data.whoWeAre}</h3>
      <p>{data.whoContent}</p>

      {/* Tech Stack Section */}
      <h3>{data.techStack}</h3>
      <p>{data.techContent}</p>
    </div>
  );
};

export default AboutPage;

