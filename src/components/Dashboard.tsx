import { useState } from 'react'
import type { CurrencyCategory } from '../types/quote'
import { POLLING_INTERVAL_MS } from '../constants'
import { useQuotes } from '../hooks/useQuotes'
import { useHistory } from '../hooks/useHistory'
import { Header } from './Header'
import { RefreshBar } from './RefreshBar'
import { CategoryTabs } from './CategoryTabs'
import { QuoteGrid } from './QuoteGrid'
import { HistoryTable } from './HistoryTable'

export function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<CurrencyCategory>('principais')
  const { quotes, loading, refreshing, error, lastUpdated, refresh } = useQuotes(POLLING_INTERVAL_MS)
  const {
    history,
    loading: historyLoading,
    error: historyError,
    selectedPair,
    setSelectedPair,
  } = useHistory('USD-BRL')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
          <RefreshBar
            lastUpdated={lastUpdated}
            refreshing={refreshing}
            error={error}
            onRefresh={refresh}
          />
        </div>

        <QuoteGrid
          quotes={quotes}
          loading={loading}
          refreshing={refreshing}
          activeCategory={activeCategory}
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

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-[11px] text-slate-400 text-center">
          Dados fornecidos por{' '}
          <a href="https://docs.awesomeapi.com.br" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">
            AwesomeAPI
          </a>
          {' '}&middot; 60 pares monitorados &middot; Atualizações a cada 60s
        </p>
      </footer>
    </div>
  )
}
