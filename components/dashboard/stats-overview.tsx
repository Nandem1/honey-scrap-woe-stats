'use client'

import { useMemo } from 'react'
import { useRankingData } from '@/lib/hooks/use-ranking-data'
import { formatNumber } from '@/lib/utils/formatters'
import { Skeleton } from '@/components/shared/loading-skeleton'

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  trend?: 'up' | 'down' | 'neutral'
}

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{title}</p>
      <p className="text-3xl font-bold text-zinc-100 mb-1">{value}</p>
      {description && (
        <p className="text-xs text-zinc-600">{description}</p>
      )}
    </div>
  )
}

export function StatsOverview() {
  const { data, isLoading, error } = useRankingData()

  const stats = useMemo(() => {
    if (!data) return null

    const totalPlayers = data.players.length
    const totalGuilds = Object.keys(data.guilds).length
    const totalKills = data.players.reduce((sum, p) => sum + p.kills, 0)
    const totalDeaths = data.players.reduce((sum, p) => sum + p.deaths, 0)
    const topPlayer = data.players.reduce((top, p) => 
      p.score > top.score ? p : top
    , data.players[0])

    return {
      totalPlayers,
      totalGuilds,
      totalKills,
      totalDeaths,
      topPlayer,
    }
  }, [data])

  if (error) {
    return (
      <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-6">
        <p className="text-red-400 text-sm">Failed to load stats</p>
      </div>
    )
  }

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Players"
        value={formatNumber(stats.totalPlayers)}
        description="Active in WoE"
      />
      <StatCard
        title="Total Guilds"
        value={formatNumber(stats.totalGuilds)}
        description="Competing guilds"
      />
      <StatCard
        title="Total Kills"
        value={formatNumber(stats.totalKills)}
        description="Across all players"
      />
      <StatCard
        title="Top Player"
        value={stats.topPlayer.name}
        description={`${formatNumber(stats.topPlayer.score)} score`}
      />
    </div>
  )
}

