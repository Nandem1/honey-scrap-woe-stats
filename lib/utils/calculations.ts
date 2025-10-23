/**
 * Calculates Kill/Death ratio
 * Returns Infinity if deaths is 0
 */
export function calculateKDRatio(kills: number, deaths: number): number {
  if (deaths === 0) return kills > 0 ? Infinity : 0
  return Number((kills / deaths).toFixed(2))
}

/**
 * Formats KD ratio for display
 */
export function formatKDRatio(kills: number, deaths: number): string {
  const ratio = calculateKDRatio(kills, deaths)
  if (ratio === Infinity) return '∞'
  return ratio.toFixed(2)
}

/**
 * Calculates average score for a set of players
 */
export function calculateAverageScore(scores: number[]): number {
  if (scores.length === 0) return 0
  const sum = scores.reduce((acc, score) => acc + score, 0)
  return Math.round(sum / scores.length)
}

