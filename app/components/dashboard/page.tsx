'use client'
import { useState, useMemo } from 'react'
import { 
  PieChart, Pie, LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, RadialBarChart, RadialBar
} from 'recharts'
import { 
  Calendar, TrendingUp, Target, Users, Brain, 
  IndianRupee, Filter, Eye, List, Grid3X3,
  Mic, MessageSquare, ArrowUp, ArrowDown
} from 'lucide-react'

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'logs'>('overview')

  // Mock data - Replace with actual data from your backend
  const expenseData = [
    { id: 1, amount: 200, category: 'Food', description: 'Groceries at Big Bazaar', date: '2025-09-28', type: 'voice', merchant: 'Big Bazaar' },
    { id: 2, amount: 150, category: 'Food', description: 'Lunch at McDonald\'s', date: '2025-09-27', type: 'voice', merchant: 'McDonald\'s' },
    { id: 3, amount: 500, category: 'Transport', description: 'Uber ride to office', date: '2025-09-26', type: 'voice', merchant: 'Uber' },
    { id: 4, amount: 800, category: 'Entertainment', description: 'Movie tickets', date: '2025-09-25', type: 'manual', merchant: 'PVR Cinemas' },
    { id: 5, amount: 300, category: 'Food', description: 'Dinner with friends', date: '2025-09-24', type: 'voice', merchant: 'Dominos' },
    { id: 6, amount: 1200, category: 'Shopping', description: 'New headphones', date: '2025-09-23', type: 'manual', merchant: 'Amazon' },
    { id: 7, amount: 250, category: 'Transport', description: 'Auto rickshaw', date: '2025-09-22', type: 'voice', merchant: 'Local Auto' },
    { id: 8, amount: 400, category: 'Food', description: 'Coffee and snacks', date: '2025-09-21', type: 'voice', merchant: 'Cafe Coffee Day' },
  ]

  const savingsGoals = [
    { name: 'Vacation', target: 50000, current: 32000, color: '#10b981' },
    { name: 'Laptop', target: 80000, current: 45000, color: '#3b82f6' },
    { name: 'Emergency Fund', target: 100000, current: 78000, color: '#8b5cf6' }
  ]

  const debtData = [
    { name: 'Rahul', amount: 500, type: 'owed', dueDate: '2025-10-01' },
    { name: 'Priya', amount: 300, type: 'lent', dueDate: '2025-09-30' },
    { name: 'Arjun', amount: 1000, type: 'owed', dueDate: '2025-10-05' }
  ]

  // Process data for charts
  const categoryData = useMemo(() => {
    const categories = expenseData.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categories).map(([category, amount], index) => ({
      name: category,
      value: amount,
      fill: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][index % 5]
    }))
  }, [expenseData])

  const dailyTrends = useMemo(() => {
    const dailyData = expenseData.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
      acc[date] = (acc[date] || 0) + expense.amount
      return acc
    }, {} as Record<string, number>)

    return Object.entries(dailyData)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7) // Last 7 days
  }, [expenseData])

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === 'all') return expenseData
    return expenseData.filter(expense => expense.category.toLowerCase() === selectedCategory.toLowerCase())
  }, [expenseData, selectedCategory])

  const totalExpenses = useMemo(() => 
    filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  , [filteredExpenses])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">BudgetBee Dashboard</h1>
              <p className="text-gray-600">Track your expenses with voice-powered AI insights</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">₹{totalExpenses.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Expenses This Month</div>
            </div>
          </div>

          {/* Toggle Buttons for View Modes */}
          <div className="flex items-center gap-4 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {[
              { mode: 'overview', label: 'Overview', icon: Grid3X3 },
              { mode: 'detailed', label: 'Detailed', icon: Eye },
              { mode: 'logs', label: 'Expense Logs', icon: List }
            ].map(({ mode, label, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === mode
                    ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {['all', 'food', 'transport', 'entertainment', 'shopping'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-medium capitalize transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Mode */}
        {viewMode === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard 
                title="Today's Spending" 
                value="₹350" 
                change={-12} 
                icon={IndianRupee}
                color="emerald"
              />
              <StatCard 
                title="This Week" 
                value="₹2,450" 
                change={8} 
                icon={Calendar}
                color="blue"
              />
              <StatCard 
                title="Voice Entries" 
                value="85%" 
                change={5} 
                icon={Mic}
                color="purple"
              />
              <StatCard 
                title="Active Goals" 
                value="3" 
                change={0} 
                icon={Target}
                color="orange"
              />
            </div>

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Expense Categories Pie Chart */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Brain className="w-6 h-6 text-emerald-600" />
                  Expense Categories
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`₹${value}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Daily Spending Trend */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Daily Spending Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`₹${value}`, 'Amount']} />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#10b981" 
                      fill="url(#colorGradient)" 
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Savings Goals and Debt Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Savings Goals */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-600" />
                  Savings Goals
                </h3>
                <div className="space-y-4">
                  {savingsGoals.map((goal, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{goal.name}</span>
                        <span className="text-sm text-gray-600">
                          ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(goal.current / goal.target) * 100}%`,
                            backgroundColor: goal.color
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round((goal.current / goal.target) * 100)}% complete
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Debt Management */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-orange-600" />
                  Debt Management
                </h3>
                <div className="space-y-4">
                  {debtData.map((debt, index) => (
                    <div key={index} className={`p-4 rounded-xl border-l-4 ${
                      debt.type === 'owed' 
                        ? 'bg-red-50 border-red-500' 
                        : 'bg-green-50 border-green-500'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-gray-900">{debt.name}</span>
                          <div className="text-sm text-gray-600">
                            {debt.type === 'owed' ? 'You owe' : 'They owe you'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">₹{debt.amount}</div>
                          <div className="text-xs text-gray-500">Due: {debt.dueDate}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Mode */}
        {viewMode === 'detailed' && (
          <div className="space-y-8">
            {/* Detailed Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Category-wise Bar Chart */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Category Breakdown</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`₹${value}`, 'Amount']} />
                    <Bar dataKey="value" radius={8}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Comparison */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Comparison</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={[
                    { month: 'Jul', amount: 8500 },
                    { month: 'Aug', amount: 9200 },
                    { month: 'Sep', amount: 7800 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`₹${value}`, 'Amount']} />
                    <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Expense Logs Mode */}
        {viewMode === 'logs' && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <List className="w-6 h-6 text-emerald-600" />
                Expense Logs ({filteredExpenses.length} entries)
              </h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {filteredExpenses.map((expense) => (
                <div key={expense.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        expense.type === 'voice' ? 'bg-emerald-100' : 'bg-blue-100'
                      }`}>
                        {expense.type === 'voice' ? (
                          <Mic className={`w-6 h-6 ${expense.type === 'voice' ? 'text-emerald-600' : 'text-blue-600'}`} />
                        ) : (
                          <MessageSquare className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-900">{expense.description}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Filter className="w-4 h-4" />
                            {expense.category}
                          </span>
                          <span>{expense.merchant}</span>
                          <span>{new Date(expense.date).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">₹{expense.amount}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        expense.type === 'voice' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {expense.type === 'voice' ? 'Voice Entry' : 'Manual Entry'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ title, value, change, icon: Icon, color }: {
  title: string
  value: string
  change: number
  icon: any
  color: string
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-${color}-100 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {change !== 0 && (
          <div className={`flex items-center gap-1 text-sm ${
            change > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-600 text-sm">{title}</div>
    </div>
  )
}
