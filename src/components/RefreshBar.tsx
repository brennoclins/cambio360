import { formatDateTime } from '../utils/format'

interface RefreshBarProps {
  lastUpdated: Date | null
  refreshing: boolean
  error: string | null
  onRefresh: () => void
}

export function RefreshBar({ lastUpdated, refreshing, error, onRefresh }: RefreshBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-xs ring-1 ring-slate-200/60">
            <span className={`inline-block w-2 h-2 rounded-full ${refreshing ? 'bg-blue-500 animate-pulse' : 'bg-emerald-400'}`} />
            <span className="text-xs text-slate-500 font-medium">
              {lastUpdated
                ? `Atualizado ${formatDateTime(lastUpdated)}`
                : 'Aguardando dados...'}
            </span>
          </div>
          {lastUpdated && (
            <span className="hidden sm:inline text-xs text-slate-400">
              a cada 60s
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white rounded-lg
                     shadow-xs ring-1 ring-slate-200/60 hover:ring-slate-300 hover:text-slate-800
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <svg
            className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
          {refreshing ? 'Atualizando' : 'Atualizar'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-red-50 border border-red-200/80 rounded-xl text-sm text-red-700">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 shrink-0">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={onRefresh}
            className="text-sm font-semibold underline hover:no-underline cursor-pointer shrink-0"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  )
}
