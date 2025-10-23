'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useTopGuilds } from '@/lib/hooks/use-guild-stats'
import { useRankingData } from '@/lib/hooks/use-ranking-data'
import { CompactGuildLineup } from '@/components/dashboard/compact-guild-lineup'
import { CardSkeleton } from '@/components/shared/loading-skeleton'
import { EmptyState } from '@/components/shared/empty-state'

export default function LineupsPage() {
  const allGuilds = useTopGuilds() // Sin límite = todos los guilds
  const { isLoading, error } = useRankingData()

  // Sort guilds alphabetically
  const sortedGuilds = useMemo(() => {
    return [...allGuilds].sort((a, b) => a.name.localeCompare(b.name))
  }, [allGuilds])

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load guild lineups</p>
          <Link
            href="/"
            className="text-sm text-zinc-400 hover:text-zinc-300 underline"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  ← Dashboard
                </Link>
              </div>
              <h1 className="text-2xl font-bold text-zinc-100">
                All Guild Lineups
              </h1>
              <p className="text-sm text-zinc-500">
                Compare and analyze lineups from all guilds
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-zinc-400">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : sortedGuilds.length === 0 ? (
          <EmptyState
            title="No guilds found"
            description="No guild data available at the moment."
          />
        ) : (
          <>
            {/* Stats Overview */}
            <div className="mb-6 p-4 rounded-lg border border-zinc-800 bg-zinc-950">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500">Total Guilds</p>
                  <p className="text-2xl font-bold text-zinc-100">{sortedGuilds.length}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Total Players</p>
                  <p className="text-2xl font-bold text-zinc-100">
                    {sortedGuilds.reduce((sum, g) => sum + g.players.length, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Combined Kills</p>
                  <p className="text-2xl font-bold text-green-400">
                    {sortedGuilds.reduce((sum, g) => sum + g.totalKills, 0)}
                  </p>
                </div>
              </div>
            </div>

            {/* Guilds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedGuilds.map((guild) => (
                <CompactGuildLineup key={guild.name} guild={guild} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

