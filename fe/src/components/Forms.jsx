import { useState } from 'react'

function Field({ label, type = 'text', value, onChange }) {
  return (
    <label className="block text-slate-300 text-sm">
      <span className="mb-1.5 block text-slate-400">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-slate-800/70 border border-slate-700 px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/40"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </label>
  )
}

function Select({ label, value, onChange, options = [] }) {
  return (
    <label className="block text-slate-300 text-sm">
      <span className="mb-1.5 block text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-slate-800/70 border border-slate-700 px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/40"
      >
        {options.map((opt) => (
          <option className="bg-slate-900" key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  )
}

export function IncomeForm() {
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Salary')
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(`Saved income: ${date || 'today'} • $${amount || '0'} • ${category}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Date" type="date" value={date} onChange={setDate} />
        <Field label="Amount" type="number" value={amount} onChange={setAmount} />
        <Select label="Category" value={category} onChange={setCategory} options={["Salary","Investment","Gift","Other"]} />
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">Save Income</button>
        {status && <span className="text-emerald-300 text-sm">{status}</span>}
      </div>
    </form>
  )
}

export function ExpenseForm() {
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(`Saved expense: ${date || 'today'} • $${amount || '0'} • ${category}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Date" type="date" value={date} onChange={setDate} />
        <Field label="Amount" type="number" value={amount} onChange={setAmount} />
        <Select label="Category" value={category} onChange={setCategory} options={["Food","Transport","Bills","Shopping","Other"]} />
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">Save Expense</button>
        {status && <span className="text-emerald-300 text-sm">{status}</span>}
      </div>
    </form>
  )
}
