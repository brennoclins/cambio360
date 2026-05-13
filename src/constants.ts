import type { CurrencyPair, QuoteType } from './types/quote'

export const BASE_URL = 'https://economia.awesomeapi.com.br'

export const POLLING_INTERVAL_MS = 60000

export const HISTORY_DAYS = 15

export const CURRENCY_PAIRS: CurrencyPair[] = [
  { code: 'USD', codein: 'BRL', pair: 'USD-BRL', label: 'Dólar Americano', symbol: 'US$', type: 'standard' },
  { code: 'EUR', codein: 'BRL', pair: 'EUR-BRL', label: 'Euro', symbol: '€', type: 'standard' },
  { code: 'BTC', codein: 'BRL', pair: 'BTC-BRL', label: 'Bitcoin', symbol: '₿', type: 'standard' },
  { code: 'GBP', codein: 'BRL', pair: 'GBP-BRL', label: 'Libra Esterlina', symbol: '£', type: 'standard' },
  { code: 'ARS', codein: 'BRL', pair: 'ARS-BRL', label: 'Peso Argentino', symbol: 'AR$', type: 'standard' },
  { code: 'USD', codein: 'BRLT', pair: 'USD-BRLT', label: 'Dólar Americano (Turismo)', symbol: 'US$', type: 'turismo' },
  { code: 'EUR', codein: 'BRLT', pair: 'EUR-BRLT', label: 'Euro (Turismo)', symbol: '€', type: 'turismo' },
  { code: 'USD', codein: 'BRLPTAX', pair: 'USD-BRLPTAX', label: 'Dólar Americano (PTAX)', symbol: 'US$', type: 'ptax' },
  { code: 'EUR', codein: 'BRLPTAX', pair: 'EUR-BRLPTAX', label: 'Euro (PTAX)', symbol: '€', type: 'ptax' },
]

export const QUOTE_TYPES: { key: QuoteType; label: string }[] = [
  { key: 'standard', label: 'Padrão' },
  { key: 'turismo', label: 'Turismo' },
  { key: 'ptax', label: 'PTAX' },
]
