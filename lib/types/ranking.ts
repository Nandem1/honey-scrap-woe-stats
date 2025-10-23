// Raw data types (as received from API/JSON - strings)
export interface RawPlayer {
  position: number
  name: string
  class: string
  guild: string
  kills: string
  deaths: string
  score: string
  country: string
}

export interface RawRankingResponse {
  players: RawPlayer[]
}

// Parsed data types (with proper number types)
export interface Player {
  position: number
  name: string
  class: PlayerClass
  guild: string
  kills: number
  deaths: number
  score: number
  country: string
}

export interface RankingResponse {
  players: Player[]
  guilds: Record<string, GuildData>
}

export interface GuildData {
  name: string
  totalKills: number
  totalDeaths: number
  totalScore: number
  players: Player[]
  classCount: Record<PlayerClass, number>
}

// Player class types
export type PlayerClass =
  | 'Ex.Super Novice'
  | 'Creator'
  | 'Stalker'
  | 'Paladin'
  | 'Professor'
  | 'Champion'
  | 'Sniper'
  | 'High Wizard'
  | 'Lord Knight'
  | 'Whitesmith'
  | 'Assassin Cross'
  | 'Gypsy'
  | 'Clown'
  | 'High Priest'
  | string // Allow other classes not listed

