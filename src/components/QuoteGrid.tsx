import { useMemo } from 'react'
import type { QuoteData, CurrencyCategory } from '../types/quote'
import { CURRENCY_PAIRS } from '../constants'
import { QuoteCard } from './QuoteCard'

interface QuoteGridProps {
  quotes: Record<string, QuoteData> | null
  loading: boolean
  refreshing: boolean
  activeCategory: CurrencyCategory
  selectedPair: string
  onSelectPair: (pair: string) => void
}

export function QuoteGrid({
  quotes,
  loading,
  refreshing,
  activeCategory,
  selectedPair,
  onSelectPair,
}: QuoteGridProps) {
  const filteredPairs = useMemo(
    () => CURRENCY_PAIRS.filter(p => p.category === activeCategory),
    [activeCategory],
  )

  return (
    <section>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 transition-all duration-300 ${
          refreshing ? 'opacity-50 scale-[0.99]' : 'opacity-100 scale-100'
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
    </section>
  )
}
