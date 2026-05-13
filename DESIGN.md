# DESIGN.md — Especificações de Layout e Design do Dashboard

> Documento de referência visual para o dashboard "Cotações em Tempo Real".
> Todas as medidas são baseadas no layout mobile-first da imagem de referência.

---

## 1. Visão Geral do Layout

O dashboard é uma **tela única mobile-first** com fundo cinza-azulado claro. O layout é dividido em 5 zonas verticais:

```
┌─────────────────────────────────────┐
│           HEADER (topo)             │
├─────────────────────────────────────┤
│        QUOTE CARDS (grid 2×2)       │
├─────────────────────────────────────┤
│  CHART (esq.)  │  DATE FILTER (dir) │
├─────────────────────────────────────┤
│  PTAX CARD     │   BTC CARD         │
├─────────────────────────────────────┤
│          BOTTOM NAV BAR             │
└─────────────────────────────────────┘
```

---

## 2. Paleta de Cores

| Token                  | Valor HEX   | Uso                                        |
|------------------------|-------------|--------------------------------------------|
| `--bg-page`            | `#EEF1F8`   | Fundo geral da página                      |
| `--bg-card`            | `#FFFFFF`   | Fundo dos cards e painéis                  |
| `--text-primary`       | `#1A2340`   | Títulos e valores principais               |
| `--text-secondary`     | `#6B7A99`   | Labels, subtítulos, placeholders           |
| `--text-label`         | `#8A94AB`   | Textos menores (ex: "Cotação Turismo")     |
| `--accent-blue`        | `#1E4FD8`   | Botão "Aplicar", ícones de nav ativos      |
| `--accent-blue-light`  | `#3D72F5`   | Cor dos ícones de moeda (USD, EUR)         |
| `--positive-bg`        | `#E6F9F0`   | Fundo da badge de variação positiva        |
| `--positive-text`      | `#18A556`   | Texto da badge de variação positiva        |
| `--negative-bg`        | `#FDECEA`   | Fundo da badge de variação negativa        |
| `--negative-text`      | `#D93025`   | Texto da badge de variação negativa        |
| `--chart-line`         | `#2563EB`   | Linha do gráfico histórico                 |
| `--chart-fill`         | `#DBEAFE`   | Área preenchida abaixo da linha do gráfico |
| `--border-card`        | `#E4E9F2`   | Borda sutil dos cards                      |
| `--nav-inactive`       | `#8A94AB`   | Ícone e label de nav inativo               |
| `--nav-active`         | `#1A2340`   | Ícone e label de nav ativo                 |

---

## 3. Tipografia

| Elemento                    | Peso      | Tamanho (aprox.) | Cor                    |
|-----------------------------|-----------|------------------|------------------------|
| Título do header            | Bold 700  | 20–22px          | `#1A2340`              |
| "em Tempo Real" no header   | Regular   | 20–22px          | `#1A2340`              |
| Nome da moeda no card       | SemiBold  | 13–14px          | `#1A2340`              |
| Código da moeda (USD/EUR)   | Regular   | 13–14px          | `#6B7A99`              |
| Valor principal (BID)       | Bold 700  | 22–26px          | `#1A2340`              |
| Prefixo "R$" do valor       | Regular   | 14px             | `#1A2340`              |
| Badge de variação (%)       | Bold      | 13px             | positiva/negativa      |
| Label "Alta / Baixa / Bisha"| Regular   | 11–12px          | `#6B7A99`              |
| Seção "Gráfico Histórico"   | SemiBold  | 15px             | `#1A2340`              |
| Labels do filtro de datas   | Regular   | 12–13px          | `#6B7A99`              |
| Valores de data (input)     | Regular   | 14px             | `#1A2340`              |
| Botão "Aplicar"             | Bold      | 15px             | `#FFFFFF`              |
| Labels do eixo X do gráfico | Regular   | 10–11px          | `#8A94AB`              |
| Labels do eixo Y do gráfico | Regular   | 10–11px          | `#8A94AB`              |
| Label PTAX / BTC (seção)    | SemiBold  | 16px             | `#1A2340`              |
| Valor grande PTAX / BTC     | Bold 700  | 28–32px          | `#1A2340`              |
| Subtexto dos cards inferiores| Regular  | 12px             | `#6B7A99`              |
| Labels da bottom nav        | Regular   | 11–12px          | ativo/inativo          |

**Fonte sugerida:** `Inter` (Google Fonts) — utilizada por sua legibilidade em interfaces financeiras.

