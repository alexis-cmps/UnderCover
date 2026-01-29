import type { Player } from "../types";

/**
 * Calcule le résultat de la partie en fonction des joueurs vivants.
 * 
 * Règles:
 * - Civils gagnent si tous les Undercover et Mr.White sont éliminés
 * - Undercover gagne si Undercover >= Civils vivants (Mr.White exclu)
 * - Mr.White gagne uniquement via guess correct lors de son élimination
 * 
 * @returns Message de victoire ou null si la partie continue
 */
export function computeWinners(players: Player[]): string | null {
  const alive = players.filter((p) => p.alive);
  const aliveCivil = alive.filter((p) => p.role === "CIVIL").length;
  const aliveUnder = alive.filter((p) => p.role === "UNDERCOVER").length;
  const aliveWhite = alive.filter((p) => p.role === "WHITE").length;

  // Civils gagnent si plus aucun Undercover ni White
  if (aliveUnder === 0 && aliveWhite === 0) {
    return "Les civils gagnent 🟢";
  }

  // Undercover gagne si Undercover >= Civils (White exclu du camp civil)
  if (aliveUnder >= aliveCivil && aliveUnder > 0) {
    return "Undercover gagne 🔴";
  }

  return null;
}

/**
 * Calcule le résultat d'un vote.
 * 
 * @returns L'ID du joueur éliminé, ou null si égalité (pas d'élimination en cas d'égalité dans ce MVP).
 */
export function tallyVotes(
  votes: Record<string, string>
): string | null {
  const tally: Record<string, number> = {};

  for (const targetId of Object.values(votes)) {
    tally[targetId] = (tally[targetId] ?? 0) + 1;
  }

  let max = -1;
  let eliminated: string | null = null;
  let tieCount = 0;

  for (const [playerId, count] of Object.entries(tally)) {
    if (count > max) {
      max = count;
      eliminated = playerId;
      tieCount = 0;
    } else if (count === max) {
      tieCount++;
    }
  }

  // En cas d'égalité, personne n'est éliminé (MVP)
  if (tieCount > 0) {
    return null;
  }

  return eliminated;
}
