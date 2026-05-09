const monsterImageModules = import.meta.glob(
  "../assets/monsters/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);
function normalizeName(name = "") {
  return String(name)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]/g, "");
}
const monsterImages = {};
for (const path in monsterImageModules) {
  const fileName = path.split("/").pop().split(".")[0];
  monsterImages[normalizeName(fileName)] = monsterImageModules[path];
}
export function getMonsterImage(monsterName) {
  return monsterImages[normalizeName(monsterName)] || null;
}
