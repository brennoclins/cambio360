import { useState } from 'react'
import type { CurrencyCategory } from '../types/quote'
import { POLLING_INTERVAL_MS } from '../constants'
import { useQuotes } from '../hooks/useQuotes'
import { useHistory } from '../hooks/useHistory'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { SummaryCards } from './SummaryCards'
import { PriceChart } from './PriceChart'
import { QuoteGrid } from './QuoteGrid'
import { HistoryTable } from './HistoryTable'

export function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<CurrencyCategory>('principais')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { quotes, loading, refreshing, error, lastUpdated, refresh } = useQuotes(POLLING_INTERVAL_MS)
  const {
    history,
    loading: historyLoading,
    error: historyError,
    selectedPair,
    setSelectedPair,
  } = useHistory('USD-BRL')

  return (
    <div className="min-h-screen bg-[#0c1a16]">
      <Sidebar
        active={activeCategory}
        onChange={setActiveCategory}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[60px]' : 'lg:ml-[240px]'}`}>
        <TopBar
          lastUpdated={lastUpdated}
          refreshing={refreshing}
          onRefresh={refresh}
          onMenuToggle={() => setMobileMenuOpen(o => !o)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-[#f87171]/10 border border-[#f87171]/20 rounded-xl text-sm text-[#f87171]">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="flex-1">{error}</span>
              <button
                type="button"
                onClick={refresh}
                className="text-sm font-semibold text-[#fca5a5] underline hover:no-underline cursor-pointer shrink-0"
              >
                Tentar novamente
              </button>
            </div>
          )}

          <SummaryCards quotes={quotes} loading={loading} />

          <div className="hidden sm:grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <PriceChart
                history={history}
                loading={historyLoading}
                pair={selectedPair}
              />
            </div>
            <div className="xl:col-span-1">
              <div className="p-4 rounded-xl bg-[#0f1a16] border border-white/5 h-full">
                <h3 className="text-sm font-semibold text-white mb-3">Mercados</h3>
                <div className="space-y-2">
                  {['principais', 'crypto', 'ptax'].map(cat => {
                    const isActive = activeCategory === cat
                    const labels: Record<string, string> = {
                      principais: 'Principais moedas',
                      crypto: 'Criptomoedas',
                      ptax: 'Taxas PTAX',
                    }
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as CurrencyCategory)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#a3e635]/10 text-[#a3e635]'
                            : 'text-slate-600 hover:text-slate-400 hover:bg-white/5'
                        }`}
                      >
                        <span>{labels[cat]}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700">Atualização</span>
                    <span className="text-slate-500 font-mono">60s</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-slate-700">Moedas</span>
                    <span className="text-slate-500 font-mono">60</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-slate-700">Fonte</span>
                    <a href="https://docs.awesomeapi.com.br" target="_blank" rel="noopener noreferrer" className="text-[#a3e635]/70 hover:text-[#a3e635] hover:underline">
                      AwesomeAPI
                    </a>
                  </div>
                </div>
              </div>
            </div>
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

        <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-6 mt-8 border-t border-white/5">
          <p className="text-[11px] text-slate-700 text-center">
            Dados fornecidos por{' '}
            <a href="https://docs.awesomeapi.com.br" target="_blank" rel="noopener noreferrer" className="text-slate-600 underline hover:text-slate-500">
              AwesomeAPI
            </a>
            {' '}&middot; 60 pares monitorados &middot; Atualizações a cada 60s
          </p>
        </footer>
      </div>
    </div>
  )
}
