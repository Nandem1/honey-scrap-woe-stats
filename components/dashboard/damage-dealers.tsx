'use client'

import { useMemo } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { Player } from '@/lib/types/ranking'
import { formatNumber } from '@/lib/utils/formatters'
import { formatKDRatio } from '@/lib/utils/calculations'

interface DamageDealersProps {
  players: Player[]
  className?: string
}

export function DamageDealers({ players, className = 'Creator' }: DamageDealersProps) {
  const [parent] = useAutoAnimate()

  const damageCreators = useMemo(() => {
    return players
      .filter(p => p.class === className && p.kills > 0)
      .sort((a, b) => b.kills - a.kills)
  }, [players, className])

  if (damageCreators.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
        <h3 className="text-lg font-semibold text-zinc-100 mb-2">
          💥 Damage {className}s
        </h3>
        <p className="text-sm text-zinc-500">
          No damage dealers found in this guild
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-orange-500/30 bg-gradient-to-br from-orange-950/20 to-zinc-950 p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-orange-400">
          💥 Damage {className}s
        </h3>
        <span className="text-xs text-zinc-500 bg-orange-500/20 px-2 py-1 rounded-full">
          {damageCreators.length} found
        </span>
      </div>
      
      <p className="text-xs text-zinc-500 mb-4">
        {className}s with kills (damage dealers, not support)
      </p>

      <div ref={parent} className="space-y-3">
        {damageCreators.map((player, index) => (
          <div
            key={player.name}
            className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/80 border border-orange-500/20 hover:border-orange-500/40 transition-colors"
          >
            {/* Rank Badge */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold">
              {index + 1}
            </div>

            {/* Player Info */}
            <div className="flex-1">
              <p className="font-semibold text-zinc-100">{player.name}</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Score: {formatNumber(player.score)}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xl font-bold text-orange-400">
                  {formatNumber(player.kills)}
                </p>
                <p className="text-xs text-zinc-500">Kills</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-red-400">
                  {formatNumber(player.deaths)}
                </p>
                <p className="text-xs text-zinc-500">Deaths</p>
              </div>

              <div className="text-right min-w-12">
                <p className="text-lg font-mono font-bold text-zinc-100">
                  {formatKDRatio(player.kills, player.deaths)}
                </p>
                <p className="text-xs text-zinc-500">K/D</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Total Damage Kills</span>
          <span className="font-semibold text-orange-400">
            {formatNumber(damageCreators.reduce((sum, p) => sum + p.kills, 0))}
          </span>
        </div>
      </div>
    </div>
  )
}

