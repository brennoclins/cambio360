import type { CurrencyPair, QuoteData } from '../types/quote'
import { formatBRL } from '../utils/format'

interface QuoteCardProps {
  pair: CurrencyPair
  data: QuoteData | undefined
  loading: boolean
  isSelected: boolean
  onSelect: () => void
}

function QuoteCardSkeleton() {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-12 bg-gray-200 rounded" />
      </div>
      <div className="h-7 w-28 bg-gray-200 rounded mb-2" />
      <div className="flex justify-between">
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

export function QuoteCard({ pair, data, loading, isSelected, onSelect }: QuoteCardProps) {
  if (loading || !data) {
    return <QuoteCardSkeleton />
  }

  const pct = Number(data.pctChange)
  const isPositive = pct >= 0

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-xl border cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-500'
          : 'border-gray-200 bg-white hover:shadow hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {pair.pair}
        </span>
        <span
          className={`text-xs font-medium px-1.5 py-0.5 rounded ${
            isPositive
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {isPositive ? '+' : ''}{data.pctChange}%
        </span>
      </div>
      <div className="text-xl font-bold tabular-nums text-gray-900">
        {pair.symbol} {formatBRL(data.bid)}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1.5">
        <span>Mín: {formatBRL(data.low, 2)}</span>
        <span>Máx: {formatBRL(data.high, 2)}</span>
      </div>
    </button>
  )
}
