'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import type { GuildData } from '@/lib/types/ranking'
import { groupPlayersByClass } from '@/lib/utils/transformers'
import { formatClassName } from '@/lib/utils/formatters'
import { getClassOrder } from '@/constants/classes'

interface CompactGuildLineupProps {
  guild: GuildData
}

export function CompactGuildLineup({ guild }: CompactGuildLineupProps) {
  const groupedPlayers = useMemo(() => {
    const grouped = groupPlayersByClass(guild.players)
    return Object.entries(grouped).sort((a, b) => {
      return getClassOrder(a[0]) - getClassOrder(b[0])
    })
  }, [guild.players])

  const damageCreators = useMemo(() => {
    return guild.players.filter(p => p.class === 'Creator' && p.kills > 0).length
  }, [guild.players])

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
      {/* Guild Header */}
      <div className="p-4 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <Link 
            href={`/guilds/${encodeURIComponent(guild.name)}`}
            className="text-lg font-semibold text-zinc-100 hover:text-white transition-colors"
          >
            {guild.name}
          </Link>
          <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
            {guild.players.length} players
          </span>
        </div>
        
        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-zinc-500">Kills: </span>
            <span className="text-green-400 font-semibold">{guild.totalKills}</span>
          </div>
          <div>
            <span className="text-zinc-500">Deaths: </span>
            <span className="text-red-400 font-semibold">{guild.totalDeaths}</span>
          </div>
          {damageCreators > 0 && (
            <div>
              <span className="text-zinc-500">💥 Dmg Creators: </span>
              <span className="text-orange-400 font-semibold">{damageCreators}</span>
            </div>
          )}
        </div>
      </div>

      {/* Lineup */}
      <div className="p-4 space-y-3">
        {groupedPlayers.map(([className, classPlayers]) => (
          <div key={className} className="space-y-1">
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              {formatClassName(className)} ({classPlayers.length})
            </div>
            <div className="space-y-0.5 pl-3">
              {classPlayers.map((player) => (
                <div 
                  key={player.name}
                  className="text-sm text-zinc-300 flex items-center justify-between"
                >
                  <span className="truncate flex-1">{player.name}</span>
                  <div className="flex items-center gap-2 text-xs ml-2">
                    <span className="text-green-400">{player.kills}k</span>
                    <span className="text-red-400">{player.deaths}d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

