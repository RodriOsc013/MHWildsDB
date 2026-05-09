import { getElementIcon } from "./elementIcons";
import { getMonsterImage } from "./monsterImages";
const elementTypes = ["fire", "water", "thunder", "ice", "dragon"];
const statusTypes = ["poison", "sleep", "paralysis", "blastblight"];
const effectTypes = ["flash", "stun"];
function normalize(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");
}
function titleCase(value = "") {
  return normalize(value)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
function getLevel(value = {}) {
  return value.level ?? value.stars ?? value.rating ?? value.value ?? 0;
}
function getWeaknessName(weakness = {}) {
  return normalize(
    weakness.element ||
      weakness.status ||
      weakness.effect ||
      weakness.name ||
      ""
  );
}
function buildWeaknessIcons(weaknesses = [], allowedTypes = [], allowedKind) {
  return weaknesses
    .filter((weakness) => weakness.kind === allowedKind)
    .map((weakness) => {
      const name = getWeaknessName(weakness);
      if (!allowedTypes.includes(name)) return null;
      return {
        name,
        label: titleCase(name),
        icon: getElementIcon(name),
        level: getLevel(weakness),
        kind: weakness.kind,
        condition: weakness.condition,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.level - a.level || a.label.localeCompare(b.label));
}
function getBestWeaknesses(weaknessIcons = []) {
  const highestLevel = Math.max(
    ...weaknessIcons.map((weakness) => weakness.level),
    0
  );
  return weaknessIcons.filter(
    (weakness) => weakness.level === highestLevel && highestLevel > 0
  );
}
export function flattenRewards(rewards = []) {
  return rewards.flatMap((reward) => {
    const itemName =
      reward.item?.name ||
      reward.itemName ||
      reward.name ||
      "Unknown Item";
    const rarity = reward.item?.rarity ?? reward.rarity ?? "Unknown";
    const conditions = reward.conditions || reward.drops || reward.sources || [];
    if (!conditions.length) {
      return [
        {
          itemName,
          rarity,
          condition: "Unknown",
          rank: "Unknown",
          quantity: 1,
          chance: null,
          part: null,
        },
      ];
    }
    return conditions.map((condition) => ({
      itemName,
      rarity,
      condition: titleCase(
        condition.kind ||
          condition.condition ||
          condition.method ||
          condition.source ||
          "Unknown"
      ),
      rank: condition.rank || "Unknown",
      quantity: condition.quantity ?? 1,
      chance:
        condition.chance ??
        condition.dropRate ??
        condition.percentage ??
        null,
      part: condition.part || null,
    }));
  });
}
export function decorateMonster(monster) {
  if (!monster) return null;
  const weaknesses = monster.weaknesses || [];
  const allWeaknessIcons = buildWeaknessIcons(
    weaknesses,
    elementTypes,
    "element"
  );
  const weaknessIcons = getBestWeaknesses(allWeaknessIcons);
  const statusWeaknessIcons = buildWeaknessIcons(
    weaknesses,
    statusTypes,
    "status"
  );
  const effectWeaknessIcons = buildWeaknessIcons(
    weaknesses,
    effectTypes,
    "effect"
  );
  const rewardDrops = flattenRewards(monster.rewards);
  return {
    ...monster,
    speciesLabel: titleCase(monster.species || "Unknown"),
    localImage: getMonsterImage(monster.name),
    weaknessIcons,
    allWeaknessIcons,
    statusWeaknessIcons,
    effectWeaknessIcons,
    rewardDrops,
  };
}
export function decorateMonsters(monsters = []) {
  return monsters.map(decorateMonster).filter(Boolean);
}