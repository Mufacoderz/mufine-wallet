import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import { IncomeForm, ExpenseForm } from './components/Forms'
import Dashboard from './components/Dashboard'

function App() {
  const [current, setCurrent] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Layout wrapper */}
      <div className="relative lg:flex">
        {/* Sidebar */}
        <Sidebar
          current={current}
          setCurrent={setCurrent}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full min-h-screen lg:ml-72">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            {current === 'home' && (
              <div className="space-y-6">
                <Hero />
                <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                  <h2 className="text-xl font-semibold mb-2">Welcome</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    A modern, privacy-friendly dashboard to track your income and expenses.
                    Use the Input section to add entries, and explore the Dashboard for insights.
                  </p>
                </section>
              </div>
            )}

            {current === 'income' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Income Input</h2>
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                  <IncomeForm />
                </div>
              </div>
            )}

            {current === 'expense' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Expense Input</h2>
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                  <ExpenseForm />
                </div>
              </div>
            )}

            {current === 'dashboard' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <Dashboard />
              </div>
            )}

            {(current === 'goals' || current === 'reports' || current === 'profile') && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
                <p className="text-slate-400 text-sm">
                  This section will include additional features like goals, reports, and settings.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}


export default App
