import React, { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [chaturbateModels, setChaturbateModels] = useState([]);
  const [cambuilderModels, setCambuilderModels] = useState([]);
  const [camsodaModels, setCamsodaModels] = useState([]);

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

    async function fetchCamSoda() {
      try {
        const res = await fetch("/api/camsoda");
        const data = await res.json();
        setCamsodaModels(data.result?.slice(0, 8) || []);
      } catch (error) {
        console.error("Error fetching CamSoda models:", error);
      }
    }

    fetchChaturbate();
    fetchCamBuilder();
    fetchCamSoda();
  }, []);

  return (
    <div>
      <Head>
        <title>Amateur Strippers</title>
        <meta name="description" content="Live webcam models from Chaturbate, CamBuilder (Streamate), and CamSoda" />
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

        <h1>Top CamSoda Models</h1>
        <div className="model-grid">
          {camsodaModels.map((model, index) => (
            <div key={index} className="model-card">
              <img src={model.preview_image_url} alt={model.username} width={200} />
              <h2>{model.username}</h2>
              <a href={model.chatroom_url} target="_blank" rel="noopener noreferrer">
                Visit Room
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