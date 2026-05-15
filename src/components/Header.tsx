export function Header() {
  return (
    <header className="relative bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-700 text-white overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight">Cambio 360 - BCL-ST</h1>
                <p className="text-slate-400 text-xs mt-0.5">
                  Cotações de moedas em tempo real
                </p>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 rounded-lg px-3 py-2 ring-1 ring-white/10">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>60 moedas</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 rounded-lg px-3 py-2 ring-1 ring-white/10">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AO VIVO</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
