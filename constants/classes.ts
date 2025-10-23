import type { PlayerClass } from '@/lib/types/ranking'

/**
 * Preferred class order for lineup displays
 * Classes not in this list will appear at the end
 */
export const CLASS_ORDER: PlayerClass[] = [
  'Professor',
  'Creator',
  'Stalker',
  'Sniper',
  'Ex.Super Novice',
  'Gypsy',
  'Clown',
  'Champion',
  'Paladin',
  'High Priest',
  'Lord Knight',
  'High Wizard',
  'Whitesmith',
  'Assassin Cross',
]

/**
 * Returns the sort order for a class
 * Lower numbers appear first
 */
export function getClassOrder(className: PlayerClass): number {
  const index = CLASS_ORDER.indexOf(className)
  return index === -1 ? 999 : index
}

