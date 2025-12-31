import { useState } from 'react'
import {
  Home,
  Wallet,
  BarChart2,
  ChevronDown,
  ChevronRight,
  Menu,
  Settings,
  Dot
} from 'lucide-react'

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors
        ${active
          ? 'bg-emerald-500/20 text-emerald-300'
          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
        }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}

function Dropdown({ icon: Icon, label, open, setOpen, children }) {
  return (
    <div className="space-y-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-left text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors"
      >
        <span className="flex items-center gap-3">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
        </span>
        {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300
        ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="min-h-0">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Sidebar({ current, setCurrent, mobileOpen, setMobileOpen }) {
  const [inputOpen, setInputOpen] = useState(true)
  const [dashOpen, setDashOpen] = useState(true)
  const [moreOpen, setMoreOpen] = useState(false)

  const content = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-3 py-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-400/20 flex items-center justify-center">
            <Wallet className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Mufine Wallet</div>
            <div className="text-[10px] text-emerald-300/80">Your Finance just fine</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="p-3 space-y-3 overflow-y-auto">
        <NavItem
          icon={Home}
          label="Home"
          active={current === 'home'}
          onClick={() => {
            setCurrent('home')
            setMobileOpen(false)
          }}
        />

        <Dropdown icon={Wallet} label="Input" open={inputOpen} setOpen={setInputOpen}>
          <div className="pl-9 pr-2 py-2 space-y-1">
            <NavItem
              icon={Dot}
              label="Income Input"
              active={current === 'income'}
              onClick={() => {
                setCurrent('income')
                setMobileOpen(false)
              }}
            />
            <NavItem
              icon={Dot}
              label="Expense Input"
              active={current === 'expense'}
              onClick={() => {
                setCurrent('expense')
                setMobileOpen(false)
              }}
            />
          </div>
        </Dropdown>

        <Dropdown icon={BarChart2} label="Dashboard" open={dashOpen} setOpen={setDashOpen}>
          <div className="pl-9 pr-2 py-2 space-y-1">
            <NavItem
              icon={Dot}
              label="Overview"
              active={current === 'dashboard'}
              onClick={() => {
                setCurrent('dashboard')
                setMobileOpen(false)
              }}
            />
          </div>
        </Dropdown>

        <Dropdown icon={Settings} label="More" open={moreOpen} setOpen={setMoreOpen}>
          <div className="pl-9 pr-2 py-2 space-y-1">
            <NavItem icon={Dot} label="Goals (Soon)" />
            <NavItem icon={Dot} label="Reports (Soon)" />
            <NavItem
              icon={Dot}
              label="Profile / Settings"
              active={current === 'profile'}
              onClick={() => {
                setCurrent('profile')
                setMobileOpen(false)
              }}
            />
          </div>
        </Dropdown>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-slate-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-400/20 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Mufine Wallet</div>
              <div className="text-[10px] text-emerald-300/80">Your Finance just fine</div>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-72 bg-slate-900/95 backdrop-blur
          border-r border-slate-800/80
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {content}
      </aside>
    </>
  )
}
