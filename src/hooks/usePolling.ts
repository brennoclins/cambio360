import { useState, useEffect, useCallback } from 'react'

interface UsePollingOptions {
  interval: number
  enabled?: boolean
}

export function usePolling({ interval, enabled = true }: UsePollingOptions) {
  const [tick, setTick] = useState(0)

  const trigger = useCallback(() => {
    setTick(t => t + 1)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const id = setInterval(trigger, interval)
    return () => clearInterval(id)
  }, [enabled, interval, trigger])

  return { tick, isPolling: enabled, trigger }
}
