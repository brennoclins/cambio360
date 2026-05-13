import type { HistoryItem } from '../types/quote'
import { formatBRL, formatPercent, formatTimestamp } from '../utils/format'

interface HistoryTableProps {
  history: HistoryItem[] | null
  loading: boolean
  error: string | null
  pair: string
}

function HistoryTableSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex gap-4 h-8">
          <div className="h-full w-24 bg-gray-200 rounded" />
          <div className="h-full w-20 bg-gray-200 rounded" />
          <div className="h-full w-20 bg-gray-200 rounded" />
          <div className="h-full w-16 bg-gray-200 rounded" />
          <div className="h-full w-16 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  )
}

export function HistoryTable({ history, loading, error, pair }: HistoryTableProps) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">
          Histórico — {pair}
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">Fechamento dos últimos 15 dias</p>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-4">
            <HistoryTableSkeleton />
          </div>
        ) : error ? (
          <div className="p-4 text-sm text-red-600">{error}</div>
        ) : !history || history.length === 0 ? (
          <div className="p-4 text-sm text-gray-400">Nenhum dado disponível</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compra
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Venda
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variação
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  %
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map((item, idx) => {
                const pct = Number(item.pctChange)
                return (
                  <tr
                    key={item.timestamp ?? idx}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                      {formatTimestamp(item.timestamp)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium tabular-nums text-gray-900">
                      {formatBRL(item.bid)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium tabular-nums text-gray-900">
                      {item.ask ? formatBRL(item.ask) : '-'}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-600">
                      {Number(item.varBid) >= 0 ? '+' : ''}{formatBRL(item.varBid)}
                    </td>
                    <td className={`px-4 py-2.5 text-right font-medium tabular-nums ${
                      pct >= 0 ? 'text-green-600' : 'text-red-600'
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
