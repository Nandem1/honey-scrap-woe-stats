'use client'

import { useMemo } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { Player } from '@/lib/types/ranking'
import { groupPlayersByClass } from '@/lib/utils/transformers'
import { formatClassName, formatNumber } from '@/lib/utils/formatters'
import { formatKDRatio } from '@/lib/utils/calculations'
import { getClassOrder } from '@/constants/classes'

interface ClassLineupProps {
  players: Player[]
  highlightClass?: string
}

export function ClassLineup({ players, highlightClass }: ClassLineupProps) {
  const [parent] = useAutoAnimate()

  const groupedPlayers = useMemo(() => {
    const grouped = groupPlayersByClass(players)
    // Sort classes by predefined order
    return Object.entries(grouped).sort((a, b) => {
      return getClassOrder(a[0]) - getClassOrder(b[0])
    })
  }, [players])

  if (groupedPlayers.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500">
        No players in lineup
      </div>
    )
  }

  return (
    <div ref={parent} className="space-y-4">
      {groupedPlayers.map(([className, classPlayers]) => {
        const isHighlighted = highlightClass === className
        
        return (
          <div
            key={className}
            className={`rounded-lg border ${
              isHighlighted 
                ? 'border-yellow-500/50 bg-yellow-500/5' 
                : 'border-zinc-800 bg-zinc-950'
            } overflow-hidden`}
          >
            {/* Class Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
              <h3 className={`text-sm font-semibold uppercase tracking-wider ${
                isHighlighted ? 'text-yellow-400' : 'text-zinc-300'
              }`}>
                {formatClassName(className)}
              </h3>
              <span className="text-xs text-zinc-500">
                ({classPlayers.length})
              </span>
            </div>

            {/* Players Table */}
            <div className="divide-y divide-zinc-800">
              {classPlayers.map((player) => (
                <div
                  key={player.name}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-900/50 transition-colors"
                >
                  {/* Player Name */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-100 truncate">
                      {player.name}
                    </p>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right min-w-16">
                      <span className="text-green-400 font-semibold">
                        {formatNumber(player.kills)}
                      </span>
                      <span className="text-zinc-600 text-xs ml-0.5">K</span>
                    </div>
                    
                    <div className="text-right min-w-16">
                      <span className="text-red-400 font-semibold">
                        {formatNumber(player.deaths)}
                      </span>
                      <span className="text-zinc-600 text-xs ml-0.5">D</span>
                    </div>

                    <div className="text-right min-w-16">
                      <span className="text-zinc-200 font-mono font-semibold">
                        {formatKDRatio(player.kills, player.deaths)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

