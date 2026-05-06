import { useEffect, useState } from "react";
import { getAllMonsters } from "../services/api";
import MonsterCard from "../components/MonsterCard";
import SkeletonCard from "../components/SkeletonCard";
function groupBySpecies(monsters) {
  return monsters.reduce((groups, monster) => {
    const species = monster.species || "Unknown";
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
  const [collapsed, setCollapsed] = useState({});
  useEffect(() => {
    getAllMonsters().then((data) => {
      setMonsters(data);
      setLoading(false);
    });
  }, []);
  function toggleSpecies(species) {
    setCollapsed((prev) => ({
      ...prev,
      [species]: !prev[species],
    }));
  }
  if (loading) {
    return (
      <div style={{ padding: "1rem", maxWidth: 600, margin: "0 auto" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  const grouped = groupBySpecies(monsters);
  return (
    <div style={{ padding: "1rem", maxWidth: 600, margin: "0 auto" }}>
      {Object.entries(grouped).map(([species, list]) => {
        const isCollapsed = collapsed[species];
        return (
          <div key={species} style={{ marginBottom: "1.5rem" }}>
            <div
              onClick={() => toggleSpecies(species)}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem 0",
                borderBottom: "1px solid #333",
              }}
            >
              <h2 style={{ margin: 0 }}>{species}</h2>
              <span style={{ fontSize: "18px" }}>
                {isCollapsed ? "▶" : "▼"}
              </span>
            </div>
            {!isCollapsed && (
              <div style={{ marginTop: "0.5rem" }}>
                {list.map((monster) => (
                  <MonsterCard key={monster.id} monster={monster} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}