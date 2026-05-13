import type { CurrencyPair, QuoteData } from '../types/quote'
import { formatBRL } from '../utils/format'

interface QuoteCardProps {
  pair: CurrencyPair
  data: QuoteData | undefined
  loading: boolean
  error: string | null
  isSelected: boolean
  onSelect: () => void
}

function QuoteCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-white ring-1 ring-slate-200/60 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 w-16 bg-slate-200 rounded-md" />
        <div className="h-5 w-14 bg-slate-200 rounded-full" />
      </div>
      <div className="h-8 w-32 bg-slate-200 rounded-md mb-3" />
      <div className="flex justify-between">
        <div className="h-3 w-20 bg-slate-200 rounded" />
        <div className="h-3 w-20 bg-slate-200 rounded" />
      </div>
    </div>
  )
}

function TrendArrow({ isPositive }: { isPositive: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}
      fill="currentColor" viewBox="0 0 20 20"
    >
      {isPositive ? (
        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      ) : (
        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
      )}
    </svg>
  )
}

export function QuoteCard({ pair, data, loading, error, isSelected, onSelect }: QuoteCardProps) {
  if (loading) {
    return <QuoteCardSkeleton />
  }

  if (!data) {
    return (
      <div className="p-5 rounded-2xl bg-white ring-1 ring-slate-200/60">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            {pair.pair}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-4 text-sm text-red-400 gap-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">{error || 'Indisponível'}</span>
        </div>
      </div>
    )
  }

  const pct = Number(data.pctChange)
  const isPositive = pct >= 0

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative w-full text-left p-5 rounded-2xl cursor-pointer transition-all duration-200 group ${
        isSelected
          ? 'bg-blue-50 ring-2 ring-blue-500 shadow-lg shadow-blue-500/10 scale-[1.02]'
          : 'bg-white ring-1 ring-slate-200/60 hover:ring-slate-300 hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          {pair.pair}
        </span>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
            isPositive
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60'
              : 'bg-red-50 text-red-700 ring-1 ring-red-200/60'
          }`}
        >
          <TrendArrow isPositive={isPositive} />
          {isPositive ? '+' : ''}{data.pctChange}%
        </span>
      </div>

      <div className={`text-2xl sm:text-3xl font-bold tabular-nums mb-3 tracking-tight ${
        isPositive ? 'text-emerald-600' : 'text-red-600'
      }`}>
        {pair.symbol} {formatBRL(data.bid)}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
        <div>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Compra</span>
          <p className="text-sm font-medium text-slate-700 tabular-nums mt-0.5">
            {formatBRL(data.bid)}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Venda</span>
          <p className="text-sm font-medium text-slate-700 tabular-nums mt-0.5">
            {formatBRL(data.ask)}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Mínima</span>
          <p className="text-sm text-slate-500 tabular-nums mt-0.5">
            {formatBRL(data.low, 2)}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Máxima</span>
          <p className="text-sm text-slate-500 tabular-nums mt-0.5">
            {formatBRL(data.high, 2)}
          </p>
        </div>
      </div>
    </button>
  )
}
