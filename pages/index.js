import React, { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [chaturbateModels, setChaturbateModels] = useState([]);
  const [cambuilderModels, setCambuilderModels] = useState([]);

  useEffect(() => {
    async function fetchChaturbate() {
      try {
        const res = await fetch("/api/chaturbate");
        const data = await res.json();
        setChaturbateModels(data.results || []);
      } catch (error) {
        console.error("Error fetching Chaturbate models:", error);
      }
    }

    async function fetchCamBuilder() {
      try {
        const res = await fetch("/api/cambuilder");
        const data = await res.json();
        setCambuilderModels(data);
      } catch (error) {
        console.error("Error fetching CamBuilder models:", error);
      }
    }

    fetchChaturbate();
    fetchCamBuilder();
  }, []);

  return (
    <div>
      <Head>
        <title>Amateur Strippers</title>
        <meta name="description" content="Live webcam models from Chaturbate and CamBuilder (Streamate)" />
      </Head>

      <main>
        <h1>Top Chaturbate Models</h1>
        <div className="model-grid">
          {chaturbateModels.map((model, index) => (
            <div key={index} className="model-card">
              <img src={model.image_url_360x270} alt={model.username} width={200} />
              <h2>{model.username}</h2>
              <p>{model.room_subject}</p>
              <a href={model.chat_room_url} target="_blank" rel="noopener noreferrer">
                Visit Room
              </a>
            </div>
          ))}
        </div>

        <h1>Top CamBuilder (Streamate) Models</h1>
        <div className="model-grid">
          {cambuilderModels.map((model, index) => (
            <div key={index} className="model-card">
              <img src={model.StaticBioPic} alt={model.Name} width={200} />
              <h2>{model.Name}</h2>
              <a href={model.PublicProfileURL} target="_blank" rel="noopener noreferrer">
                Visit Profile
              </a>
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
        img {
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}