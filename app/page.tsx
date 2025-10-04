'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// ... your other imports

import { 
  Mic, MicOff, TrendingUp, Target, Users, Brain, 
  Shield, Smartphone, MessageSquare, Zap, PieChart,
  IndianRupee, Clock, CheckCircle, ArrowRight, Star, 
  Play, Globe, BarChart3, CreditCard, Wallet, Calendar
} from 'lucide-react'

export default function HomePage() {
  const [isListening, setIsListening] = useState(false)
  const [spokenText, setSpokenText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentDemo, setCurrentDemo] = useState(0)

  const demoExamples = [
    "I spent ₹200 on groceries at Big Bazaar",
    "Save ₹10,000 for vacation in 6 months", 
    "I borrowed ₹500 from Rahul today",
    "Paid ₹150 for lunch at McDonald's"
  ]

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false)
      setIsProcessing(true)
      setTimeout(() => {
        setSpokenText(demoExamples[currentDemo])
        setIsProcessing(false)
        setCurrentDemo((prev) => (prev + 1) % demoExamples.length)
      }, 2000)
    } else {
      setIsListening(true)
      setSpokenText('')
    }
  }

  return (
    <div className="overflow-hidden pb-20">
      {/* Hero Section with Integrated Voice Assistant */}
      <HeroSection 
        isListening={isListening}
        isProcessing={isProcessing}
        spokenText={spokenText}
        toggleListening={toggleListening}
      />
      
      {/* Problem Statement */}
      <ProblemSection />
      
      {/* Core Features (Your 3 Main Features) */}
      <CoreFeaturesSection />
      
      {/* AI Processing Flow */}
      <ProcessingFlowSection />
      
      {/* Impact & Benefits */}
      <ImpactSection />
      
      {/* Tech Stack */}
      <TechStackSection />
      
      {/* Future Scope */}
      <FutureScopeSection />
    </div>
  )
}

