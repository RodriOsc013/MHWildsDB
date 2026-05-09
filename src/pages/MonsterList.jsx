import { useEffect, useState } from "react";
import MonsterCard from "../components/MonsterCard";
import SkeletonCard from "../components/SkeletonCard";
import { getAllMonsters } from "../services/api";
import { decorateMonsters } from "../utils/monsterDecorators";
function groupBySpecies(monsters) {
  return monsters.reduce((groups, monster) => {
    const species = monster.speciesLabel || "Unknown";
    if (!groups[species]) {
      groups[species] = [];
    }
    groups[species].push(monster);
    return groups;
  }, {});
}
export default function MonsterList() {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState({});
  useEffect(() => {
    async function loadMonsters() {
      try {
        const data = await getAllMonsters();
        setMonsters(decorateMonsters(data));
      } catch (err) {
        console.error(err);
        setError("Could not load monsters. Check the API connection and try again.");
      } finally {
        setLoading(false);
      }
    }
    loadMonsters();
  }, []);
  function toggleSpecies(species) {
    setCollapsed((prev) => ({
      ...prev,
      [species]: !prev[species],
    }));
  }
  if (loading) {
    return (
      <div style={{ padding: "1rem", maxWidth: 900, margin: "0 auto" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ padding: "1rem", maxWidth: 900, margin: "0 auto", color: "#fff" }}>
        <p>{error}</p>
      </div>
    );
  }
  const grouped = groupBySpecies(monsters);
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "1rem",
        background: "linear-gradient(180deg, #1a1a1a, #0d0d0d)",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ marginTop: 0 }}>Monster Hunter Wilds Database</h1>
        {Object.entries(grouped).map(([species, list]) => {
          const isCollapsed = collapsed[species];
          return (
            <section key={species} style={{ marginBottom: "1.5rem" }}>
              <button
                type="button"
                onClick={() => toggleSpecies(species)}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem 0",
                  border: "none",
                  borderBottom: "1px solid #333",
                  background: "transparent",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                <h2 style={{ margin: 0 }}>{species}</h2>
                <span style={{ fontSize: "18px" }}>{isCollapsed ? "▶" : "▼"}</span>
              </button>
              {!isCollapsed && (
                <div style={{ marginTop: "0.75rem" }}>
                  {list.map((monster) => (
                    <MonsterCard key={monster.id} monster={monster} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}