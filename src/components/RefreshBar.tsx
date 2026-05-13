import { formatDateTime } from '../utils/format'

interface RefreshBarProps {
  lastUpdated: Date | null
  refreshing: boolean
  error: string | null
  onRefresh: () => void
}

export function RefreshBar({ lastUpdated, refreshing, error, onRefresh }: RefreshBarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {refreshing && (
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          )}
          <span className="text-sm text-gray-500">
            {lastUpdated
              ? `Última atualização: ${formatDateTime(lastUpdated)}`
              : 'Aguardando dados...'}
          </span>
          {lastUpdated && (
            <span className="text-xs text-gray-400">(auto 60s)</span>
          )}
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors cursor-pointer"
        >
          {refreshing ? 'Atualizando...' : 'Atualizar'}
        </button>
      </div>
      {error && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
          <button
            type="button"
            onClick={onRefresh}
            className="ml-auto text-sm font-medium underline hover:no-underline cursor-pointer"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  )
}