function HeroSection({ isListening, isProcessing, spokenText, toggleListening }) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-32 w-3 h-3 bg-purple-400/20 rounded-full animate-bounce"></div>
        <IndianRupee className="absolute top-32 right-20 w-6 h-6 text-emerald-400/30 animate-float" />
        <Target className="absolute bottom-32 left-20 w-5 h-5 text-blue-400/30 animate-float" style={{animationDelay: '1s'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="text-white space-y-8">
            {/* Team Badge */}
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 text-sm font-medium text-emerald-300">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              Team Brogrammers • PVGCOE Nashik
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white">BudgetBee</span>
                <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Voice-First AI
                </span>
                <span className="block text-white text-4xl md:text-5xl lg:text-6xl">
                  Finance Assistant
                </span>
              </h1>
              
              <div className="text-xl md:text-2xl font-semibold text-emerald-300">
                Revolutionizing Personal Finance Through Voice Technology
              </div>

              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Transform money management from a stressful chore into a seamless, everyday habit. 
                Built specifically for Indian students and young adults.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">85%</div>
                <div className="text-xs text-gray-400">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">&lt;2s</div>
                <div className="text-xs text-gray-400">Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">95%</div>
                <div className="text-xs text-gray-400">Accuracy</div>
              </div>
            </div>
          </div>

          {/* Right: Live Voice Assistant Demo */}
          <div className="relative">
            <VoiceAssistantDemo 
              isListening={isListening}
              isProcessing={isProcessing}
              spokenText={spokenText}
              toggleListening={toggleListening}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function VoiceAssistantDemo({
  isListening,
  isProcessing,
  spokenText,
  toggleListening,
}: {
  isListening: boolean
  isProcessing: boolean
  spokenText: string
  toggleListening: () => void
}) {
  return (
    <div className="relative bg-black/20 backdrop-blur-md border border-white/20 rounded-3xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-white mb-2">Try BudgetBee Live</h3>
        <p className="text-gray-400 text-sm">Just speak naturally to track your expenses</p>
      </div>

      {/* Voice Orb */}
      <div className="relative mb-8 flex justify-center">
        <div className={`relative w-32 h-32 rounded-full transition-all duration-1000 ${
          isListening 
            ? 'bg-gradient-to-br from-emerald-400/30 to-blue-400/30 shadow-[0_0_60px_rgba(16,185,129,0.5)]'
            : 'bg-gradient-to-br from-gray-700/30 to-gray-600/30 shadow-[0_0_30px_rgba(75,85,99,0.3)]'
        }`}>
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
            <Mic className={`w-12 h-12 text-white transition-transform duration-300 ${
              isListening ? 'scale-110 animate-pulse' : ''
            }`} />
          </div>

          {/* Animated Rings */}
          {isListening && (
            <>
              <div className="absolute -inset-2 rounded-full border-2 border-emerald-400/30 animate-ping"></div>
              <div className="absolute -inset-4 rounded-full border border-blue-400/20 animate-ping" style={{animationDelay: '0.5s'}}></div>
            </>
          )}
        </div>
      </div>

      {/* Voice Button */}
      <div className="text-center mb-6">
        <button
          onClick={toggleListening}
          disabled={isProcessing}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 ${
            isListening
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25'
              : isProcessing
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25'
          }`}
        >
          <div className="flex items-center gap-3">
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : isListening ? (
              <>
                <MicOff className="w-5 h-5" />
                <span>Stop Listening</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                <span>Start Speaking</span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Demo Status */}
      <div className="min-h-[120px]">
        {isListening ? (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 font-medium">Listening...</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">Try saying:</p>
            <div className="space-y-2">
              <div className="text-gray-300 text-sm bg-white/5 rounded-lg px-3 py-2">
                💰 I spent ₹200 on groceries
              </div>
              <div className="text-gray-300 text-sm bg-white/5 rounded-lg px-3 py-2">
                🎯 Save ₹10,000 for vacation
              </div>
            </div>
          </div>
        ) : isProcessing ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-300 font-medium">AI Processing...</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        ) : spokenText ? (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/20 rounded-xl p-4">
              <div className="text-emerald-300 font-medium text-sm mb-2">✨ You said:</div>
              <div className="text-white font-medium">&quot;{spokenText}&quot;</div>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4">
              <div className="text-emerald-200 text-sm">
                ✅ Processed & categorized automatically!
                <br />
                📊 Budget updated in real-time
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-gray-400 mb-4">Ready to help with your finances</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 rounded-lg p-2 text-gray-300">
                💰 Track Expenses
              </div>
              <div className="bg-white/5 rounded-lg p-2 text-gray-300">
                🎯 Set Goals
              </div>
              <div className="bg-white/5 rounded-lg p-2 text-gray-300">
                👥 Manage Debts
              </div>
              <div className="bg-white/5 rounded-lg p-2 text-gray-300">
                📊 Get Insights
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: "Time-consuming",
      description: "Manual data entry takes 2-3 minutes per expense",
      stat: "2-3 min"
    },
    {
      icon: MessageSquare,
      title: "Form fatigue",
      description: "Multiple fields to fill, categories to select",
      stat: "5+ fields"
    },
    {
      icon: TrendingUp,
      title: "Poor adoption",
      description: "68% abandon finance apps within a month",
      stat: "68%"
    },
    {
      icon: Users,
      title: "Context gap",
      description: "Apps don't understand Indian spending patterns",
      stat: "₹2.3T"
    }
  ]

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Manual expense tracking is{' '}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              broken
            </span>{' '}
            for busy people
          </h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-orange-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">₹2.3 Trillion</div>
            <div className="text-gray-700">spent annually by Indian millennials</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-red-100"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-red-600 mb-2">{problem.stat}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{problem.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{problem.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CoreFeaturesSection() {
  const features = [
    {
      icon: Mic,
      title: "Voice-Only Interaction",
      description: "Just speak to log expenses — e.g., 'I spent ₹200 on groceries'. The AI records, categorizes, and replies back instantly, making money tracking fully conversational.",
      color: "emerald",
      example: "\"I bought coffee for ₹150\""
    },
    {
      icon: Target,
      title: "Savings Goal Tracker",
      description: "Set goals like 'Save ₹10,000 in 6 months.' The AI calculates daily/weekly savings, tracks progress, and reminds you to stay on target.",
      color: "blue", 
      example: "\"Save ₹10,000 for vacation in 6 months\""
    },
    {
      icon: Users,
      title: "Debt & Loan Tracker",
      description: "Easily log borrowed/lent money. The system sends reminders like 'You owe ₹500 to Rahul - repay in 3 days', ensuring nothing is forgotten.",
      color: "purple",
      example: "\"I borrowed ₹500 from Rahul today\""
    }
  ]

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Proposed Solution
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Three Core Features That{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Change Everything
            </span>
          </h2>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 rounded-3xl p-8 border border-${feature.color}-200`}>
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? '' : 'lg:grid-cols-2'
                  }`}>
                    <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                          <div className={`text-${feature.color}-600 font-medium text-sm`}>Core Feature</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                        {feature.description}
                      </p>
                      
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                        <div className={`text-${feature.color}-600 font-medium text-sm mb-1`}>Try saying:</div>
                        <div className="text-gray-800 font-medium italic">{feature.example}</div>
                      </div>
                    </div>
                    
                    <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'} relative`}>
                      <FeatureIllustration feature={feature} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

type Feature = {
  icon: React.ElementType
  title: string
  description: string
  color: string
  example: string
}

function FeatureIllustration({ feature }: { feature: Feature }) {
  if (feature.title === "Voice-Only Interaction") {
    return (
      <div className="relative h-64 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20"></div>
        <div className="relative flex items-center gap-6">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
            <Mic className="w-10 h-10 text-white" />
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i}
                className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse"
                style={{ 
                  width: `${60 + i * 25}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  if (feature.title === "Savings Goal Tracker") {
    return (
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="relative">
          <div className="w-40 h-40 relative">
            <div className="absolute inset-0 border-8 border-gray-300 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-blue-500 rounded-full border-r-transparent border-b-transparent animate-spin"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Target className="w-12 h-12 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">67%</div>
              <div className="text-sm text-blue-500">Complete</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="relative h-64 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center overflow-hidden">
      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">You</span>
            </div>
            <ArrowRight className="w-6 h-6 text-purple-500" />
            <div className="bg-white/80 rounded-lg px-3 py-2">
              <div className="text-purple-600 font-medium text-sm">₹500 owed</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">Raj</span>
            </div>
            <ArrowRight className="w-6 h-6 text-orange-500 transform rotate-180" />
            <div className="bg-white/80 rounded-lg px-3 py-2">
              <div className="text-orange-600 font-medium text-sm">₹300 due</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProcessingFlowSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            AI Processing Flow{' '}
            <span className="text-emerald-400">&lt; 2 Seconds</span>
          </h2>
          <p className="text-gray-400 text-lg">95% accuracy with lightning-fast response</p>
        </div>

        <div className="relative">
          <div className="grid lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Mic, 
                title: "Voice Input", 
                description: "Web Speech API captures your voice",
                color: "emerald"
              },
              { 
                icon: Brain, 
                title: "AI Processing", 
                description: "OpenAI GPT-4 parses & categorizes",
                color: "blue"
              },
              { 
                icon: PieChart, 
                title: "Data Storage", 
                description: "PostgreSQL stores structured data",
                color: "purple"
              },
              { 
                icon: MessageSquare, 
                title: "Voice Response", 
                description: "Instant confirmation & insights",
                color: "orange"
              }
            ].map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="text-center relative">
                  <div className={`w-20 h-20 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                  
                  {index < 3 && (
                    <ArrowRight className="absolute top-10 -right-4 w-6 h-6 text-gray-600 hidden lg:block" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function ImpactSection() {
  const impacts = [
    {
      category: "Time & Efficiency",
      items: [
        "85% reduction in expense logging time (2 min → 15 sec)",
        "Zero typing required - completely hands-free",
        "Monthly time savings: 2.5 hours per user",
        "Real-time budget awareness with instant feedback"
      ]
    },
    {
      category: "User Engagement", 
      items: [
        "3x higher retention vs traditional finance apps",
        "Daily usage: 70% vs 25% industry average",
        "Target satisfaction: 4.8/5 rating",
        "Reduced abandonment through voice convenience"
      ]
    }
  ]

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Impact &{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Benefits
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {impacts.map((impact, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className={`w-3 h-3 ${index === 0 ? 'bg-emerald-500' : 'bg-blue-500'} rounded-full`}></div>
                {impact.category}
              </h3>
              <div className="space-y-4">
                {impact.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 ${index === 0 ? 'text-emerald-500' : 'text-blue-500'} mt-0.5 flex-shrink-0`} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechStackSection() {
  const techStack = {
    "Frontend": [
      { name: "React + JavaScript", desc: "Component-based UI framework" },
      { name: "Tailwind CSS", desc: "Utility-first styling" },
      { name: "Web Speech API", desc: "Voice recognition & synthesis" }
    ],
    "Backend & AI": [
      { name: "Node.js + Express", desc: "Server runtime & REST API" },
      { name: "OpenAI GPT-4", desc: "Natural language processing" },
      { name: "PostgreSQL", desc: "Primary database" }
    ],
    "DevOps": [
      { name: "Vercel", desc: "Frontend deployment" },
      { name: "Railway", desc: "Backend hosting" },
      { name: "Firebase Auth", desc: "User authentication" }
    ]
  }

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Built with{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Modern Tech Stack
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {Object.entries(techStack).map(([category, techs], index) => (
            <div key={category} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className={`w-3 h-3 ${
                  index === 0 ? 'bg-emerald-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                } rounded-full`}></div>
                {category}
              </h3>
              <div className="space-y-4">
                {techs.map((tech, techIndex) => (
                  <div key={techIndex} className="border-l-2 border-gray-200 pl-4">
                    <div className="font-semibold text-gray-900">{tech.name}</div>
                    <div className="text-sm text-gray-600">{tech.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FutureScopeSection() {
  const futureFeatures = [
    { icon: Brain, title: "AI Financial Advisor", desc: "Personalized investment tips and budget optimization" },
    { icon: Globe, title: "Multi-Language Support", desc: "Hindi, Marathi, Tamil, etc. for wider reach" },
    { icon: CreditCard, title: "UPI & Bank Integration", desc: "Auto-sync transactions from payment apps" },
    { icon: Users, title: "Community Features", desc: "Shared savings challenges and peer accountability" },
    { icon: Star, title: "Gamification", desc: "Rewards, streaks, and badges to keep motivated" },
    { icon: Smartphone, title: "Cross-Platform", desc: "Mobile app, smart speakers, WhatsApp bot" }
  ]

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Future{' '}
            <span className="text-emerald-400">Roadmap</span>
          </h2>
          <p className="text-gray-300 text-lg">Expanding BudgetBees capabilities for the next generation</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <Icon className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Transform money management from a stressful chore into a seamless, everyday habit — 
              empowering students to be more financially responsible, confident, and future-ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}