"use client"

import { useState } from 'react'
import { Save, User, Wallet, Target, Settings } from 'lucide-react'

export default function SetupPage() {
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    studentType: 'undergraduate',
    
    // Financial Info
    monthlyIncome: '',
    incomeSource: 'parents',
    
    // Savings Goal
    goalItem: '',
    goalAmount: '',
    goalDeadline: '',
    currentSavings: '',
    
    // Budget Categories
    budgetCategories: {
      food: '',
      transport: '',
      shopping: '',
      entertainment: '',
      books: '',
      other: ''
    },
    
    // Preferences
    trackingMethod: 'voice',
    reminderFrequency: 'daily'
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateBudgetCategory = (category: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      budgetCategories: {
        ...prev.budgetCategories,
        [category]: value
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save to Firebase/database
    console.log('Form Data:', formData)
    // Redirect to dashboard
    window.location.href = '/dashboard'
  }

  const totalBudget = Object.values(formData.budgetCategories).reduce((sum, val) => sum + (parseInt(val) || 0), 0)

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Setup Your Profile</h1>
          <p className="text-gray-400">Complete your profile to get started with BudgetBee</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Personal Information */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-6">
              <User className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Personal Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Student Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'school', label: 'School' },
                    { value: 'undergraduate', label: 'Undergraduate' },
                    { value: 'postgraduate', label: 'Postgraduate' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => updateFormData('studentType', type.value)}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        formData.studentType === type.value
                          ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Financial Information */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-6">
              <Wallet className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">Financial Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Monthly Pocket Money <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
                    placeholder="5000"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Income Source <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'parents', label: 'Parents/Family' },
                    { value: 'scholarship', label: 'Scholarship' },
                    { value: 'parttime', label: 'Part-time Job' },
                    { value: 'allowance', label: 'Other' }
                  ].map((source) => (
                    <button
                      key={source.value}
                      type="button"
                      onClick={() => updateFormData('incomeSource', source.value)}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        formData.incomeSource === source.value
                          ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {source.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Savings Goal */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-6">
              <Target className="w-5 h-5 text-pink-400" />
              <h2 className="text-lg font-semibold text-white">Savings Goal</h2>
              <span className="text-xs text-gray-500">(Optional)</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">What are you saving for?</label>
                <input
                  type="text"
                  value={formData.goalItem}
                  onChange={(e) => updateFormData('goalItem', e.target.value)}
                  placeholder="e.g., New Laptop, iPhone, Gaming Console"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Target Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      value={formData.goalAmount}
                      onChange={(e) => updateFormData('goalAmount', e.target.value)}
                      placeholder="75000"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Already Saved</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      value={formData.currentSavings}
                      onChange={(e) => updateFormData('currentSavings', e.target.value)}
                      placeholder="10000"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Target Date</label>
                  <input
                    type="date"
                    value={formData.goalDeadline}
                    onChange={(e) => updateFormData('goalDeadline', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Budget Categories */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Wallet className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">Monthly Budget</h2>
                <span className="text-xs text-gray-500">(Optional)</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Total: </span>
                <span className="text-white font-semibold">₹{totalBudget}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'food', label: 'Food & Dining' },
                { key: 'transport', label: 'Transport' },
                { key: 'shopping', label: 'Shopping & Clothes' },
                { key: 'entertainment', label: 'Entertainment' },
                { key: 'books', label: 'Books & Study' },
                { key: 'other', label: 'Others' }
              ].map((category) => (
                <div key={category.key}>
                  <label className="block text-sm text-gray-300 mb-2">{category.label}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      value={formData.budgetCategories[category.key as keyof typeof formData.budgetCategories]}
                      onChange={(e) => updateBudgetCategory(category.key, e.target.value)}
                      placeholder="1000"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>

            {formData.monthlyIncome && totalBudget > 0 && (
              <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Remaining Budget:</span>
                  <span className={`font-semibold ${
                    parseInt(formData.monthlyIncome) - totalBudget >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    ₹{(parseInt(formData.monthlyIncome) - totalBudget).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* Preferences */}
          <section className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Expense Tracking Method</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'voice', label: 'Voice' },
                    { value: 'manual', label: 'Manual' },
                    { value: 'both', label: 'Both' }
                  ].map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => updateFormData('trackingMethod', method.value)}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        formData.trackingMethod === method.value
                          ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Spending Reminders</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'never', label: 'Never' }
                  ].map((freq) => (
                    <button
                      key={freq.value}
                      type="button"
                      onClick={() => updateFormData('reminderFrequency', freq.value)}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        formData.reminderFrequency === freq.value
                          ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save & Continue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
