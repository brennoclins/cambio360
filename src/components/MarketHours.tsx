import { useState, useEffect } from 'react'
import { MARKET_HUBS, DEFAULT_MARKET_CODES } from '../constants'
import { fetchWeather } from '../api/weather'

interface MarketHoursProps {
  convertedCountries: string[]
}

interface MarketInfo {
  code: string
  city: string
  flag: string
  timezone: string
  temp: number | null
  isDay: boolean
  status: 'open' | 'closed' | 'soon'
  timeLeft: string
  localHour: number
}

function getMarketStatus(timezone: string): { status: 'open' | 'closed' | 'soon'; timeLeft: string; localHour: number } {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
  const parts = formatter.formatToParts(now)
  const hour = parseInt(parts.find(p => p.type === 'hour')?.value ?? '0', 10)
  const minute = parseInt(parts.find(p => p.type === 'minute')?.value ?? '0', 10)

  if (hour >= 9 && hour < 17) {
    const minutesLeft = (17 - hour) * 60 - minute
    if (minutesLeft <= 30) {
      return { status: 'soon', timeLeft: 'Closing soon', localHour: hour }
    }
    const h = Math.floor(minutesLeft / 60)
    const m = minutesLeft % 60
    return { status: 'open', timeLeft: `${h}h ${m}m left`, localHour: hour }
  }

  let nextOpen: number
  if (hour >= 17) {
    nextOpen = 9 + 24 - hour
  } else {
    nextOpen = 9 - hour
  }
  return { status: 'closed', timeLeft: `${nextOpen}h to go`, localHour: hour }
}

function buildMarkets(codes: string[]): MarketInfo[] {
  return codes
    .slice(0, 6)
    .map(code => MARKET_HUBS[code])
    .filter(Boolean)
    .map(hub => ({
      code: hub.code,
      city: hub.city,
      flag: hub.flag,
      timezone: hub.timezone,
      temp: hub.code === 'BTC' ? 0 : null,
      isDay: hub.code === 'BTC',
      ...getMarketStatus(hub.timezone),
    }))
}

export function MarketHours({ convertedCountries }: MarketHoursProps) {
  const activeCodes = convertedCountries.length > 0 ? convertedCountries : DEFAULT_MARKET_CODES
  const [markets, setMarkets] = useState<MarketInfo[]>(() => buildMarkets(activeCodes))
  const [error, setError] = useState<string | null>(null)

  const loading = markets.length === 0 && !error

  useEffect(() => {
    let cancelled = false

    const hubs = activeCodes
      .slice(0, 6)
      .map(code => MARKET_HUBS[code])
      .filter(Boolean)

    Promise.all(
      hubs.map(async hub => {
        if (hub.code === 'BTC') {
          return {
            code: hub.code,
            city: hub.city,
            flag: hub.flag,
            timezone: hub.timezone,
            temp: 0,
            isDay: true,
            ...getMarketStatus(hub.timezone),
          }
        }
        const weather = await fetchWeather(hub.lat, hub.lng, hub.timezone)
        return {
          code: hub.code,
          city: hub.city,
          flag: hub.flag,
          timezone: hub.timezone,
          temp: weather.temp,
          isDay: weather.isDay,
          ...getMarketStatus(hub.timezone),
        }
      })
    ).then(results => {
      if (!cancelled) {
        setMarkets(results)
        setError(null)
      }
    }).catch(() => {
      if (!cancelled) {
        setError('Failed to load market data')
      }
    })

    return () => { cancelled = true }
  }, [activeCodes])

  const hasMarkets = markets.length > 0

  useEffect(() => {
    if (!hasMarkets) return
    const interval = setInterval(() => {
      setMarkets(prev =>
        prev.map(m => ({
          ...m,
          ...getMarketStatus(m.timezone),
        }))
      )
    }, 60000)
    return () => clearInterval(interval)
  }, [hasMarkets])

  if (loading) {
    return (
      <div className="p-5 rounded-xl bg-[#0f1a16] border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Market Hours</h3>
          <div className="w-4 h-4 border-2 border-slate-600 border-t-[#a3e635] rounded-full animate-spin" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map(i => (
            <div key={i} className="text-center">
              <div className="w-5 h-5 bg-white/5 rounded mx-auto mb-2 animate-pulse" />
              <div className="h-4 w-16 bg-white/5 rounded mx-auto mb-1 animate-pulse" />
              <div className="h-3 w-12 bg-white/5 rounded mx-auto animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-5 rounded-xl bg-[#0f1a16] border border-white/5">
        <h3 className="text-sm font-semibold text-white mb-3">Market Hours</h3>
        <p className="text-xs text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-5 rounded-xl bg-[#0f1a16] border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Market Hours</h3>
        <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
        </svg>
      </div>

      <div className="relative mb-6 h-32 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <path d="M50 80 Q100 60 150 90 T250 80 T350 100" fill="none" stroke="#a3e635" strokeWidth="1" strokeDasharray="2 4" />
            <path d="M50 100 Q100 80 150 110 T250 100 T350 120" fill="none" stroke="#a3e635" strokeWidth="1" strokeDasharray="2 4" />
            <path d="M50 120 Q100 100 150 130 T250 120 T350 140" fill="none" stroke="#a3e635" strokeWidth="1" strokeDasharray="2 4" />
            <ellipse cx="200" cy="100" rx="150" ry="80" fill="none" stroke="#a3e635" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="flex gap-4 relative z-10 flex-wrap justify-center">
          {markets.map((market, i) => (
            <div
              key={market.code}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg backdrop-blur-sm"
              style={{ marginTop: i % 2 === 0 ? '-8px' : '8px' }}
            >
              <span className="text-sm">{market.flag}</span>
              <span className="text-xs text-white font-medium">{market.city}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {markets.map(market => (
          <div key={market.code} className="text-center">
            <div className="mb-2">
              {market.status === 'open' ? (
                <svg className="w-5 h-5 text-[#a3e635] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414" />
                </svg>
              ) : market.status === 'soon' ? (
                <svg className="w-5 h-5 text-yellow-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3l9.5 16.5h-19L12 3z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </div>
            <p className="text-sm font-medium text-white">{market.city}</p>
            <p className="text-xs text-slate-500 mt-1">{market.timeLeft}</p>
            {market.temp !== null && market.temp !== 0 && (
              <p className="text-xs text-[#a3e635]/70 mt-1">
                {market.isDay ? '☀' : '🌙'} {market.temp}°C
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
