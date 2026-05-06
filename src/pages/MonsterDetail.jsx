import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMonsterById } from "../services/api";
export default function MonsterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monster, setMonster] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMonsterById(id)
      .then((data) => {
        console.log("MONSTER DETAIL API RESPONSE:", data);
        setMonster(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);
  if (loading) {
    return (
      <div
        style={{
          padding: 20,
          minHeight: "100vh",
          background: "#121212",
          color: "#fff",
        }}
      >
        Loading...
      </div>
    );
  }
  if (!monster) {
    return (
      <div
        style={{
          padding: 20,
          minHeight: "100vh",
          background: "#121212",
          color: "#fff",
        }}
      >
        <p>Monster not found or API mismatch</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: 10,
            padding: "8px 12px",
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          ← Go back
        </button>
      </div>
    );
  }
  const image =
    monster.icon ||
    monster.image ||
    monster.thumbnail ||
    monster.assets?.icon ||
    null;
  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1a1a1a, #0d0d0d)",
        color: "#fff",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 20,
          padding: "8px 12px",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}>
        ← Back
      </button>
      <h1 style={{ marginBottom: 10 }}>{monster.name}</h1>
      {image && (
        <img
          src={image}
          alt={monster.name}
          style={{
            width: 140,
            height: 140,
            objectFit: "contain",
            background: "#222",
            borderRadius: 12,
            marginBottom: 15,
          }}
        />
      )}
      <p>
        <strong>Species:</strong> {monster.species}
      </p>
      <p>
        <strong>ID:</strong> {monster.id}
      </p>
      <pre
        style={{
          marginTop: 20,
          fontSize: 12,
          background: "#111",
          padding: 10,
          borderRadius: 8,
          overflowX: "auto",
        }}>
        {JSON.stringify(monster, null, 2)}
      </pre>
    </div>
  );
}