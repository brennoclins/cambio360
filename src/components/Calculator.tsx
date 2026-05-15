import { useState, useMemo } from 'react'
import { useQuotes } from '../hooks/useQuotes'
import { POLLING_INTERVAL_MS, CURRENCY_PAIRS } from '../constants'

export function Calculator() {
  const { quotes, loading } = useQuotes(POLLING_INTERVAL_MS)
  const [amount, setAmount] = useState('1000')
  const [selectedPair, setSelectedPair] = useState('USD-BRL')

  const quote = quotes?.[selectedPair]
  const rate = quote ? Number(quote.bid) : 0
  const result = useMemo(() => {
    const val = Number(amount)
    if (isNaN(val) || rate === 0) return 0
    return val * rate
  }, [amount, rate])

  const standardPairs = CURRENCY_PAIRS.filter(p => p.type === 'standard' && p.category !== 'commodities')

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Calculadora de Câmbio</h2>
        <p className="text-sm text-slate-600 mt-1">Converta qualquer moeda para Real Brasileiro</p>
      </div>

      <div className="p-6 rounded-xl bg-[#0f1a16] border border-white/5 space-y-6">
        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
            Moeda de origem
          </label>
          <div className="relative">
            <select
              value={selectedPair}
              onChange={e => setSelectedPair(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                         focus:outline-none focus:border-[#a3e635]/50 appearance-none cursor-pointer"
            >
              {standardPairs.map(pair => (
                <option key={pair.pair} value={pair.pair} className="bg-[#0f1a16]">
                  {pair.flag} {pair.label} ({pair.pair})
                </option>
              ))}
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
            Valor
          </label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg font-semibold
                       focus:outline-none focus:border-[#a3e635]/50 tabular-nums"
          />
        </div>

        <div className="flex items-center justify-center">
          <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </div>

        <div className="p-5 rounded-xl bg-[#a3e635]/5 border border-[#a3e635]/20">
          <p className="text-xs text-slate-500 mb-1">Valor em Real Brasileiro</p>
          {loading || rate === 0 ? (
            <div className="h-8 w-40 bg-white/5 rounded animate-pulse" />
          ) : (
            <p className="text-3xl font-bold text-[#a3e635] tabular-nums">
              R$ {result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
          {rate > 0 && (
            <p className="text-xs text-slate-600 mt-2">
              Cotação: 1 {selectedPair.split('-')[0]} = R$ {rate.toFixed(4)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
