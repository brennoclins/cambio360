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
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-4 rounded bg-slate-800" />
        <div className="h-4 w-16 bg-slate-800 rounded" />
        <div className="ml-auto h-5 w-14 bg-slate-800 rounded-full" />
      </div>
      <div className="h-7 w-28 bg-slate-800 rounded mb-3" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-3 w-16 bg-slate-800 rounded" />
        <div className="h-3 w-16 bg-slate-800 rounded" />
        <div className="h-3 w-16 bg-slate-800 rounded" />
        <div className="h-3 w-16 bg-slate-800 rounded" />
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
      className={`relative w-full text-left p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
        isSelected
          ? 'bg-slate-800/80 border-emerald-500/40 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20'
          : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
      }`}
    >
      <div className="flex items-center gap-2 mb-2.5">
        {pair.flag && (
          <span className="text-base leading-none">{pair.flag}</span>
        )}
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {pair.pair}
        </span>
        {pair.type !== 'standard' && (
          <span className="text-[10px] font-medium text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
            {pair.type === 'turismo' ? 'Turismo' : 'PTAX'}
          </span>
        )}
        <span
          className={`ml-auto inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
            isPositive
              ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
              : 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20'
          }`}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            {isPositive ? (
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            )}
          </svg>
          {isPositive ? '+' : ''}{data.pctChange}%
        </span>
      </div>

      <div className={`text-xl font-bold tabular-nums mb-2.5 tracking-tight ${
        isPositive ? 'text-emerald-400' : 'text-red-400'
      }`}>
        {pair.symbol} {formatBRL(data.bid)}
      </div>

      <p className="text-xs text-slate-500 mb-2.5 truncate">{pair.label}</p>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1 pt-2.5 border-t border-slate-800">
        <div>
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">Compra</span>
          <p className="text-xs font-medium text-slate-300 tabular-nums mt-0.5">
            {formatBRL(data.bid)}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">Venda</span>
          <p className="text-xs font-medium text-slate-300 tabular-nums mt-0.5">
            {formatBRL(data.ask)}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">Mínima</span>
          <p className="text-xs text-slate-400 tabular-nums mt-0.5">
            {formatBRL(data.low, 2)}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">Máxima</span>
          <p className="text-xs text-slate-400 tabular-nums mt-0.5">
            {formatBRL(data.high, 2)}
          </p>
        </div>
      </div>
    </button>
  )
}
