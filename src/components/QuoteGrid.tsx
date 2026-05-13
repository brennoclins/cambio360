import { useMemo } from 'react'
import type { QuoteData, QuoteType } from '../types/quote'
import { CURRENCY_PAIRS } from '../constants'
import { QuoteCard } from './QuoteCard'

interface QuoteGridProps {
  quotes: Record<string, QuoteData> | null
  loading: boolean
  refreshing: boolean
  activeType: QuoteType
  selectedPair: string
  onSelectPair: (pair: string) => void
}

export function QuoteGrid({
  quotes,
  loading,
  refreshing,
  activeType,
  selectedPair,
  onSelectPair,
}: QuoteGridProps) {
  const filteredPairs = useMemo(
    () => CURRENCY_PAIRS.filter(p => p.type === activeType),
    [activeType],
  )

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 transition-opacity ${
        refreshing ? 'opacity-60' : 'opacity-100'
      }`}
    >
      {filteredPairs.map(pair => (
        <QuoteCard
          key={pair.pair}
          pair={pair}
          data={quotes?.[pair.pair]}
          loading={loading}
          isSelected={selectedPair === pair.pair}
          onSelect={() => onSelectPair(pair.pair)}
        />
      ))}
    </div>
  )
}
