"use client"

import { useState, useEffect } from 'react'
import { 
  Mic, X, TrendingUp, TrendingDown, Sparkles, ChevronDown,
  ArrowUpRight, ArrowDownRight, Coffee, Car, ShoppingBag,
  Smartphone, BookOpen, Search, Bell, User, Target,
  Wallet, PiggyBank
} from 'lucide-react'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, 
  Tooltip, CartesianGrid
} from 'recharts'

export default function DashboardPage() {
  const [isListening, setIsListening] = useState(false)
  const [spokenText, setSpokenText] = useState('')
  const [recognition, setRecognition] = useState<any>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('Last month')

  // Student-focused stats
  const stats = {
    pocketMoney: 8500, // Monthly pocket money
    totalExpenses: 6240, // Total spent this month
    savings: 2260, // Money saved
    budgetUsed: 73, // Percentage of budget used
    expenseChange: 15, // % increase in expenses
    savingsChange: -8 // % change in savings
  }

  // Savings Goal
  const savingsGoal = {
    item: 'New Laptop',
    target: 75000,
    saved: 52500,
    progress: 70,
    monthsLeft: 3
  }

  // Student Budget Categories
  const budgetCategories = [
    { name: 'Food', budget: 3000, spent: 2450, icon: Coffee, color: 'from-pink-500 to-purple-500' },
    { name: 'Transport', budget: 1500, spent: 1280, icon: Car, color: 'from-cyan-500 to-blue-500' },
    { name: 'Shopping', budget: 2000, spent: 1650, icon: ShoppingBag, color: 'from-purple-500 to-pink-500' },
    { name: 'Books/Study', budget: 1000, spent: 860, icon: BookOpen, color: 'from-emerald-500 to-teal-500' }
  ]

  // Daily spending data (30 days)
  const spendingData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    amount: Math.floor(Math.random() * 300) + 50
  }))

  // Recent transactions
  const transactions = [
    { name: 'Lunch at Dominos', time: 'Today, 1:30 PM', amount: -350, type: 'expense', icon: '🍕', color: 'bg-orange-500' },
    { name: 'Mom transferred money', time: 'Oct 20, 10:00 AM', amount: 8500, type: 'income', icon: '💰', color: 'bg-emerald-500' },
    { name: 'Auto to College', time: 'Oct 19, 8:15 AM', amount: -50, type: 'expense', icon: '🚕', color: 'bg-yellow-500' },
    { name: 'Stationery Shopping', time: 'Oct 18, 5:00 PM', amount: -450, type: 'expense', icon: '📚', color: 'bg-blue-500' },
    { name: 'Coffee with Friends', time: 'Oct 17, 4:30 PM', amount: -280, type: 'expense', icon: '☕', color: 'bg-amber-500' }
  ]

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = true
        recognitionInstance.lang = 'en-IN'

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setSpokenText(transcript)
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
      }
    }
  }, [])

  const startListening = () => {
    if (!recognition) return
    setSpokenText('')
    recognition.start()
    setIsListening(true)
  }

  const stopListening = () => {
    if (!recognition) return
    recognition.stop()
    setIsListening(false)
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white mb-1">Student Dashboard</h1>
            <p className="text-gray-400">Track your spending, achieve your goals 🎯</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-10 h-10 bg-gradient-to-br from-pink-600 via-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Top 3 Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pocket Money */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Pocket Money</p>
                  <Wallet className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-3xl font-black text-white mb-3">₹{stats.pocketMoney.toLocaleString('en-IN')}</p>
                <p className="text-xs text-gray-400">This Month</p>
              </div>

              {/* Total Expenses */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-red-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Total Expenses</p>
                  <TrendingDown className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-3xl font-black text-white mb-1">₹{stats.totalExpenses.toLocaleString('en-IN')}</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-red-400" />
                  <span className="text-red-400 text-xs font-bold">{stats.expenseChange}% from last month</span>
                </div>
              </div>

              {/* Savings */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Saved This Month</p>
                  <PiggyBank className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-3xl font-black text-white mb-1">₹{stats.savings.toLocaleString('en-IN')}</p>
                <p className="text-xs text-emerald-400 font-bold">{((stats.savings/stats.pocketMoney)*100).toFixed(0)}% of income</p>
              </div>
            </div>

            {/* Savings Goal & Budget Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Savings Goal Card */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Target className="w-5 h-5 text-pink-400" />
                    <span>Savings Goal</span>
                  </h3>
                  <button className="text-sm text-pink-400 font-semibold hover:text-pink-300 transition-colors">
                    Edit Goal
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    {/* Circular Progress */}
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - savingsGoal.progress / 100)}`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ec4899" />
                          <stop offset="50%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-black text-white">{savingsGoal.progress}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-white font-bold text-lg mb-1">{savingsGoal.item}</p>
                    <p className="text-gray-400 text-sm">Target: ₹{savingsGoal.target.toLocaleString('en-IN')}</p>
                    <p className="text-emerald-400 text-sm font-semibold">Saved: ₹{savingsGoal.saved.toLocaleString('en-IN')}</p>
                    <p className="text-gray-400 text-xs mt-1">~{savingsGoal.monthsLeft} months to go 🎯</p>
                  </div>
                </div>
              </div>

              {/* Budget Categories Card */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Budget Status</h3>
                  <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full font-bold">
                    {stats.budgetUsed}% Used
                  </span>
                </div>
                
                <div className="space-y-4">
                  {budgetCategories.map((category, index) => {
                    const Icon = category.icon
                    const percentage = (category.spent / category.budget) * 100
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4 text-gray-400" />
                            <span className="text-white text-sm font-semibold">{category.name}</span>
                          </div>
                          <span className="text-gray-400 text-xs">
                            ₹{category.spent} / ₹{category.budget}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${category.color} transition-all duration-500`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Spending Analytics Chart */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Daily Spending Pattern</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                  <span className="text-sm text-gray-400">{selectedPeriod}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#6b7280" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '12px',
                      color: 'white'
                    }}
                    formatter={(value: any) => [`₹${value}`, 'Spent']}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="url(#barGradient)" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={12}
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Voice Input */}
            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <span>Quick Add Expense</span>
              </h3>
              <button
                onClick={isListening ? stopListening : startListening}
                className={`w-full h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isListening
                    ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 animate-pulse'
                    : 'bg-gradient-to-r from-pink-600/80 via-purple-600/80 to-cyan-600/80 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600'
                }`}
              >
                {isListening ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1 h-8 bg-white rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <X className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Mic className="w-6 h-6 text-white" />
                    <span className="text-white font-bold">Tap to Speak</span>
                  </div>
                )}
              </button>
              {spokenText && (
                <div className="mt-4 p-3 bg-white/5 rounded-xl">
                  <p className="text-white text-sm">"{spokenText}"</p>
                </div>
              )}
              <p className="text-gray-400 text-xs text-center mt-3">
                Say: "Spent 200 rupees on lunch" 🎤
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                <p className="text-gray-400 text-xs mb-1">Avg Daily Spend</p>
                <p className="text-2xl font-black text-white">₹{Math.round(stats.totalExpenses/30)}</p>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                <p className="text-gray-400 text-xs mb-1">Budget Left</p>
                <p className="text-2xl font-black text-emerald-400">₹{stats.pocketMoney - stats.totalExpenses}</p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              
              <div className="space-y-3">
                {transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${transaction.color} rounded-xl flex items-center justify-center text-lg`}>
                        {transaction.icon}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm group-hover:text-pink-400 transition-colors">{transaction.name}</p>
                        <p className="text-gray-400 text-xs">{transaction.time}</p>
                      </div>
                    </div>
                    <p className={`font-bold text-sm ${transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{Math.abs(transaction.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
