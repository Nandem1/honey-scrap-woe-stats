'use client'

import Link from 'next/link'
import { useTopGuilds } from '@/lib/hooks/use-guild-stats'
import { formatNumber } from '@/lib/utils/formatters'
import { CardSkeleton } from '@/components/shared/loading-skeleton'
import { EmptyState } from '@/components/shared/empty-state'
import { useRankingData } from '@/lib/hooks/use-ranking-data'

interface GuildStatsCardProps {
  limit?: number
}

export function GuildStatsCard({ limit = 5 }: GuildStatsCardProps) {
  const topGuilds = useTopGuilds(limit)
  const { isLoading, error } = useRankingData()

  if (error) {
    return (
      <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-6">
        <p className="text-red-400 text-sm">Failed to load guild stats</p>
      </div>
    )
  }

  if (isLoading) {
    return <CardSkeleton />
  }

  if (topGuilds.length === 0) {
    return <EmptyState title="No guilds found" description="No guild data available." />
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-lg font-semibold text-zinc-100 mb-4">Top Guilds</h2>
      <div className="space-y-4">
        {topGuilds.map((guild, index) => (
          <Link
            key={guild.name}
            href={`/guilds/${encodeURIComponent(guild.name)}`}
            className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-zinc-700 text-zinc-400 text-sm font-semibold transition-colors">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-zinc-100 group-hover:text-white transition-colors">
                  {guild.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {guild.players.length} players
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-green-400">
                {formatNumber(guild.totalKills)} kills
              </p>
              <p className="text-xs text-zinc-500">
                {formatNumber(guild.totalScore)} score
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

