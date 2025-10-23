'use client'

import useSWR from 'swr'
import type { RankingResponse, RawRankingResponse } from '@/lib/types/ranking'
import { transformRankingData } from '@/lib/utils/transformers'
import { REFRESH_INTERVAL, DEDUPING_INTERVAL } from '@/constants/config'

const fetcher = async (url: string): Promise<RankingResponse> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch ranking data')
  }
  const rawData: RawRankingResponse = await response.json()
  return transformRankingData(rawData.players)
}

/**
 * Hook to fetch and transform ranking data
 * Uses SWR for caching and automatic revalidation
 * 
 * @returns Object containing data, loading state, error, and refetch function
 */
export function useRankingData() {
  const { data, error, isLoading, mutate } = useSWR<RankingResponse>(
    '/ranking_complete.json', // Por ahora lee del JSON local, luego será '/api/ranking'
    fetcher,
    {
      refreshInterval: REFRESH_INTERVAL,
      revalidateOnFocus: false,
      dedupingInterval: DEDUPING_INTERVAL,
    }
  )

  return {
    data,
    error,
    isLoading,
    refetch: mutate,
  }
}

