import { useState, useEffect, useRef } from 'react'
import { fetchDailyHistory } from '../api/quotes'
import { HISTORY_DAYS } from '../constants'
import type { HistoryItem } from '../types/quote'

export function useHistory(initialPair: string = 'USD-BRL') {
  const [selectedPair, setSelectedPair] = useState(initialPair)
  const [history, setHistory] = useState<HistoryItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fetchIdRef = useRef(0)

  useEffect(() => {
    const id = ++fetchIdRef.current

    fetchDailyHistory(selectedPair, HISTORY_DAYS)
      .then(data => {
        if (id === fetchIdRef.current) {
          setHistory(data)
          setError(null)
        }
      })
      .catch(err => {
        if (id === fetchIdRef.current) {
          const message = err instanceof Error ? err.message : 'Erro inesperado'
          setError(message)
          setHistory([])
        }
      })
  }, [selectedPair])

  return {
    history,
    loading: history === null && error === null,
    error,
    selectedPair,
    setSelectedPair,
  }
}
