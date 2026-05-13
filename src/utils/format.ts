export function formatBRL(value: string | number, digits: number = 4): string {
  const num = typeof value === 'string' ? Number(value) : value
  return num.toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

export function formatPercent(value: string | number): string {
  const num = typeof value === 'string' ? Number(value) : value
  const signal = num >= 0 ? '+' : ''
  return `${signal}${num.toFixed(2)}%`
}

export function formatTimestamp(timestamp: string): string {
  const ts = Number(timestamp)
  const date = new Date(ts * 1000)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatDateTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
