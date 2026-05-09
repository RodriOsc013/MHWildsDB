import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconRow from "./IconRow";
import { preloadImage } from "../utils/imageCache";
export default function MonsterCard({ monster }) {
  const navigate = useNavigate();
  const image = monster.localImage;
  useEffect(() => {
    if (image) preloadImage(image);
  }, [image]);
  return (
    <button
      type="button"
      onClick={() => navigate(`/monster/${monster.id}`)}
      style={{
        width: "100%",
        padding: "1rem",
        marginBottom: "0.75rem",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "linear-gradient(135deg, #242424, #151515)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "14px",
          background: "rgba(255,255,255,0.06)",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        {image ? (
          <img
            src={image}
            alt={monster.name}
            style={{ width: 64, height: 64, objectFit: "contain" }}
          />
        ) : (
          <span style={{ color: "#777", fontSize: "0.75rem" }}>No Image</span>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <h3 style={{ margin: 0 }}>{monster.name}</h3>
          {monster.bestWeaknessIcons?.map((weakness) => (
            <img
              key={weakness.name}
              src={weakness.icon}
              alt={`Weak to ${weakness.label}`}
              title={`Best weakness: ${weakness.label}`}
              style={{ width: 22, height: 22, objectFit: "contain" }}
            />
          ))}
        </div>
        <small style={{ color: "#bdbdbd" }}>{monster.speciesLabel}</small>
        <IconRow
          label="Weaknesses"
          items={monster.weaknessIcons}
          emptyText="No weaknesses listed"
        />
      </div>
    </button>
  );
}