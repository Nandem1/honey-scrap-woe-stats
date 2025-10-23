import type { RawPlayer, Player, RankingResponse, GuildData, PlayerClass } from '@/lib/types/ranking'

/**
 * Parses a raw player object from the API into a properly typed Player
 */
export function parsePlayer(raw: RawPlayer): Player {
  return {
    position: raw.position,
    name: raw.name,
    class: raw.class as PlayerClass,
    guild: raw.guild,
    kills: parseInt(raw.kills, 10),
    deaths: parseInt(raw.deaths, 10),
    score: parseInt(raw.score, 10),
    country: raw.country,
  }
}

/**
 * Transforms raw ranking data into structured format with guild aggregations
 */
export function transformRankingData(rawPlayers: RawPlayer[]): RankingResponse {
  const players = rawPlayers.map(parsePlayer)
  const guilds: Record<string, GuildData> = {}

  // Group players by guild and calculate stats
  players.forEach((player) => {
    if (!guilds[player.guild]) {
      guilds[player.guild] = {
        name: player.guild,
        totalKills: 0,
        totalDeaths: 0,
        totalScore: 0,
        players: [],
        classCount: {},
      }
    }

    const guild = guilds[player.guild]
    guild.players.push(player)
    guild.totalKills += player.kills
    guild.totalDeaths += player.deaths
    guild.totalScore += player.score

    // Update class count
    guild.classCount[player.class] = (guild.classCount[player.class] || 0) + 1
  })

  return {
    players,
    guilds,
  }
}

/**
 * Groups players by their class
 */
export function groupPlayersByClass(players: Player[]): Record<PlayerClass, Player[]> {
  return players.reduce((acc, player) => {
    if (!acc[player.class]) {
      acc[player.class] = []
    }
    acc[player.class].push(player)
    return acc
  }, {} as Record<PlayerClass, Player[]>)
}

