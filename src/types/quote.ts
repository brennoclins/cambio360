export type QuoteType = 'standard' | 'turismo' | 'ptax'

export interface QuoteData {
  code: string
  codein: string
  name: string
  high: string
  low: string
  varBid: string
  pctChange: string
  bid: string
  ask: string
  timestamp: string
  create_date: string
}

export interface HistoryItem {
  bid: string
  high: string
  low: string
  varBid: string
  pctChange: string
  timestamp: string
  create_date?: string
  code?: string
  codein?: string
  name?: string
  ask?: string
}

export interface CurrencyPair {
  code: string
  codein: string
  pair: string
  label: string
  symbol: string
  type: QuoteType
}
