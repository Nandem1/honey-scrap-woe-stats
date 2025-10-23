'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useGuildStats } from '@/lib/hooks/use-guild-stats'
import { useRankingData } from '@/lib/hooks/use-ranking-data'
import { ClassLineup } from '@/components/dashboard/class-lineup'
import { DamageDealers } from '@/components/dashboard/damage-dealers'
import { CardSkeleton } from '@/components/shared/loading-skeleton'
import { EmptyState } from '@/components/shared/empty-state'
import { formatNumber } from '@/lib/utils/formatters'
import { calculateKDRatio, formatKDRatio } from '@/lib/utils/calculations'

export default function GuildDetailPage() {
  const params = useParams()
  const router = useRouter()
  const guildName = decodeURIComponent(params.name as string)
  
  const guildData = useGuildStats(guildName)
  const { isLoading, error } = useRankingData()

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load guild data</p>
          <button
            onClick={() => router.push('/')}
            className="text-sm text-zinc-400 hover:text-zinc-300 underline"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <header className="border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="h-8 w-48 bg-zinc-800 animate-pulse rounded" />
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </main>
      </div>
    )
  }

  if (!guildData) {
    return (
      <div className="min-h-screen bg-black">
        <header className="border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              ← Back to dashboard
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <EmptyState
            title="Guild not found"
            description={`The guild "${guildName}" could not be found.`}
          />
        </main>
      </div>
    )
  }

  const totalKD = calculateKDRatio(guildData.totalKills, guildData.totalDeaths)

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  ← Dashboard
                </Link>
                <Link
                  href="/lineups"
                  className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  All Lineups
                </Link>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zinc-100">
                  {guildData.name}
                </h1>
                <p className="text-sm text-zinc-500 mt-1">
                  Guild lineup and statistics
                </p>
              </div>
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
        {/* Guild Stats Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                Total Players
              </p>
              <p className="text-3xl font-bold text-zinc-100">
                {guildData.players.length}
              </p>
            </div>
            
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                Total Kills
              </p>
              <p className="text-3xl font-bold text-green-400">
                {formatNumber(guildData.totalKills)}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                Total Deaths
              </p>
              <p className="text-3xl font-bold text-red-400">
                {formatNumber(guildData.totalDeaths)}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
                K/D Ratio
              </p>
              <p className="text-3xl font-bold text-zinc-100">
                {formatKDRatio(guildData.totalKills, guildData.totalDeaths)}
              </p>
            </div>
          </div>
        </section>

        {/* Damage Creators Section */}
        <section className="mb-8">
          <DamageDealers players={guildData.players} />
        </section>

        {/* Class Composition */}
        <section>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 mb-6">
            <h2 className="text-xl font-semibold text-zinc-100 mb-2">
              Complete Lineup
            </h2>
            <p className="text-sm text-zinc-500">
              All {guildData.players.length} players organized by class
            </p>
          </div>

          <ClassLineup players={guildData.players} />
        </section>
      </main>
    </div>
  )
}

