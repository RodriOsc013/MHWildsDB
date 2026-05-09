import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMonsterById } from "../services/api";
import { decorateMonster } from "../utils/monsterDecorators";
import IconRow from "../components/IconRow";
export default function MonsterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monster, setMonster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Description");
  const [note, setNote] = useState("");
  useEffect(() => {
    async function loadMonster() {
      try {
        setLoading(true);
        const data = await getMonsterById(id);
        console.log("RAW MONSTER DATA:", data);
console.log("RAW WEAKNESSES:", data.weaknesses);
console.log("RAW RESISTANCES:", data.resistances);
        const decoratedMonster = decorateMonster(data);
        setMonster(decoratedMonster);
      } catch (error) {
        console.error("Failed to load monster:", error);
        setMonster(null);
      } finally {
        setLoading(false);
      }
    }
    loadMonster();
  }, [id]);
  useEffect(() => {
    const key = `monster-note-${id}`;
    const savedNote = localStorage.getItem(key) || "";
    setNote(savedNote);
  }, [id]);
  function saveNote(value) {
    setNote(value);
    const key = `monster-note-${id}`;
    localStorage.setItem(key, value);
  }
  if (loading) {
    return (
      <div style={pageStyle}>
        <p>Loading monster...</p>
      </div>
    );
  }
  if (!monster) {
    return (
      <div style={pageStyle}>
        <button onClick={() => navigate("/")} style={backButtonStyle}>
          ← Back
        </button>
        <p>Monster not found.</p>
      </div>
    );
  }
  const tabs = ["Description", "Rewards", "Weaknesses", "Notes"];
  return (
    <div style={pageStyle}>
      <button onClick={() => navigate("/")} style={backButtonStyle}>
        ← Back
      </button>
      <div style={cardStyle}>
        <div style={headerStyle}>
          {monster.localImage && (
            <img
              src={monster.localImage}
              alt={monster.name}
              style={monsterImageStyle}
            />
          )}
          <div>
            <h1 style={titleStyle}>{monster.name}</h1>
            <p style={subtitleStyle}>{monster.species}</p>
            <div style={{ marginTop: "1rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>
                Best Element Weaknesses
              </h3>
              {monster.weaknessIcons?.length ? (
                <IconRow icons={monster.weaknessIcons} />
              ) : (
                <p style={mutedTextStyle}>
                  No elemental weakness data available.
                </p>
              )}
            </div>
          </div>
        </div>
        <div style={tabBarStyle}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...tabButtonStyle,
                background: activeTab === tab ? "#5c2eff" : "#2b2b2b",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={tabContentStyle}>
          {activeTab === "Description" && (
            <div>
              <h2>Description</h2>
              <p style={paragraphStyle}>
                {monster.description || "No description available."}
              </p>
              <div style={{ marginTop: "2rem" }}>
                <h3>Size Categories</h3>
                <ul style={listStyle}>
                  <li>Base Size: {monster.size?.base ?? "Unknown"}</li>
                  <li>Mini Crown: {monster.size?.mini ?? "Unknown"}</li>
                  <li>Silver Crown: {monster.size?.silver ?? "Unknown"}</li>
                  <li>Gold Crown: {monster.size?.gold ?? "Unknown"}</li>
                </ul>
              </div>
            </div>
          )}
          {activeTab === "Rewards" && (
            <div>
              <h2>Rewards</h2>
              {!monster.rewardDrops?.length ? (
                <p>No reward data available.</p>
              ) : (
                <div style={rewardGridStyle}>
                  {monster.rewardDrops.map((reward, index) => (
                    <div key={index} style={rewardCardStyle}>
                      <h3 style={{ marginTop: 0 }}>{reward.itemName}</h3>
                      <p>
                        <strong>Rarity:</strong> {reward.rarity}
                      </p>
                      <p>
                        <strong>Condition:</strong> {reward.condition}
                      </p>
                      <p>
                        <strong>Rank:</strong> {reward.rank}
                      </p>
                      <p>
                        <strong>Quantity:</strong> x{reward.quantity}
                      </p>
                      <p>
                        <strong>Chance:</strong>{" "}
                        {reward.chance !== null
                          ? `${reward.chance}%`
                          : "Unknown"}
                      </p>
                      {reward.part && (
                        <p>
                          <strong>Part:</strong> {reward.part}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === "Weaknesses" && (
            <div>
              <h2>Element Weaknesses</h2>
              {monster.allWeaknessIcons?.length ? (
                <IconRow icons={monster.allWeaknessIcons} large />
              ) : (
                <p>No elemental weakness data available.</p>
              )}
                <div style={{ marginTop: "2rem" }}>
              <h2>Status Weaknesses</h2>
                {monster.statusWeaknessIcons?.length ? (
                  <IconRow icons={monster.statusWeaknessIcons} large />
                ) : (
                  <p>No status weakness data available.</p>
                )}
                </div>
                <div style={{ marginTop: "2rem" }}>
                <h2>Effect Weaknesses</h2>
                {monster.effectWeaknessIcons?.length ? (
                  <IconRow icons={monster.effectWeaknessIcons} large />
                ) : (
                  <p>No effect weakness data available.</p>
                )}
              </div>
            </div>
          )}
          {activeTab === "Notes" && (
            <div>
              <h2>Hunter Notes</h2>
              <p style={mutedTextStyle}>
                Your notes save automatically in this browser.
              </p>
              <textarea
                value={note}
                onChange={(event) => saveNote(event.target.value)}
                placeholder={`Write your notes about ${monster.name}...`}
                style={textareaStyle}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const pageStyle = {
  minHeight: "100vh",
  background: "#121212",
  color: "#fff",
  padding: "2rem",
  boxSizing: "border-box",
};
const backButtonStyle = {
  marginBottom: "1.5rem",
  padding: "0.75rem 1rem",
  borderRadius: "10px",
  border: "none",
  background: "#2b2b2b",
  color: "#fff",
  cursor: "pointer",
};
const cardStyle = {
  background: "#1e1e1e",
  borderRadius: "20px",
  padding: "2rem",
  maxWidth: "1000px",
  margin: "0 auto",
  boxShadow: "0 0 20px rgba(0,0,0,0.4)",
};
const headerStyle = {
  display: "flex",
  gap: "2rem",
  alignItems: "center",
  marginBottom: "2rem",
  flexWrap: "wrap",
};
const monsterImageStyle = {
  width: "180px",
  height: "180px",
  objectFit: "contain",
};
const titleStyle = {
  margin: 0,
  fontSize: "2.5rem",
};
const subtitleStyle = {
  opacity: 0.7,
  marginTop: "0.5rem",
};
const tabBarStyle = {
  display: "flex",
  gap: "1rem",
  marginBottom: "2rem",
  flexWrap: "wrap",
};
const tabButtonStyle = {
  padding: "0.75rem 1rem",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold",
};
const tabContentStyle = {
  background: "#181818",
  padding: "1.5rem",
  borderRadius: "16px",
};
const paragraphStyle = {
  lineHeight: 1.7,
};
const listStyle = {
  lineHeight: 1.8,
};
const rewardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "1rem",
};
const rewardCardStyle = {
  background: "#232323",
  borderRadius: "12px",
  padding: "1rem",
};
const mutedTextStyle = {
  opacity: 0.7,
  marginBottom: "1rem",
};
const textareaStyle = {
  width: "100%",
  minHeight: "220px",
  padding: "1rem",
  borderRadius: "12px",
  border: "1px solid #444",
  background: "#101010",
  color: "#fff",
  resize: "vertical",
  fontSize: "1rem",
  lineHeight: 1.6,
  boxSizing: "border-box",
};