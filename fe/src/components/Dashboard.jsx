import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts'

const COLORS = ['#34d399', '#10b981', '#059669', '#047857', '#064e3b']

const sampleIncome = [
  { date: 'Jan', amount: 1200 },
  { date: 'Feb', amount: 1350 },
  { date: 'Mar', amount: 1280 },
  { date: 'Apr', amount: 1500 },
  { date: 'May', amount: 1600 },
]

const sampleExpense = [
  { date: 'Jan', amount: 800 },
  { date: 'Feb', amount: 900 },
  { date: 'Mar', amount: 850 },
  { date: 'Apr', amount: 950 },
  { date: 'May', amount: 1000 },
]

const incomeExpense = sampleIncome.map((item, i) => ({
  date: item.date,
  income: item.amount,
  expense: sampleExpense[i].amount,
}))

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
  const totalIncome = sampleIncome.reduce((a, b) => a + b.amount, 0)
  const totalExpense = sampleExpense.reduce((a, b) => a + b.amount, 0)
  const balance = totalIncome - totalExpense

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-sm">Total Income</div>
          <div className="text-2xl font-bold text-emerald-400">
            ${totalIncome.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-sm">Total Expense</div>
          <div className="text-2xl font-bold text-rose-400">
            ${totalExpense.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-sm">Balance</div>
          <div
            className={`text-2xl font-bold ${
              balance >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            ${balance.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Income & Expense */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 lg:col-span-2">
          <div className="text-slate-300 text-sm mb-2">
            Income & Expense over time
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incomeExpense}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid #1f2937',
                    color: '#e2e8f0',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#34d399"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income categories */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-300 text-sm mb-2">
            Income categories
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomePie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {incomePie.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense categories */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-300 text-sm mb-2">
            Expense categories
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensePie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {expensePie.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar comparison */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 lg:col-span-2">
          <div className="text-slate-300 text-sm mb-2">
            Income vs Expense (Bar)
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeExpense}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
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
