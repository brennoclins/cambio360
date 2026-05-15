import { CURRENCY_PAIRS } from '../constants'

interface ConversionRecord {
  id: number
  pair: string
  amount: number
  result: number
  rate: number
  timestamp: Date
}

interface ConversionHistoryProps {
  history: ConversionRecord[]
}

export function ConversionHistory({ history }: ConversionHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="p-5 rounded-xl bg-[#0f1a16] border border-white/5">
        <h3 className="text-sm font-semibold text-white mb-3">Histórico de Conversões</h3>
        <p className="text-xs text-slate-600">Nenhuma conversão realizada ainda</p>
      </div>
    )
  }

  return (
    <div className="p-5 rounded-xl bg-[#0f1a16] border border-white/5">
      <h3 className="text-sm font-semibold text-white mb-3">Histórico de Conversões</h3>
      <div className="space-y-2">
        {history.map(item => {
          const pair = CURRENCY_PAIRS.find(p => p.pair === item.pair)
          return (
            <div key={item.id} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-lg">{pair?.flag}</span>
                <div>
                  <p className="text-sm font-medium text-white">{pair?.label}</p>
                  <p className="text-xs text-slate-600">
                    {item.amount.toLocaleString('pt-BR')} {item.pair.split('-')[0]}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#a3e635] tabular-nums">
                  R$ {item.result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-slate-600">
                  {item.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
