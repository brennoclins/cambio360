import type { QuoteType } from '../types/quote'
import { QUOTE_TYPES } from '../constants'

interface QuoteTypeTabsProps {
  active: QuoteType
  onChange: (type: QuoteType) => void
}

export function QuoteTypeTabs({ active, onChange }: QuoteTypeTabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit" role="tablist">
      {QUOTE_TYPES.map(t => (
        <button
          key={t.key}
          type="button"
          role="tab"
          aria-selected={active === t.key}
          onClick={() => onChange(t.key)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
            active === t.key
              ? 'bg-white text-blue-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
