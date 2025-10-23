'use client'

import { useMemo } from 'react'
import { useRankingData } from './use-ranking-data'
import type { GuildData } from '@/lib/types/ranking'

/**
 * Hook to get statistics for a specific guild
 * 
 * @param guildName - Name of the guild to get stats for
 * @returns Guild data or null if not found
 */
export function useGuildStats(guildName: string): GuildData | null {
  const { data } = useRankingData()

  return useMemo(() => {
    if (!data?.guilds[guildName]) return null
    return data.guilds[guildName]
  }, [data, guildName])
}

/**
 * Hook to get sorted list of guilds by total kills
 * 
 * @param limit - Optional limit for number of guilds to return
 * @returns Array of guild data sorted by total kills (descending)
 */
export function useTopGuilds(limit?: number): GuildData[] {
  const { data } = useRankingData()

  return useMemo(() => {
    if (!data?.guilds) return []
    
    const sortedGuilds = Object.values(data.guilds)
      .sort((a, b) => b.totalKills - a.totalKills)
    
    return limit ? sortedGuilds.slice(0, limit) : sortedGuilds
  }, [data, limit])
}

