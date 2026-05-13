# Cotação BCL — Especificações do Projeto

## Visão Geral

Dashboard em tela única para exibir cotações de moedas em tempo real utilizando a [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas). O app consome os endpoints públicos (sem API Key) e exibe três modalidades de cotação: **Padrão**, **Turismo** e **PTAX**.

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | React | ^19.2.6 |
| Linguagem | TypeScript | ~6.0.2 |
| Bundler | Vite | ^8.0.12 |
| Estilização | Tailwind CSS | ^4.3.0 |
| HTTP | fetch nativo | — |
| Lint | ESLint + typescript-eslint | ^10 / ^8 |
| Plugins Vite | @vitejs/plugin-react, @tailwindcss/vite, @rolldown/plugin-babel (React Compiler) | — |

### Por quê estas escolhas?

- **React 19**: Última versão estável, com React Compiler ativado para otimização automática de re-renders
- **Tailwind v4**: Setup zero-config via Vite plugin, `@import "tailwindcss"` no CSS
- **fetch nativo**: Sem dependências extras; app simples com 2 endpoints apenas
- **Vite 8**: Dev server rápido, HMR nativo com React Compiler

---

## Estrutura do Projeto

```
cotacao-bcl/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
├── SPECS.md                          # ← Você está aqui
├── src/
│   ├── main.tsx                      # Entry point (ReactDOM.createRoot)
│   ├── App.tsx                       # Componente raiz → renderiza <Dashboard />
│   ├── index.css                     # @import "tailwindcss"
│   ├── constants.ts                  # Moedas, URLs, intervalos
│   ├── types/
│   │   └── quote.ts                  # Interfaces QuoteData, HistoryItem, CurrencyPair
│   ├── api/
│   │   ├── client.ts                 # fetch wrapper com ApiError customizado
│   │   └── quotes.ts                 # fetchLastQuotes() + fetchDailyHistory()
│   ├── hooks/
│   │   ├── useQuotes.ts              # Polling 60s para cotações atuais
│   │   ├── useHistory.ts             # Histórico da moeda selecionada
│   │   └── usePolling.ts             # Hook genérico de intervalo (não usado atualmente)
│   ├── utils/
│   │   └── format.ts                 # formatBRL, formatPercent, formatTimestamp, formatDateTime
│   └── components/
│       ├── Dashboard.tsx             # Layout principal, orquestrador de estado
│       ├── Header.tsx                # Cabeçalho com gradiente azul
│       ├── RefreshBar.tsx            # Última atualização + botão refresh + error banner
│       ├── QuoteTypeTabs.tsx         # Abas: Padrão | Turismo | PTAX
│       ├── QuoteCard.tsx             # Card individual de moeda (com skeleton)
│       ├── QuoteGrid.tsx             # Grid responsivo 1/2/3 colunas
│       └── HistoryTable.tsx          # Tabela de fechamento dos últimos 15 dias
```

---

## Como Rodar

```bash
pnpm install        # já instalado
pnpm run dev        # dev server em http://localhost:3000
pnpm run build      # tsc -b && vite build
pnpm run lint       # eslint .
```

Todos os comandos (`dev`, `build`, `lint`) passam sem erros.

---

## API Consumida

### Endpoints

| Endpoint | Uso |
|---|---|
| `GET /json/last/:pairs` | Cotações atuais de todas as moedas numa única request |
| `GET /json/daily/:pair/15` | Fechamento dos últimos 15 dias para tabela de histórico |

### Moedas Suportadas (em `constants.ts`)

| Tipo | Pares |
|---|---|
| **Padrão** | USD-BRL, EUR-BRL, BTC-BRL, GBP-BRL, ARS-BRL |
| **Turismo** | USD-BRLT, EUR-BRLT |
| **PTAX** | USD-BRLPTAX, EUR-BRLPTAX |

A request de cotações atuais junta **todos os pares numa única chamada**:
```
GET /json/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL,ARS-BRL,USD-BRLT,EUR-BRLT,USD-BRLPTAX,EUR-BRLPTAX
```

### Cache

Sem API Key a AwesomeAPI faz cache de **1 minuto**. O polling está configurado para **60s** (`POLLING_INTERVAL_MS`), que é o intervalo ideal para este cenário.

