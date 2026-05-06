export default function SkeletonCard() {
  return (
    <div style={{
      padding: "1rem",
      borderRadius: "12px",
      marginBottom: "1rem",
      background: "#ddd",
      animation: "pulse 1.5s infinite"
    }}>
      <div style={{
        height: "20px",
        width: "60%",
        background: "#ccc",
        marginBottom: "10px"
      }} />
      <div style={{
        height: "14px",
        width: "40%",
        background: "#ccc"
      }} />
    </div>
  );
}