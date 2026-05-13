import { useState, useCallback, useEffect, useRef } from 'react'
import { fetchLastQuotes } from '../api/quotes'
import type { QuoteData } from '../types/quote'

export function useQuotes(pollingInterval: number | null = 60000) {
  const [quotes, setQuotes] = useState<Record<string, QuoteData> | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const mountedRef = useRef(true)
  const initialDoneRef = useRef(false)

  const fetchData = useCallback(async (isInitial: boolean) => {
    if (isInitial) {
      setLoading(true)
    } else {
      setRefreshing(true)
    }
    setError(null)

    try {
      const data = await fetchLastQuotes()
      if (!mountedRef.current) return
      setQuotes(data)
      setLastUpdated(new Date())
    } catch (err) {
      if (!mountedRef.current) return
      const message = err instanceof Error ? err.message : 'Erro inesperado'
      setError(message)
    } finally {
      if (mountedRef.current) {
        setLoading(false)
        setRefreshing(false)
      }
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    if (!initialDoneRef.current) {
      initialDoneRef.current = true
      fetchData(true)
    }

    if (pollingInterval === null) return

    const id = setInterval(() => {
      fetchData(false)
    }, pollingInterval)

    return () => {
      mountedRef.current = false
      clearInterval(id)
    }
  }, [pollingInterval, fetchData])

  const refresh = useCallback(() => {
    fetchData(false)
  }, [fetchData])

  return { quotes, loading, refreshing, error, lastUpdated, refresh }
}