---

## 4. Componentes e Especificações

### 4.1 Header

```
┌─────────────────────────────────────────┐
│  [espaço]  Cotações em Tempo Real  [≡]  │
└─────────────────────────────────────────┘
```

- **Fundo:** `#EEF1F8` (sem card, faz parte do background da página)
- **Padding:** `16px` vertical, `20px` horizontal
- **Título:** "**Cotações** em Tempo Real"
  - "Cotações" em `font-weight: 700` (bold)
  - "em Tempo Real" em `font-weight: 400` (regular)
  - Centralizado horizontalmente
- **Ícone hamburguer (≡):** posicionado à direita, cor `#6B7A99`, tamanho ~20px
- **Sem borda inferior** — transição suave para os cards

---

### 4.2 Quote Cards (Grid de Cotações)

**Layout:** Grid com 2 colunas e 2 linhas (4 cards no total).

```
┌──────────────┬──────────────┐
│  Dólar (USD) │  Euro (EUR)  │
├──────────────┼──────────────┤
│ Bitcoin (BTC)│ Euro Turismo │
└──────────────┴──────────────┘
```

**Container do Grid:**
- `gap: 10px`
- `padding: 12px 16px`
- Fundo do container: `#EEF1F8` (herda da página)

**Cada Card:**
- `background: #FFFFFF`
- `border-radius: 14px`
- `border: 1px solid #E4E9F2`
- `padding: 12px 14px`
- `box-shadow: 0 2px 8px rgba(0,0,0,0.05)`

**Estrutura interna de cada card:**

```
┌─────────────────────────────┐
│ [Ícone] Nome (CÓDIGO)       │
│                             │
│ R$ 5,32                     │
│                             │
│ [badge +0,45%]              │
│ ◄ Alta                      │
└─────────────────────────────┘
```

- **Linha 1 — Cabeçalho do card:**
  - Ícone circular à esquerda (flag ou símbolo da moeda), `24px × 24px`
  - Nome da moeda em SemiBold + `(CÓDIGO)` em Regular, cor secundária
  - Exemplos: "**Dólar** (USD)", "**Euro** (EUR)", "**Bitcoin** (BTC)", "**Euro Turismo**"

- **Linha 2 — Valor:**
  - Prefixo "R$" em `font-size: 14px`, `font-weight: 400`
  - Valor em `font-size: 24–26px`, `font-weight: 700`
  - Separador decimal: vírgula (pt-BR)
  - Exemplo: `R$ 5,32`, `R$ 6,25`, `R$ 315.200`, `R$ 6,50`

- **Linha 3 — Badge de variação:**
  - Fundo colorido com `border-radius: 8px`, `padding: 2px 8px`
  - ▲ ou ▼ pequeno triângulo + valor percentual
  - Positivo: fundo `#E6F9F0`, texto `#18A556`, prefixo `+`
  - Negativo: fundo `#FDECEA`, texto `#D93025`, prefixo `↓`

- **Linha 4 — Label direcional:**
  - Ícone `◄` (triângulo pequeno apontando para baixo/direita) + texto "Alta" ou "Bisha" (baixa)
  - Cor: `#6B7A99`
  - Font-size: `11px`

- **Card "Euro Turismo" (caso especial):**
  - Sem badge de variação percentual
  - Exibe texto `"Cotação Turismo"` no lugar da badge
  - Cor do texto: `#8A94AB`, tamanho `11–12px`

---

### 4.3 Seção de Gráfico + Filtro de Período

**Layout:** Linha com 2 colunas:
- Coluna esquerda (~65%): Gráfico histórico
- Coluna direita (~35%): Filtro de período

**Container:**
- `background: #FFFFFF`
- `border-radius: 14px`
- `border: 1px solid #E4E9F2`
- `margin: 0 16px`
- `padding: 14px`
- `box-shadow: 0 2px 8px rgba(0,0,0,0.05)`

#### 4.3.1 Painel do Gráfico (esquerda)

**Cabeçalho do gráfico:**
```
Gráfico Histórico    [Últimos 15 Dias ▼] [USD/BRL]
```
- Título: `"Gráfico Histórico"` — SemiBold, `15px`, `#1A2340`
- Dropdown "Últimos 15 Dias ▼": borda sutil, `border-radius: 6px`, `padding: 4px 8px`, texto `12px`
- Badge "USD/BRL": fundo `#EEF1F8`, `border-radius: 6px`, `padding: 4px 8px`, texto `12px`, `#1A2340`

