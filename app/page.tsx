import { StatsOverview } from '@/components/dashboard/stats-overview'
import { PlayerRankingTable } from '@/components/dashboard/player-ranking-table'
import { GuildStatsCard } from '@/components/dashboard/guild-stats-card'
import { TOP_PLAYERS_COUNT } from '@/constants/config'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-zinc-100">
                WoE Rankings
              </h1>
              <p className="text-sm text-zinc-500 mt-1">
                Real-time War of Emperium dashboard
              </p>
            </div>
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-2">
                <a
                  href="/lineups"
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  All Lineups
                </a>
              </nav>
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
        {/* Stats Overview */}
        <section className="mb-8">
          <StatsOverview />
        </section>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Rankings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
              <div className="p-6 border-b border-zinc-800">
                <h2 className="text-lg font-semibold text-zinc-100">
                  Top Players
                </h2>
                <p className="text-sm text-zinc-500 mt-1">
                  Highest scoring players in WoE
                </p>
              </div>
              <div className="p-6">
                <PlayerRankingTable limit={TOP_PLAYERS_COUNT} />
              </div>
            </div>
          </div>

          {/* Right Column - Guild Stats */}
          <div className="lg:col-span-1 space-y-6">
            <GuildStatsCard />
          </div>
        </div>

        {/* Full Rankings Table */}
        <section className="mt-8">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-100">
                All Players
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Complete ranking of all participants
              </p>
            </div>
            <div className="p-6">
              <PlayerRankingTable />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 mt-12">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-zinc-600">
            Data updates every 5 seconds • Built with Next.js
          </p>
        </div>
      </footer>
    </div>
  )
}