---

## Modelo de Dados

```typescript
type QuoteType = 'standard' | 'turismo' | 'ptax'

interface QuoteData {
  code: string        // "USD"
  codein: string      // "BRL"
  name: string        // "Dólar Americano/Real Brasileiro"
  high: string        // "5.734"
  low: string         // "5.7279"
  varBid: string      // "-0.0054"
  pctChange: string   // "-0.09"
  bid: string         // "5.7276" (compra)
  ask: string         // "5.7282" (venda)
  timestamp: string   // "1618315045"
  create_date: string // "2021-04-13 08:57:27"
}

interface HistoryItem {
  bid: string
  high: string
  low: string
  varBid: string
  pctChange: string
  timestamp: string
  create_date?: string
  code?: string
  codein?: string
  name?: string
  ask?: string
}

interface CurrencyPair {
  code: string
  codein: string
  pair: string      // "USD-BRL"
  label: string     // "Dólar Americano"
  symbol: string    // "US$"
  type: QuoteType
}
```

---

## Fluxo de Dados

```
[AwesomeAPI]
     │
     ├── GET /json/last/:pairs ──────────────────────► useQuotes (polling 60s)
     │                                                     │
     │                                              quotes: Record<string, QuoteData>
     │                                              loading / refreshing / error
     │                                              lastUpdated, refresh()
     │
     └── GET /json/daily/:pair/15 ◄── selectedPair ── useHistory
                                                           │
                                                    history: HistoryItem[]
                                                    loading / error
                                                    selectedPair, setSelectedPair()

[UI ─ Dashboard]
     │
     ├── RefreshBar ← lastUpdated, refreshing, error, refresh
     ├── QuoteTypeTabs ← activeType → filtra CURRENCY_PAIRS
     ├── QuoteGrid ← filteredPairs + quotes → QuoteCard (cada card)
     │       └── clique no card → setSelectedPair(pair.pair)
     └── HistoryTable ← history da pair selecionada
```

### Estados dos Hooks

#### `useQuotes` — Cotações atuais

| Estado | `loading` | `refreshing` | `quotes` | `error` | UI |
|---|---|---|---|---|---|
| Initial load | `true` | `false` | `null` | `null` | Skeletons nos cards |
| Initial success | `false` | `false` | `{...}` | `null` | Cards com dados |
| Initial error | `false` | `false` | `null` | `"msg"` | Error banner + sem cards |
| Polling/Refresh | `false` | `true` | `{...}` | `null` | Opacidade reduzida nos cards |
| Refresh error | `false` | `false` | `{...}` | `"msg"` | Error banner, dados preservados |

#### `useHistory` — Histórico

- `loading` é **derivado**: `true` quando `history === null && error === null`
- Ao trocar de par, a tabela mantém os dados antigos até o novo fetch completar (sem flicker)
- Se o fetch falha, `history` vai para `null` e `error` exibe a mensagem

---

## Tratamento de Erros

O `api/client.ts` define `ApiError` com `status` (HTTP) e `code` (ex: "CoinNotExists"). Os hooks capturam:
- **Erro de rede** (`TypeError`): mensagem "Erro de rede — verifique sua conexão"
- **Erro 4xx da API**: mensagem do campo `message` da resposta
- **Erro 5xx ou inesperado**: "Erro inesperado"

A UI exibe:
- **Initial load com erro**: Nenhum card é renderizado, apenas o banner de erro
- **Refresh com erro**: Os dados anteriores permanecem visíveis, banner no topo com botão "Tentar novamente"

---

## O Que Está Feito (13/05/2026)

