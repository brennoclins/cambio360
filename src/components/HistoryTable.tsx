import type { HistoryItem } from '../types/quote'
import { formatBRL, formatPercent, formatTimestamp } from '../utils/format'

interface HistoryTableProps {
  history: HistoryItem[] | null
  loading: boolean
  error: string | null
  pair: string
}

function TableSkeleton() {
  return (
    <div className="p-5 space-y-3 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex gap-6 h-5">
          <div className="w-20 h-full bg-white/5 rounded" />
          <div className="w-16 h-full bg-white/5 rounded" />
          <div className="w-16 h-full bg-white/5 rounded" />
          <div className="w-14 h-full bg-white/5 rounded" />
          <div className="w-14 h-full bg-white/5 rounded" />
        </div>
      ))}
    </div>
  )
}

export function HistoryTable({ history, loading, error, pair }: HistoryTableProps) {
  return (
    <section className="rounded-xl bg-[#0f1a16] border border-white/5 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Histórico de Fechamento
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Últimos 15 dias &middot; <span className="font-mono text-slate-500">{pair}</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-600 bg-white/5 px-2 py-1 rounded">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
            Fechamento diário
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <TableSkeleton />
        ) : error ? (
          <div className="flex items-center justify-center gap-2 p-8 text-sm text-[#f87171]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        ) : !history || history.length === 0 ? (
          <div className="flex items-center justify-center gap-2 p-8 text-sm text-slate-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 11.625l2.25-2.25M12 11.625l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            Nenhum dado disponível
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Data</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Compra</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Venda</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Variação</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((item, idx) => {
                const pct = Number(item.pctChange)
                const isPositive = pct >= 0
                return (
                  <tr
                    key={item.timestamp ?? idx}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-5 py-3 text-slate-500 whitespace-nowrap text-xs">
                      {formatTimestamp(item.timestamp)}
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums text-white">
                      {formatBRL(item.bid)}
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums text-white">
                      {item.ask ? formatBRL(item.ask) : <span className="text-slate-700">&mdash;</span>}
                    </td>
                    <td className={`px-5 py-3 text-right tabular-nums text-xs font-medium ${
                      isPositive ? 'text-[#4ade80]' : 'text-[#f87171]'
                    }`}>
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          {isPositive ? (
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          )}
                        </svg>
                        {Number(item.varBid) >= 0 ? '+' : ''}{formatBRL(item.varBid)}
                      </span>
                    </td>
                    <td className={`px-5 py-3 text-right font-semibold tabular-nums text-xs ${
                      isPositive ? 'text-[#4ade80]' : 'text-[#f87171]'
                    }`}>
                      {formatPercent(item.pctChange)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
