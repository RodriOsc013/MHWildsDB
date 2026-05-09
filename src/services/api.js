const BASE_URL = "https://wilds.mhdb.io/en";
async function fetchJson(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
export async function getMonsterById(id) {
  return fetchJson(`/monsters/${id}`);
}
export async function getAllMonsters() {
  const monsters = await fetchJson("/monsters");
  return monsters.filter((monster) => monster.kind === "large");
}