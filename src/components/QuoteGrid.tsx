import { useMemo } from 'react'
import type { QuoteData, QuoteType } from '../types/quote'
import { CURRENCY_PAIRS } from '../constants'
import { QuoteCard } from './QuoteCard'

interface QuoteGridProps {
  quotes: Record<string, QuoteData> | null
  loading: boolean
  refreshing: boolean
  error: string | null
  activeType: QuoteType
  selectedPair: string
  onSelectPair: (pair: string) => void
}

const sectionLabels: Record<QuoteType, { title: string; subtitle: string }> = {
  standard: { title: 'Mercado', subtitle: 'Cotações comerciais das principais moedas' },
  turismo: { title: 'Turismo', subtitle: 'Cotações para compra de moeda estrangeira em espécie' },
  ptax: { title: 'PTAX', subtitle: 'Taxa de câmbio calculada pelo Banco Central' },
}

export function QuoteGrid({
  quotes,
  loading,
  refreshing,
  error,
  activeType,
  selectedPair,
  onSelectPair,
}: QuoteGridProps) {
  const filteredPairs = useMemo(
    () => CURRENCY_PAIRS.filter(p => p.type === activeType),
    [activeType],
  )

  const label = sectionLabels[activeType]

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">{label.title}</h2>
        <p className="text-sm text-slate-400 mt-0.5">{label.subtitle}</p>
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${
          refreshing ? 'opacity-50 scale-[0.99]' : 'opacity-100 scale-100'
        }`}
      >
        {filteredPairs.map(pair => (
          <QuoteCard
            key={pair.pair}
            pair={pair}
            data={quotes?.[pair.pair]}
            loading={loading}
            error={error}
            isSelected={selectedPair === pair.pair}
            onSelect={() => onSelectPair(pair.pair)}
          />
        ))}
      </div>
    </section>
  )
}
