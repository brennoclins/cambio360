import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import type { HistoryItem } from '../types/quote'
import { formatBRL } from '../utils/format'

interface PriceChartProps {
  history: HistoryItem[] | null
  loading: boolean
  pair: string
}

export function PriceChart({ history, loading, pair }: PriceChartProps) {
  const chartData = useMemo(() => {
    if (!history || history.length === 0) return []
    return [...history].reverse().map(item => ({
      date: item.create_date
        ? new Date(item.create_date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
        : '',
      bid: Number(item.bid),
      high: Number(item.high),
      low: Number(item.low),
    }))
  }, [history])

  const priceRange = useMemo(() => {
    if (chartData.length === 0) return { min: 0, max: 1 }
    const allPrices = chartData.flatMap(d => [d.high, d.low])
    const min = Math.min(...allPrices)
    const max = Math.max(...allPrices)
    const padding = (max - min) * 0.1
    return { min: min - padding, max: max + padding }
  }, [chartData])

  const latestPrice = chartData.length > 0 ? chartData[chartData.length - 1].bid : 0
  const firstPrice = chartData.length > 0 ? chartData[0].bid : 0
  const periodChange = firstPrice > 0 ? ((latestPrice - firstPrice) / firstPrice) * 100 : 0
  const isPositive = periodChange >= 0

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-white">Gráfico de Fechamento</h3>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
              {pair}
            </span>
          </div>
          {chartData.length > 0 && (
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold tabular-nums ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                R$ {formatBRL(latestPrice)}
              </span>
              <span className={`text-xs font-semibold tabular-nums ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {isPositive ? '+' : ''}{periodChange.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 bg-slate-800/60 px-2 py-1 rounded">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
          15 dias
        </div>
      </div>

      {loading ? (
        <div className="h-52 flex items-center justify-center">
          <div className="flex items-center gap-2 text-slate-500">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-xs">Carregando gráfico...</span>
          </div>
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-52 flex items-center justify-center text-slate-500 text-xs">
          Sem dados disponíveis
        </div>
      ) : (
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorBid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: '#64748b', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                domain={[priceRange.min, priceRange.max]}
                tick={{ fill: '#64748b', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => v.toFixed(2)}
                width={50}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#e2e8f0',
                }}
                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                formatter={(value: unknown) => [`R$ ${Number(value).toFixed(4)}`, 'Fechamento']}
              />
              <Area
                type="monotone"
                dataKey="bid"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#colorBid)"
                dot={false}
                activeDot={{ r: 4, fill: '#10B981', stroke: '#0f172a', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
