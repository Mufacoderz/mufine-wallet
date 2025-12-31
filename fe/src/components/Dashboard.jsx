import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts'

const COLORS = ['#34d399', '#10b981', '#059669', '#047857', '#064e3b']

const sampleIncome = [
  { date: 'Jan', amount: 1200, salary: 900, side: 300 },
  { date: 'Feb', amount: 1350, salary: 1000, side: 350 },
  { date: 'Mar', amount: 1280, salary: 950, side: 330 },
  { date: 'Apr', amount: 1500, salary: 1100, side: 400 },
  { date: 'May', amount: 1600, salary: 1150, side: 450 },
]

const sampleExpense = [
  { date: 'Jan', amount: 800, food: 300, bills: 200, others: 300 },
  { date: 'Feb', amount: 900, food: 320, bills: 220, others: 360 },
  { date: 'Mar', amount: 850, food: 310, bills: 210, others: 330 },
  { date: 'Apr', amount: 950, food: 350, bills: 240, others: 360 },
  { date: 'May', amount: 1000, food: 360, bills: 260, others: 380 },
]

const incomePie = [
  { name: 'Salary', value: 1150 },
  { name: 'Investments', value: 300 },
  { name: 'Gifts', value: 90 },
]

const expensePie = [
  { name: 'Food', value: 350 },
  { name: 'Transport', value: 120 },
  { name: 'Bills', value: 240 },
  { name: 'Shopping', value: 200 },
]

export default function Dashboard() {
  const totalIncome = sampleIncome.reduce((acc, i) => acc + i.amount, 0)
  const totalExpense = sampleExpense.reduce((acc, e) => acc + e.amount, 0)
  const balance = totalIncome - totalExpense

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-sm">Total Income</div>
          <div className="text-2xl font-bold text-emerald-400">${totalIncome.toLocaleString()}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-sm">Total Expense</div>
          <div className="text-2xl font-bold text-rose-400">${totalExpense.toLocaleString()}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-sm">Balance</div>
          <div className={`text-2xl font-bold ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>${balance.toLocaleString()}</div>
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Income over time */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-300 text-sm mb-2">Income over time</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleIncome}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1f2937', color: '#e2e8f0' }} />
                <Line type="monotone" dataKey="amount" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense over time */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-300 text-sm mb-2">Expense over time</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleExpense}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1f2937', color: '#e2e8f0' }} />
                <Line type="monotone" dataKey="amount" stroke="#f43f5e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income categories */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-300 text-sm mb-2">Income categories</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={incomePie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} fill="#8884d8" label>
                  {incomePie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1f2937', color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense categories */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-300 text-sm mb-2">Expense categories</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expensePie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} fill="#8884d8" label>
                  {expensePie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1f2937', color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income vs Expense */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 lg:col-span-2">
          <div className="text-slate-300 text-sm mb-2">Income vs Expense</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sampleIncome.map((d, i) => ({ date: d.date, income: d.amount, expense: sampleExpense[i].amount }))}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1f2937', color: '#e2e8f0' }} />
                <Legend />
                <Bar dataKey="income" fill="#34d399" />
                <Bar dataKey="expense" fill="#f43f5e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
