import fireIcon from "../assets/element/fire.png";
import waterIcon from "../assets/element/water.png";
import thunderIcon from "../assets/element/thunder.png";
import iceIcon from "../assets/element/ice.png";
import dragonIcon from "../assets/element/dragon.png";
import poisonIcon from "../assets/element/poison.png";
import sleepIcon from "../assets/element/sleep.png";
import paralysisIcon from "../assets/element/paralysis.png";
import blastIcon from "../assets/element/blast.png";
export const elementIcons = {
  fire: fireIcon,
  water: waterIcon,
  thunder: thunderIcon,
  ice: iceIcon,
  dragon: dragonIcon,
  poison: poisonIcon,
  sleep: sleepIcon,
  paralysis: paralysisIcon,
  blast: blastIcon,
  blastblight: blastIcon,
};
export function getElementIcon(name) {
  if (!name) return null;
  const key = String(name).toLowerCase().trim();
  return elementIcons[key] || null;
}