- [x] Setup do projeto: Vite + React 19 + TypeScript 6 + Tailwind v4 + ESLint
- [x] `api/client.ts` — fetch wrapper com `ApiError`
- [x] `api/quotes.ts` — `fetchLastQuotes()` e `fetchDailyHistory()`
- [x] `types/quote.ts` — interfaces completas
- [x] `constants.ts` — 9 pares de moedas em 3 categorias
- [x] `utils/format.ts` — formatadores (BRL, %, data/hora)
- [x] `hooks/useQuotes.ts` — polling 60s com estados loading/refreshing/error
- [x] `hooks/useHistory.ts` — fetch ao trocar par, sem chamadas setState síncronas em effects
- [x] `hooks/usePolling.ts` — hook genérico de intervalo (utilitário, não usado atualmente)
- [x] `components/Dashboard.tsx` — orquestrador principal
- [x] `components/Header.tsx` — cabeçalho com gradiente
- [x] `components/RefreshBar.tsx` — info de atualização + botão + error banner
- [x] `components/QuoteTypeTabs.tsx` — abas Padrão/Turismo/PTAX
- [x] `components/QuoteCard.tsx` — card com skeleton + variação colorida
- [x] `components/QuoteGrid.tsx` — grid responsivo (1/2/3 colunas)
- [x] `components/HistoryTable.tsx` — tabela com 5 colunas + skeleton
- [x] Build (`tsc -b && vite build`) **passa sem erros**
- [x] Lint (`eslint .`) **passa sem erros**

---

## Próximos Passos (Sugeridos)

### 1. Melhorias de Funcionalidade
- [ ] Adicionar **API Key** no `constants.ts` para remover cache de 1 minuto e aumentar limite de requisições sequenciais
- [ ] Implementar **gráfico** de histórico (ex: Recharts ou Chart.js com dados do `daily`)
- [ ] Adicionar **busca/filtro** de moedas dentro de cada aba
- [ ] Responsividade avançada: layout mobile-first já funciona, mas testar em breakpoints específicos

### 2. UX / UI
- [ ] **Dark mode** (Tailwind v4 suporta `@variant dark` via `prefers-color-scheme`)
- [ ] **Toast** para erros ao invés de banner fixo (auto-dismiss)
- [ ] **Animação** de transição ao trocar abas
- [ ] **Tooltip** explicativo nos campos (ex: "Compra = bid")

### 3. Performance
- [ ] **SWR/React Query** — se a aplicação crescer, substituir `useQuotes` por `@tanstack/react-query` para caching + stale-while-revalidate
- [ ] **Debounce** no clique dos cards para evitar múltiplos fetches de histórico
- [ ] **Virtualização** da tabela de histórico se os dias aumentarem (>360)

### 4. Infra
- [ ] Configurar **proxy** no vite (`server.proxy`) se precisar esconder API Key
- [ ] **Testes** — Vitest + React Testing Library para hooks e componentes
- [ ] **PWA** — manifest + service worker para funcionar offline com dados cacheados
- [ ] **CI/CD** — GitHub Actions para lint + build + deploy (Vercel/Netlify)

### 5. Arquitetura Futura
- [ ] Se o app crescer para múltiplas páginas, adicionar **React Router**
- [ ] Se precisar de estado global, considerar **useContext** ou **Zustand** (leve)
- [ ] Converter tabela de histórico para **paginação** quando usar `?start_date=&end_date=`

---

## Notas Técnicas

### React Compiler
Ativado via `babel-plugin-react-compiler` + `@rolldown/plugin-babel`. Otimiza re-renders automaticamente sem `React.memo`, `useMemo`, `useCallback` manuais.

### Tailwind v4
- Configuração via Vite plugin (`@tailwindcss/vite`)
- Sem `tailwind.config.js` — customizações via `@theme` no CSS
- `@import "tailwindcss"` no `index.css` é suficiente

### TypeScript Config
- `erasableSyntaxOnly: true` — proíbe `enum`, `namespace`, parameter properties (por isso `ApiError` declara campos explicitamente)
- `verbatimModuleSyntax: true` — exige `import type` para imports de tipo
- `noUnusedLocals / noUnusedParameters: true` — lint em tempo de compilação

### ESLint — set-state-in-effect
O plugin `eslint-plugin-react-hooks@7` (React 19) proíbe `setState` síncrono no corpo de effects. A solução adotada foi:
- `useHistory`: derivar `loading` de `history === null && error === null`, fazer `setState` apenas nos callbacks `.then`/`.catch`
- `useQuotes`: chamar `setLoading(true)` dentro de `fetchData` (que é `useCallback` + async), o que o lint não flagou
