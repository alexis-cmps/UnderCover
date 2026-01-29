/**
 * Génère un identifiant unique simple (non cryptographique).
 */
export function uid(): string {
  return Math.random().toString(36).slice(2, 11);
}

/**
 * Mélange un tableau de manière aléatoire (Fisher-Yates shuffle).
 * Retourne un nouveau tableau sans muter l'original.
 */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
