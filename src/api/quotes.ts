import { apiGet } from './client'
import { CURRENCY_PAIRS } from '../constants'
import type { QuoteData, HistoryItem } from '../types/quote'

export function getAllPairs(): string {
  return CURRENCY_PAIRS.map(p => p.pair).join(',')
}

export async function fetchLastQuotes(): Promise<Record<string, QuoteData>> {
  const pairs = getAllPairs()
  return apiGet<Record<string, QuoteData>>(`/json/last/${pairs}`)
}

export async function fetchDailyHistory(
  pair: string,
  days: number = 15,
): Promise<HistoryItem[]> {
  return apiGet<HistoryItem[]>(`/json/daily/${pair}/${days}`)
}