**Gráfico de Área (Line Chart):**
- Linha: `#2563EB`, `stroke-width: 2px`, suavizada (curva bezier)
- Área preenchida abaixo da linha: gradiente de `#DBEAFE` (topo) para `transparent` (base)
- Eixo X: datas no formato `DD/MM`, labels a cada 2 dias, cor `#8A94AB`, `font-size: 10px`
- Eixo Y: valores numéricos (ex: 5.0, 5.2, 5.4, 5.6), sem "R$" no eixo, cor `#8A94AB`, `font-size: 10px`
- Sem gridlines horizontais visíveis (ou gridlines muito sutis `#F0F3FA`)
- Sem borda ao redor do gráfico

#### 4.3.2 Painel de Filtro (direita)

```
Filtrar Período
─────────────────
Data Início
┌──────────────┐
│ 05/04/2023 🗓 │
└──────────────┘

Data Fim
┌──────────────┐
│ 20/04/2023 🗓 │
└──────────────┘

┌──────────────┐
│   Aplicar    │
└──────────────┘
```

- Título: `"Filtrar Período"` — SemiBold, `14px`, `#1A2340`
- Divider horizontal: `1px solid #E4E9F2` abaixo do título
- Labels "Data Início" / "Data Fim": `12–13px`, `#6B7A99`
- Inputs de data:
  - `background: #F5F7FB`
  - `border: 1px solid #E4E9F2`
  - `border-radius: 8px`
  - `padding: 8px 10px`
  - Ícone de calendário à direita: `#8A94AB`, `16px`
  - Texto da data: `14px`, `#1A2340`
- Botão "Aplicar":
  - `background: #1E4FD8`
  - `color: #FFFFFF`
  - `border-radius: 10px`
  - `width: 100%`
  - `padding: 12px`
  - `font-weight: 700`, `15px`
  - `box-shadow: 0 4px 12px rgba(30,79,216,0.3)`
  - Hover: `background: #1840B8`

---

### 4.4 Cards Inferiores (PTAX e Bitcoin)

**Layout:** Linha com 2 colunas iguais (50%/50%), `gap: 10px`, `padding: 12px 16px`

#### Card PTAX (esquerda)

```
┌─────────────────────────┐
│ [⊕] PTAX                │
│                          │
│ R$ 5,30                  │
│                          │
│ Taxa PTAX do Banco Central│
└─────────────────────────┘
```

- Mesmos estilos do card principal (bg branco, borda, sombra, border-radius 14px)
- Ícone `⊕`: círculo sólido escuro com símbolo no centro, `24px`
- Label "PTAX": SemiBold, `16px`, `#1A2340`
- Valor: `"R$ 5,30"` — Bold, `28–30px`, `#1A2340`
- Subtexto: `"Taxa PTAX do Banco Central"` — Regular, `11–12px`, `#6B7A99`
- Sem badge de variação percentual

#### Card Bitcoin/BTC (direita)

```
┌─────────────────────────┐
│ [A✓] Bitcoin (BTC)       │
│                          │
│ R$ 315.200,00            │
│                          │
│ [▼ -1,58%]               │
└─────────────────────────┘
```

- Mesmos estilos de card (bg branco, borda, sombra, border-radius 14px)
- Ícone do Bitcoin: círculo laranja/amarelo com "A✓" ou símbolo ₿ customizado, `24px`
- Label: `"Bitcoin (BTC)"` — SemiBold, `14px`, `#1A2340`
- Valor: `"R$ 315.200,00"` — Bold, `22–26px`, `#1A2340` (com casas decimais ",00")
- Badge de variação negativa:
  - `background: #FDECEA`
  - `border-radius: 8px`
  - `width: 100%` (ocupa toda a largura do card)
  - Texto: `"▼ -1,58%"` — Bold, cor `#D93025`, tamanho `13px`
  - Centralizado horizontalmente

---

### 4.5 Bottom Navigation Bar

```
┌─────────────────────────────────────────────┐
│  [🏠]      [📥]       [💬]      [⚙️]        │
│  Início  Histórico  Conversor  Configurações │
└─────────────────────────────────────────────┘
```

- **Fundo:** `#FFFFFF`
- **Borda superior:** `1px solid #E4E9F2`
- **Altura:** ~70–80px (incluindo safe area do iOS se aplicável)
- **Padding top:** `10px`, **Padding bottom:** `16px` (ou + para safe area)
- **Layout:** `display: flex; justify-content: space-around; align-items: center`

