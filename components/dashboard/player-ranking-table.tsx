'use client'

import { useMemo } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useRankingData } from '@/lib/hooks/use-ranking-data'
import { formatNumber, formatClassName } from '@/lib/utils/formatters'
import { formatKDRatio } from '@/lib/utils/calculations'
import { TableSkeleton } from '@/components/shared/loading-skeleton'
import { EmptyState } from '@/components/shared/empty-state'

interface PlayerRankingTableProps {
  limit?: number
  guildFilter?: string
}

export function PlayerRankingTable({ limit, guildFilter }: PlayerRankingTableProps) {
  const [parent] = useAutoAnimate()
  const { data, isLoading, error } = useRankingData()

  const players = useMemo(() => {
    if (!data?.players) return []
    
    let filtered = data.players
    
    if (guildFilter) {
      filtered = filtered.filter(p => p.guild === guildFilter)
    }
    
    // Sort by score (descending)
    filtered = [...filtered].sort((a, b) => b.score - a.score)
    
    return limit ? filtered.slice(0, limit) : filtered
  }, [data, limit, guildFilter])

  if (error) {
    return (
      <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-6">
        <p className="text-red-400 text-sm">Failed to load ranking data</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-xs text-red-300 hover:text-red-200 underline"
        >
          Retry
        </button>
      </div>
    )
  }

  if (isLoading) {
    return <TableSkeleton rows={limit || 10} />
  }

  if (players.length === 0) {
    return <EmptyState title="No players found" description="No ranking data available." />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-3 px-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Rank
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Player
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Class
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Guild
            </th>
            <th className="text-right py-3 px-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Kills
            </th>
            <th className="text-right py-3 px-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Deaths
            </th>
            <th className="text-right py-3 px-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              K/D
            </th>
            <th className="text-right py-3 px-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Score
            </th>
          </tr>
        </thead>
        <tbody ref={parent}>
          {players.map((player, index) => (
            <tr
              key={player.name}
              className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
            >
              <td className="py-3 px-4">
                <span className="text-sm font-semibold text-zinc-400">
                  #{index + 1}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-medium text-zinc-100">
                  {player.name}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="text-xs text-zinc-400">
                  {formatClassName(player.class)}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="text-xs text-zinc-500">
                  {player.guild}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-sm font-medium text-green-400">
                  {formatNumber(player.kills)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-sm font-medium text-red-400">
                  {formatNumber(player.deaths)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-sm font-mono text-zinc-300">
                  {formatKDRatio(player.kills, player.deaths)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-sm font-semibold text-zinc-100">
                  {formatNumber(player.score)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

