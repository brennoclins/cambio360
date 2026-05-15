import { formatDateTime } from '../utils/format'

interface TopBarProps {
  lastUpdated: Date | null
  refreshing: boolean
  onRefresh: () => void
  onMenuToggle: () => void
}

export function TopBar({ lastUpdated, refreshing, onRefresh, onMenuToggle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div>
            <h2 className="text-sm font-semibold text-white">Cotações em Tempo Real</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lastUpdated ? `Atualizado ${formatDateTime(lastUpdated)}` : 'Carregando...'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 rounded-lg ring-1 ring-slate-700/50">
            <span className={`inline-block w-2 h-2 rounded-full ${refreshing ? 'bg-blue-400 animate-pulse' : 'bg-emerald-400'}`} />
            <span className="text-xs text-slate-400 font-medium">
              {refreshing ? 'Atualizando' : 'Ao vivo'}
            </span>
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/60 rounded-lg
                       ring-1 ring-slate-700/50 hover:ring-slate-600 hover:text-white
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <svg
              className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : 'hover:rotate-180'} transition-transform duration-500`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
            </svg>
            <span className="hidden sm:inline">{refreshing ? '...' : 'Refresh'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
