import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { preloadImage } from "../utils/imageCache";
export default function MonsterCard({ monster }) {
  const navigate = useNavigate();
  const image =
    monster.icon ||
    monster.image ||
    monster.thumbnail ||
    monster.assets?.icon;
  useEffect(() => {
    if (image) preloadImage(image);
  }, [image]);
  return (
    <div
      onClick={() => navigate(`/monster/${monster.id}`)}
      style={{
        padding: "1rem",
        marginBottom: "0.75rem",
        borderRadius: "12px",
        background: "#1e1e1e",
        color: "#fff",
        display: "flex",
        gap: "1rem",
        cursor: "pointer",
      }}
    >
      {image && (
        <img
          src={image}
          alt={monster.name}
          style={{ width: 50, height: 50 }}
        />
      )}
      <div>
        <h3 style={{ margin: 0 }}>{monster.name}</h3>
        <small>{monster.species}</small>
      </div>
    </div>
  );
}