**Item de navegação (cada ícone + label):**
- Ícone: `24px × 24px`
- Label: `11–12px`, `font-weight: 400`
- Espaçamento ícone-label: `4px`

**Estado Ativo (Início):**
- Ícone: cor `#1A2340` (preenchido)
- Label: cor `#1A2340`, `font-weight: 600`

**Estado Inativo (Histórico, Conversor, Configurações):**
- Ícone: cor `#8A94AB` (outline)
- Label: cor `#8A94AB`

**Ícones de cada item:**
| Item           | Ícone sugerido (Lucide/Heroicons)      |
|----------------|----------------------------------------|
| Início         | `Home` (preenchido quando ativo)       |
| Histórico      | `BookMarked` ou `ClipboardList`        |
| Conversor      | `ArrowLeftRight` ou `MessageSquare`    |
| Configurações  | `Settings` (engrenagem)                |

---

## 5. Espaçamentos e Dimensões Globais

| Propriedade              | Valor          |
|--------------------------|----------------|
| Padding horizontal geral | `16px`         |
| Gap entre cards          | `10px`         |
| Border-radius dos cards  | `14px`         |
| Sombra dos cards         | `0 2px 8px rgba(0,0,0,0.05)` |
| Borda dos cards          | `1px solid #E4E9F2` |
| Altura do header         | ~`56px`        |
| Altura da bottom nav     | ~`72px`        |
| Padding interno dos cards| `12–14px`      |

---

## 6. Micro-interações e Estados

| Elemento              | Interação                                              |
|-----------------------|--------------------------------------------------------|
| Cards de cotação      | `cursor: pointer`, leve `scale(0.98)` no click         |
| Botão "Aplicar"       | `opacity: 0.85` + `scale(0.98)` no click, hover escurece |
| Item de navegação     | Transição de cor `200ms ease` ao mudar de ativo/inativo|
| Badge de variação     | Sem animação — deve ser estático                       |
| Loading do gráfico    | Skeleton com pulso (`animate-pulse`) na cor `#E4E9F2`  |
| Cards em loading      | Skeleton lines no lugar dos valores                    |

---

## 7. Responsividade

O design da imagem de referência é **mobile** (largura ~390px). Para telas maiores:

| Breakpoint        | Ajuste                                                     |
|-------------------|------------------------------------------------------------|
| `< 480px`         | Layout da imagem (padrão): 2 colunas nos cards             |
| `480px – 768px`   | Aumentar `font-size` dos valores; manter 2 colunas         |
| `> 768px` (tablet)| Grid de 4 colunas para os cards; gráfico + filtro em row  |
| `> 1024px` (desktop)| Max-width de `480px`, centralizado na tela, como app mobile |

---

## 8. Ícones das Moedas

| Moeda        | Representação Visual                                    |
|--------------|---------------------------------------------------------|
| Dólar (USD)  | Bandeira dos EUA 🇺🇸 (circular, `24px`)                  |
| Euro (EUR)   | Bandeira da EU 🇪🇺 (circular, `24px`)                    |
| Bitcoin (BTC)| Círculo laranja com símbolo ₿ branco                    |
| Euro Turismo | Sem ícone na imagem (apenas texto)                      |
| PTAX         | Círculo sólido escuro com símbolo `⊕` branco            |
| Bitcoin BTC  | Círculo laranja com "A✓" ou ₿ (variante alternativa)    |

---

## 9. Referência Visual Rápida (Checklist de Implementação)

- [ ] Fundo da página: `#EEF1F8`
- [ ] Cards com `bg-white`, `border-radius: 14px`, `box-shadow` sutil
- [ ] Grid 2×2 para as 4 cotações principais
- [ ] Ícones circulares de moeda (flag emoji ou SVG)
- [ ] Valor em negrito grande + prefixo "R$" menor
- [ ] Badge de variação com cores positiva/negativa
- [ ] Gráfico de área azul com eixos limpos
- [ ] Filtro de período com 2 date pickers + botão azul
- [ ] 2 cards inferiores (PTAX e BTC) lado a lado
- [ ] Bottom nav com 4 itens (Início ativo por padrão)
- [ ] Fonte `Inter` importada via Google Fonts
- [ ] Separador decimal: vírgula (pt-BR)
- [ ] Sem scrollbar visível (conteúdo na viewport)
