import React, { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [cambuilderModels, setCambuilderModels] = useState([]);

  useEffect(() => {
    async function fetchCamBuilder() {
      try {
        const res = await fetch("/api/cambuilder");
        const data = await res.json();
        console.log("Sample CamBuilder model:", data[0]);
        setCambuilderModels(data);
      } catch (error) {
        console.error("Error fetching CamBuilder models:", error);
      }
    }
    fetchCamBuilder();
  }, []);

  return (
    <div>
      <Head>
        <title>Amateur Strippers Debug</title>
      </Head>

      <main>
        <h1>CamBuilder Debug Mode</h1>
        <div className="model-grid">
          {cambuilderModels.map((model, index) => (
            <div key={index} className="model-card">
              <p>Check console for full model details</p>
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 2rem;
        }
        h1 {
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .model-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }
        .model-card {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}