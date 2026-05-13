import { useState } from 'react'
import type { QuoteType } from '../types/quote'
import { POLLING_INTERVAL_MS } from '../constants'
import { useQuotes } from '../hooks/useQuotes'
import { useHistory } from '../hooks/useHistory'
import { Header } from './Header'
import { RefreshBar } from './RefreshBar'
import { QuoteTypeTabs } from './QuoteTypeTabs'
import { QuoteGrid } from './QuoteGrid'
import { HistoryTable } from './HistoryTable'

export function Dashboard() {
  const [activeType, setActiveType] = useState<QuoteType>('standard')
  const { quotes, loading, refreshing, error, lastUpdated, refresh } = useQuotes(POLLING_INTERVAL_MS)
  const {
    history,
    loading: historyLoading,
    error: historyError,
    selectedPair,
    setSelectedPair,
  } = useHistory('USD-BRL')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <RefreshBar
          lastUpdated={lastUpdated}
          refreshing={refreshing}
          error={error}
          onRefresh={refresh}
        />

        <QuoteTypeTabs active={activeType} onChange={setActiveType} />

        <QuoteGrid
          quotes={quotes}
          loading={loading}
          refreshing={refreshing}
          activeType={activeType}
          selectedPair={selectedPair}
          onSelectPair={setSelectedPair}
        />

        {!loading && (
          <HistoryTable
            history={history}
            loading={historyLoading}
            error={historyError}
            pair={selectedPair}
          />
        )}
      </main>
    </div>
  )
}
