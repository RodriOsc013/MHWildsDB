export default function IconRow({
  icons = [],
  items,
  label,
  emptyText = "None listed",
  large = false,
}) {
  const finalItems = items || icons || [];
  return (
    <div style={{ marginTop: "0.5rem" }}>
      {label && (
        <div
          style={{
            fontSize: "0.8rem",
            color: "#bdbdbd",
            marginBottom: 6,
          }}
        >
          {label}
        </div>
      )}
      {finalItems.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {finalItems.map((item) => (
            <span
              key={`${item.name}-${item.level ?? "resistance"}-${
                item.condition ?? "always"
              }`}
              title={`${item.label}${
                item.level ? ` Lv. ${item.level}` : ""
              }${item.condition ? ` (${item.condition})` : ""}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "0.3rem 0.45rem",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: "0.8rem",
              }}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.label}
                  style={{
                    width: large ? 32 : 20,
                    height: large ? 32 : 20,
                    objectFit: "contain",
                  }}
                />
              )}
              <span>{item.label}</span>
              {item.level > 0 && (
                <strong>Lv. {item.level}</strong>
              )}
            </span>
          ))}
        </div>
      ) : (
        <span
          style={{
            color: "#888",
            fontSize: "0.85rem",
          }}
        >
          {emptyText}
        </span>
      )}
    </div>
  );
}