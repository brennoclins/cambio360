import type { QuoteData } from '../types/quote'
import { formatBRL } from '../utils/format'

interface SummaryCardsProps {
  quotes: Record<string, QuoteData> | null
  loading: boolean
}

const highlights = [
  { pair: 'USD-BRL', label: 'Dólar', symbol: 'US$', icon: '🇺🇸' },
  { pair: 'EUR-BRL', label: 'Euro', symbol: '€', icon: '🇪🇺' },
  { pair: 'GBP-BRL', label: 'Libra', symbol: '£', icon: '🇬🇧' },
  { pair: 'BTC-BRL', label: 'Bitcoin', symbol: '₿', icon: '₿' },
]

export function SummaryCards({ quotes, loading }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {highlights.map(h => {
        const data = quotes?.[h.pair]
        const pct = data ? Number(data.pctChange) : 0
        const isPositive = pct >= 0

        return (
          <div
            key={h.pair}
            className="relative p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden group hover:border-slate-700 transition-colors"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl -translate-y-6 translate-x-6 ${
              loading ? 'bg-slate-700/20' : isPositive ? 'bg-emerald-500/10' : 'bg-red-500/10'
            }`} />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{h.icon}</span>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{h.label}</p>
                  <p className="text-[10px] text-slate-600 font-mono">{h.pair}</p>
                </div>
              </div>

              {loading || !data ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-6 w-24 bg-slate-800 rounded" />
                  <div className="h-4 w-14 bg-slate-800 rounded" />
                </div>
              ) : (
                <>
                  <p className={`text-lg font-bold tabular-nums tracking-tight ${
                    isPositive ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {h.symbol} {formatBRL(data.bid)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <svg className={`w-3 h-3 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`} fill="currentColor" viewBox="0 0 20 20">
                      {isPositive ? (
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      )}
                    </svg>
                    <span className={`text-xs font-semibold tabular-nums ${
                      isPositive ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {isPositive ? '+' : ''}{data.pctChange}%
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
