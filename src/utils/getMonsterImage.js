export function getMonsterImage(monster) {
  if (!monster?.name) return "/assets/icons/default.png";
  const slug = monster.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/'/g, "");
  return `/src/assets/monsters/${slug}.png`;
}