import type { CurrencyPair, CurrencyCategory } from './types/quote'

export const BASE_URL = 'https://economia.awesomeapi.com.br'

export const POLLING_INTERVAL_MS = 60000

export const HISTORY_DAYS = 15

export const CATEGORIES: { key: CurrencyCategory; label: string }[] = [
  { key: 'principais', label: 'Principais' },
  { key: 'america-latina', label: 'América Latina' },
  { key: 'europa', label: 'Europa' },
  { key: 'asia-pacifico', label: 'Ásia & Pacífico' },
  { key: 'oriente-medio-africa', label: 'Oriente Médio & África' },
  { key: 'crypto', label: 'Crypto' },
  { key: 'commodities', label: 'Commodities' },
  { key: 'ptax', label: 'PTAX' },
  { key: 'turismo', label: 'Turismo' },
]

export const CURRENCY_PAIRS: CurrencyPair[] = [
  { code: 'USD', codein: 'BRL', pair: 'USD-BRL', label: 'Dólar Americano', symbol: 'US$', type: 'standard', category: 'principais', flag: '🇺🇸' },
  { code: 'EUR', codein: 'BRL', pair: 'EUR-BRL', label: 'Euro', symbol: '€', type: 'standard', category: 'principais', flag: '🇪🇺' },
  { code: 'GBP', codein: 'BRL', pair: 'GBP-BRL', label: 'Libra Esterlina', symbol: '£', type: 'standard', category: 'principais', flag: '🇬🇧' },

  { code: 'ARS', codein: 'BRL', pair: 'ARS-BRL', label: 'Peso Argentino', symbol: 'AR$', type: 'standard', category: 'america-latina', flag: '🇦🇷' },
  { code: 'BOB', codein: 'BRL', pair: 'BOB-BRL', label: 'Boliviano', symbol: 'Bs', type: 'standard', category: 'america-latina', flag: '🇧🇴' },
  { code: 'CLP', codein: 'BRL', pair: 'CLP-BRL', label: 'Peso Chileno', symbol: 'CLP$', type: 'standard', category: 'america-latina', flag: '🇨🇱' },
  { code: 'COP', codein: 'BRL', pair: 'COP-BRL', label: 'Peso Colombiano', symbol: 'COL$', type: 'standard', category: 'america-latina', flag: '🇨🇴' },
  { code: 'MXN', codein: 'BRL', pair: 'MXN-BRL', label: 'Peso Mexicano', symbol: 'MX$', type: 'standard', category: 'america-latina', flag: '🇲🇽' },
  { code: 'PEN', codein: 'BRL', pair: 'PEN-BRL', label: 'Sol do Peru', symbol: 'S/', type: 'standard', category: 'america-latina', flag: '🇵🇪' },
  { code: 'PYG', codein: 'BRL', pair: 'PYG-BRL', label: 'Guarani Paraguaio', symbol: '₲', type: 'standard', category: 'america-latina', flag: '🇵🇾' },
  { code: 'UYU', codein: 'BRL', pair: 'UYU-BRL', label: 'Peso Uruguaio', symbol: 'UY$', type: 'standard', category: 'america-latina', flag: '🇺🇾' },

  { code: 'CHF', codein: 'BRL', pair: 'CHF-BRL', label: 'Franco Suíço', symbol: 'CHF', type: 'standard', category: 'europa', flag: '🇨🇭' },
  { code: 'CZK', codein: 'BRL', pair: 'CZK-BRL', label: 'Coroa Checa', symbol: 'Kč', type: 'standard', category: 'europa', flag: '🇨🇿' },
  { code: 'DKK', codein: 'BRL', pair: 'DKK-BRL', label: 'Coroa Dinamarquesa', symbol: 'kr', type: 'standard', category: 'europa', flag: '🇩🇰' },
  { code: 'HUF', codein: 'BRL', pair: 'HUF-BRL', label: 'Florim Húngaro', symbol: 'Ft', type: 'standard', category: 'europa', flag: '🇭🇺' },
  { code: 'NOK', codein: 'BRL', pair: 'NOK-BRL', label: 'Coroa Norueguesa', symbol: 'kr', type: 'standard', category: 'europa', flag: '🇳🇴' },
  { code: 'PLN', codein: 'BRL', pair: 'PLN-BRL', label: 'Zlóti Polonês', symbol: 'zł', type: 'standard', category: 'europa', flag: '🇵🇱' },
  { code: 'RON', codein: 'BRL', pair: 'RON-BRL', label: 'Leu Romeno', symbol: 'lei', type: 'standard', category: 'europa', flag: '🇷🇴' },
  { code: 'RSD', codein: 'BRL', pair: 'RSD-BRL', label: 'Dinar Sérvio', symbol: 'дин', type: 'standard', category: 'europa', flag: '🇷🇸' },
  { code: 'RUB', codein: 'BRL', pair: 'RUB-BRL', label: 'Rublo Russo', symbol: '₽', type: 'standard', category: 'europa', flag: '🇷🇺' },
  { code: 'SEK', codein: 'BRL', pair: 'SEK-BRL', label: 'Coroa Sueca', symbol: 'kr', type: 'standard', category: 'europa', flag: '🇸🇪' },

  { code: 'AUD', codein: 'BRL', pair: 'AUD-BRL', label: 'Dólar Australiano', symbol: 'A$', type: 'standard', category: 'asia-pacifico', flag: '🇦🇺' },
  { code: 'CNY', codein: 'BRL', pair: 'CNY-BRL', label: 'Yuan Chinês', symbol: '¥', type: 'standard', category: 'asia-pacifico', flag: '🇨🇳' },
  { code: 'HKD', codein: 'BRL', pair: 'HKD-BRL', label: 'Dólar de Hong Kong', symbol: 'HK$', type: 'standard', category: 'asia-pacifico', flag: '🇭🇰' },
  { code: 'ILS', codein: 'BRL', pair: 'ILS-BRL', label: 'Novo Shekel Israelense', symbol: '₪', type: 'standard', category: 'asia-pacifico', flag: '🇮🇱' },
  { code: 'INR', codein: 'BRL', pair: 'INR-BRL', label: 'Rúpia Indiana', symbol: '₹', type: 'standard', category: 'asia-pacifico', flag: '🇮🇳' },
  { code: 'JPY', codein: 'BRL', pair: 'JPY-BRL', label: 'Iene Japonês', symbol: '¥', type: 'standard', category: 'asia-pacifico', flag: '🇯🇵' },
  { code: 'KRW', codein: 'BRL', pair: 'KRW-BRL', label: 'Won Sul-Coreano', symbol: '₩', type: 'standard', category: 'asia-pacifico', flag: '🇰🇷' },
  { code: 'NZD', codein: 'BRL', pair: 'NZD-BRL', label: 'Dólar Neozelandês', symbol: 'NZ$', type: 'standard', category: 'asia-pacifico', flag: '🇳🇿' },
  { code: 'PHP', codein: 'BRL', pair: 'PHP-BRL', label: 'Peso Filipino', symbol: '₱', type: 'standard', category: 'asia-pacifico', flag: '🇵🇭' },
  { code: 'SGD', codein: 'BRL', pair: 'SGD-BRL', label: 'Dólar de Cingapura', symbol: 'S$', type: 'standard', category: 'asia-pacifico', flag: '🇸🇬' },
  { code: 'THB', codein: 'BRL', pair: 'THB-BRL', label: 'Baht Tailandês', symbol: '฿', type: 'standard', category: 'asia-pacifico', flag: '🇹🇭' },
  { code: 'TWD', codein: 'BRL', pair: 'TWD-BRL', label: 'Dólar Taiuanês', symbol: 'NT$', type: 'standard', category: 'asia-pacifico', flag: '🇹🇼' },

  { code: 'AED', codein: 'BRL', pair: 'AED-BRL', label: 'Dirham dos Emirados', symbol: 'د.إ', type: 'standard', category: 'oriente-medio-africa', flag: '🇦🇪' },
  { code: 'EGP', codein: 'BRL', pair: 'EGP-BRL', label: 'Libra Egípcia', symbol: 'E£', type: 'standard', category: 'oriente-medio-africa', flag: '🇪🇬' },
  { code: 'KES', codein: 'BRL', pair: 'KES-BRL', label: 'Shilling Queniano', symbol: 'KSh', type: 'standard', category: 'oriente-medio-africa', flag: '🇰🇪' },
  { code: 'SAR', codein: 'BRL', pair: 'SAR-BRL', label: 'Riyal Saudita', symbol: 'ر.س', type: 'standard', category: 'oriente-medio-africa', flag: '🇸🇦' },
  { code: 'TRY', codein: 'BRL', pair: 'TRY-BRL', label: 'Nova Lira Turca', symbol: '₺', type: 'standard', category: 'oriente-medio-africa', flag: '🇹🇷' },
  { code: 'ZAR', codein: 'BRL', pair: 'ZAR-BRL', label: 'Rand Sul-Africano', symbol: 'R', type: 'standard', category: 'oriente-medio-africa', flag: '🇿🇦' },

  { code: 'BTC', codein: 'BRL', pair: 'BTC-BRL', label: 'Bitcoin', symbol: '₿', type: 'standard', category: 'crypto' },
  { code: 'ETH', codein: 'BRL', pair: 'ETH-BRL', label: 'Ethereum', symbol: 'Ξ', type: 'standard', category: 'crypto' },
  { code: 'XRP', codein: 'BRL', pair: 'XRP-BRL', label: 'XRP', symbol: 'XRP', type: 'standard', category: 'crypto' },
  { code: 'DOGE', codein: 'BRL', pair: 'DOGE-BRL', label: 'Dogecoin', symbol: 'Ð', type: 'standard', category: 'crypto' },
  { code: 'SOL', codein: 'BRL', pair: 'SOL-BRL', label: 'Solana', symbol: 'SOL', type: 'standard', category: 'crypto' },
  { code: 'BNB', codein: 'BRL', pair: 'BNB-BRL', label: 'Binance Coin', symbol: 'BNB', type: 'standard', category: 'crypto' },
  { code: 'LTC', codein: 'BRL', pair: 'LTC-BRL', label: 'Litecoin', symbol: 'Ł', type: 'standard', category: 'crypto' },

  { code: 'XAU', codein: 'BRL', pair: 'XAU-BRL', label: 'Ouro', symbol: 'Au', type: 'standard', category: 'commodities' },
  { code: 'XAG', codein: 'BRL', pair: 'XAG-BRL', label: 'Prata', symbol: 'Ag', type: 'standard', category: 'commodities' },

  { code: 'USD', codein: 'BRLT', pair: 'USD-BRLT', label: 'Dólar Americano (Turismo)', symbol: 'US$', type: 'turismo', category: 'turismo', flag: '🇺🇸' },
  { code: 'EUR', codein: 'BRLT', pair: 'EUR-BRLT', label: 'Euro (Turismo)', symbol: '€', type: 'turismo', category: 'turismo', flag: '🇪🇺' },

  { code: 'USD', codein: 'BRLPTAX', pair: 'USD-BRLPTAX', label: 'Dólar Americano', symbol: 'US$', type: 'ptax', category: 'ptax', flag: '🇺🇸' },
  { code: 'EUR', codein: 'BRLPTAX', pair: 'EUR-BRLPTAX', label: 'Euro', symbol: '€', type: 'ptax', category: 'ptax', flag: '🇪🇺' },
  { code: 'GBP', codein: 'BRLPTAX', pair: 'GBP-BRLPTAX', label: 'Libra Esterlina', symbol: '£', type: 'ptax', category: 'ptax', flag: '🇬🇧' },
  { code: 'JPY', codein: 'BRLPTAX', pair: 'JPY-BRLPTAX', label: 'Iene Japonês', symbol: '¥', type: 'ptax', category: 'ptax', flag: '🇯🇵' },
  { code: 'CHF', codein: 'BRLPTAX', pair: 'CHF-BRLPTAX', label: 'Franco Suíço', symbol: 'CHF', type: 'ptax', category: 'ptax', flag: '🇨🇭' },
  { code: 'CAD', codein: 'BRLPTAX', pair: 'CAD-BRLPTAX', label: 'Dólar Canadense', symbol: 'C$', type: 'ptax', category: 'ptax', flag: '🇨🇦' },
  { code: 'AUD', codein: 'BRLPTAX', pair: 'AUD-BRLPTAX', label: 'Dólar Australiano', symbol: 'A$', type: 'ptax', category: 'ptax', flag: '🇦🇺' },
  { code: 'DKK', codein: 'BRLPTAX', pair: 'DKK-BRLPTAX', label: 'Coroa Dinamarquesa', symbol: 'kr', type: 'ptax', category: 'ptax', flag: '🇩🇰' },
  { code: 'SEK', codein: 'BRLPTAX', pair: 'SEK-BRLPTAX', label: 'Coroa Sueca', symbol: 'kr', type: 'ptax', category: 'ptax', flag: '🇸🇪' },
  { code: 'NOK', codein: 'BRLPTAX', pair: 'NOK-BRLPTAX', label: 'Coroa Norueguesa', symbol: 'kr', type: 'ptax', category: 'ptax', flag: '🇳🇴' },
]
