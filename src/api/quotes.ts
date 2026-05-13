import { apiGet } from './client'
import { CURRENCY_PAIRS } from '../constants'
import type { QuoteData, HistoryItem } from '../types/quote'

export function getAllPairs(): string {
  return CURRENCY_PAIRS.map(p => p.pair).join(',')
}

export async function fetchLastQuotes(): Promise<Record<string, QuoteData>> {
  const pairs = getAllPairs()
  const data = await apiGet<Record<string, QuoteData>>(`/json/last/${pairs}`)

  const remapped: Record<string, QuoteData> = {}
  for (const pair of CURRENCY_PAIRS) {
    const apiKey = `${pair.code}${pair.codein}`
    if (data[apiKey]) {
      remapped[pair.pair] = data[apiKey]
    }
  }

  return remapped
}

export async function fetchDailyHistory(
  pair: string,
  days: number = 15,
): Promise<HistoryItem[]> {
  return apiGet<HistoryItem[]>(`/json/daily/${pair}/${days}`)
}
