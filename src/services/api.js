const BASE_URL = "https://wilds.mhdb.io/en";
export async function getMonsterById(id) {
  const res = await fetch(`${BASE_URL}/monsters/${id}`);
  if (!res.ok) return null;
  return res.json();
}
export async function getAllMonsters() {
  const ids = Array.from({ length: 50 }, (_, i) => i + 1); 
  const results = await Promise.all(
    ids.map((id) => getMonsterById(id))
  );
  return results.filter(Boolean);
}