import type { Words } from "../types";

/**
 * Liste de paires de mots pour le jeu Undercover.
 * Chaque paire contient un mot pour les civils et un mot proche pour l'undercover.
 * 
 * Pour ajouter des mots : simplement ajouter des entrées à ce tableau.
 */
export const WORD_PAIRS: Words[] = [
  // ===== FACILE =====
  { civilian: "Chat", undercover: "Chien" },
  { civilian: "Café", undercover: "Thé" },
  { civilian: "Pomme", undercover: "Poire" },
  { civilian: "Soleil", undercover: "Lune" },
  { civilian: "Fromage", undercover: "Beurre" },
  { civilian: "Chocolat", undercover: "Caramel" },
  { civilian: "Rouge", undercover: "Rose" },
  { civilian: "Chaussure", undercover: "Botte" },
  { civilian: "Pull", undercover: "Gilet" },
  { civilian: "Canard", undercover: "Oie" },
  { civilian: "Gâteau", undercover: "Tarte" },
  { civilian: "Lait", undercover: "Yaourt" },
  { civilian: "Pain", undercover: "Baguette" },
  { civilian: "Jour", undercover: "Nuit" },
  { civilian: "Chaud", undercover: "Froid" },
  
  // ===== MOYEN =====
  { civilian: "Plage", undercover: "Piscine" },
  { civilian: "Avion", undercover: "Train" },
  { civilian: "Guitare", undercover: "Piano" },
  { civilian: "Été", undercover: "Printemps" },
  { civilian: "Livre", undercover: "Magazine" },
  { civilian: "Football", undercover: "Basketball" },
  { civilian: "Montagne", undercover: "Colline" },
  { civilian: "Ordinateur", undercover: "Tablette" },
  { civilian: "Restaurant", undercover: "Brasserie" },
  { civilian: "Cinéma", undercover: "Théâtre" },
  { civilian: "Voiture", undercover: "Camion" },
  { civilian: "Mer", undercover: "Océan" },
  { civilian: "Riz", undercover: "Pâtes" },
  { civilian: "Bière", undercover: "Vin" },
  { civilian: "Hiver", undercover: "Automne" },
  { civilian: "Ville", undercover: "Village" },
  { civilian: "Téléphone", undercover: "Smartphone" },
  { civilian: "Table", undercover: "Bureau" },
  { civilian: "Chaise", undercover: "Fauteuil" },
  { civilian: "Banque", undercover: "Poste" },
  { civilian: "Hôtel", undercover: "Auberge" },
  { civilian: "Jus", undercover: "Soda" },
  { civilian: "Salade", undercover: "Soupe" },
  { civilian: "Poulet", undercover: "Dinde" },
  { civilian: "Tomate", undercover: "Poivron" },
  { civilian: "Chapeau", undercover: "Casquette" },
  { civilian: "Pantalon", undercover: "Jean" },
  { civilian: "Sac", undercover: "Cartable" },
  { civilian: "Stylo", undercover: "Crayon" },
  { civilian: "Vélo", undercover: "Trottinette" },
  { civilian: "Moto", undercover: "Scooter" },
  { civilian: "Bateau", undercover: "Voilier" },
  { civilian: "Pluie", undercover: "Neige" },
  { civilian: "Vent", undercover: "Tempête" },
  { civilian: "Forêt", undercover: "Jungle" },
  { civilian: "Rivière", undercover: "Fleuve" },
  { civilian: "Lac", undercover: "Étang" },
  
  // ===== DIFFICILE =====
  { civilian: "Acteur", undercover: "Comédien" },
  { civilian: "Prison", undercover: "Commissariat" },
  { civilian: "Médecin", undercover: "Infirmier" },
  { civilian: "Professeur", undercover: "Instituteur" },
  { civilian: "Miroir", undercover: "Vitre" },
  { civilian: "Escalier", undercover: "Échelle" },
  { civilian: "Montre", undercover: "Horloge" },
  { civilian: "Lunettes", undercover: "Lentilles" },
  { civilian: "Peinture", undercover: "Dessin" },
  { civilian: "Statue", undercover: "Sculpture" },
  { civilian: "Chanson", undercover: "Musique" },
  { civilian: "Film", undercover: "Série" },
  { civilian: "Rêve", undercover: "Cauchemar" },
  { civilian: "Mariage", undercover: "Fiançailles" },
  { civilian: "Anniversaire", undercover: "Fête" },
  { civilian: "Roi", undercover: "Empereur" },
  { civilian: "Château", undercover: "Palais" },
  { civilian: "Espion", undercover: "Détective" },
  { civilian: "Voleur", undercover: "Cambrioleur" },
  { civilian: "Pirate", undercover: "Marin" },
  { civilian: "Vampire", undercover: "Zombie" },
  { civilian: "Fantôme", undercover: "Esprit" },
  { civilian: "Sorcière", undercover: "Magicienne" },
  { civilian: "Dragon", undercover: "Dinosaure" },
  { civilian: "Licorne", undercover: "Cheval" },
  { civilian: "Robot", undercover: "Cyborg" },
  { civilian: "Alien", undercover: "Extraterrestre" },
  { civilian: "Planète", undercover: "Étoile" },
  { civilian: "Astronaute", undercover: "Cosmonaute" },
  { civilian: "Fusée", undercover: "Satellite" },
  
  // ===== TRÈS DIFFICILE =====
  { civilian: "Mensonge", undercover: "Secret" },
  { civilian: "Jalousie", undercover: "Envie" },
  { civilian: "Nostalgie", undercover: "Mélancolie" },
  { civilian: "Sagesse", undercover: "Intelligence" },
  { civilian: "Courage", undercover: "Bravoure" },
  { civilian: "Gentillesse", undercover: "Bonté" },
  { civilian: "Colère", undercover: "Rage" },
  { civilian: "Tristesse", undercover: "Chagrin" },
  { civilian: "Bonheur", undercover: "Joie" },
  { civilian: "Peur", undercover: "Angoisse" },
];

/**
 * Sélectionne une paire de mots aléatoire.
 * Les mots peuvent être inversés aléatoirement (civil ↔ undercover).
 */
export function pickWords(): Words {
  const pair = WORD_PAIRS[Math.floor(Math.random() * WORD_PAIRS.length)];
  
  // 50% de chance d'inverser les mots
  if (Math.random() < 0.5) {
    return {
      civilian: pair.undercover,
      undercover: pair.civilian,
    };
  }
  
  return pair;
}
