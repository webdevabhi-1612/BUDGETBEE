"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Mic, X, TrendingUp, Target, Brain, Sparkles, Zap, 
  MessageSquare, CheckCircle, ArrowRight, Star, BarChart3, Globe
} from 'lucide-react'

export default function HomePage() {
  const [isListening, setIsListening] = useState(false)
  const [spokenText, setSpokenText] = useState('')
  const [transcriptHistory, setTranscriptHistory] = useState<string[]>([])
  const [recognition, setRecognition] = useState<any>(null)

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = true
        recognitionInstance.interimResults = true
        recognitionInstance.lang = 'en-IN'

        recognitionInstance.onresult = (event: any) => {
          let interimTranscript = ''
          let finalTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' '
            } else {
              interimTranscript += transcript
            }
          }

          if (finalTranscript) {
            setTranscriptHistory(prev => [...prev, finalTranscript.trim()])
            setSpokenText('')
          } else {
            setSpokenText(interimTranscript)
          }
        }

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
        }

        recognitionInstance.onend = () => {
          if (isListening) {
            recognitionInstance.start()
          }
        }

        setRecognition(recognitionInstance)
      }
    }
  }, [isListening])

  const startListening = () => {
    if (!recognition) return
    setTranscriptHistory([])
    setSpokenText('')
    recognition.start()
    setIsListening(true)
  }

  const stopListening = () => {
    if (!recognition) return
    recognition.stop()
    setIsListening(false)
  }

  const problems = [
    {
      title: "Complex Interfaces",
      description: "Too many buttons, graphs, and settings that overwhelm students who just want to track expenses quickly.",
      emoji: "😵"
    },
    {
      title: "Time-Consuming Entry",
      description: "Typing every expense detail manually takes time that students don't have between classes and activities.",
      emoji: "⏰"
    },
    {
      title: "Inconsistent Tracking",
      description: "Forgetting to log expenses leads to incomplete financial pictures and poor budgeting decisions.",
      emoji: "📉"
    }
  ]

  const features = [
    {
      title: "Voice-First Magic",
      description: "Just speak naturally - 'I spent 200 rupees on lunch' - and we'll handle everything else. No typing, no forms, no hassle.",
      icon: Mic,
      gradient: "from-pink-500 via-purple-500 to-indigo-500"
    },
    {
      title: "AI That Gets You",
      description: "Our AI automatically sorts expenses, identifies patterns, and provides insights that actually make sense.",
      icon: Brain,
      gradient: "from-cyan-500 via-blue-500 to-purple-500"
    },
    {
      title: "Goals On Autopilot",
      description: "Set goals with your voice and track progress effortlessly. 'Save 5000 rupees for new phone.' Done.",
      icon: Target,
      gradient: "from-orange-500 via-red-500 to-pink-500"
    },
    {
      title: "Desi AF",
      description: "Understands Indian English, currency, and spending patterns. Built for students, by students.",
      icon: Globe,
      gradient: "from-green-500 via-emerald-500 to-teal-500"
    }
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Sparkle decoration */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-full border border-white/10 backdrop-blur-xl">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered • Voice-First • 10K+ Students
              </span>
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Budget Bee
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-white/90 mb-4">
              Talk. Track. Thrive.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              The first voice-only finance app that actually understands how students spend 💸
            </p>
          </div>

          {/* Voice Interface */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col items-center space-y-8">
              
              {/* Mic Orb with Cross Button */}
              <div className="relative">
                {/* Animated rings when listening */}
                {isListening && (
                  <>
                    <div className="absolute inset-0 rounded-full border-4 border-pink-500/30 animate-ping" style={{ animationDuration: '1.5s' }} />
                    <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping" style={{ animationDuration: '2.5s' }} />
                  </>
                )}
                
                {/* Main Button */}
                <button
                  onClick={isListening ? stopListening : startListening}
                  className="relative group"
                >
                  <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isListening
                      ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 shadow-2xl shadow-purple-500/50 animate-pulse scale-110'
                      : 'bg-gradient-to-br from-pink-600 via-purple-600 to-cyan-600 hover:scale-110 shadow-xl shadow-purple-900/50'
                  }`}>
                    
                    {/* Inner glow effect */}
                    <div className="absolute inset-3 rounded-full bg-white/5 backdrop-blur-xl" />
                    
                    {/* Icon */}
                    <div className="relative z-10">
                      {isListening ? (
                        <div className="flex flex-col items-center space-y-3">
                          {/* Animated equalizer bars */}
                          <div className="flex space-x-2">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="w-2 rounded-full bg-white"
                                style={{
                                  height: '40px',
                                  animation: 'pulse 1s ease-in-out infinite',
                                  animationDelay: `${i * 0.1}s`
                                }}
                              />
                            ))}
                          </div>
                          <X className="w-12 h-12 text-white" />
                          <span className="text-white text-sm font-bold">Tap to Stop</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          <Mic className="w-16 h-16 text-white animate-bounce" />
                          <span className="text-white text-sm font-bold">Tap to Speak</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>

                {/* Floating particles */}
                {isListening && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-ping"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDuration: `${1 + Math.random() * 2}s`,
                          animationDelay: `${Math.random()}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Status Text */}
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-2">
                  {isListening ? '🎤 Listening...' : '✨ Ready to listen'}
                </p>
                <p className="text-gray-400">
                  {isListening ? 'Speak naturally, I got you!' : 'Tap the mic and start talking'}
                </p>
              </div>
            </div>
          </div>

          {/* Live Transcript Display */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 min-h-[300px] shadow-2xl">
              
              {/* Current speaking text */}
              {spokenText && (
                <div className="mb-6 p-6 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl border border-pink-500/30 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse mt-1.5" />
                    <p className="text-xl text-white font-medium italic">"{spokenText}"</p>
                  </div>
                </div>
              )}

              {/* Transcript history */}
              <div className="space-y-4">
                {transcriptHistory.length > 0 ? (
                  <>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Your Transcript</h3>
                    {transcriptHistory.map((text, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                      >
                        <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <p className="text-white/90 text-lg">{text}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-4">Your transcript will appear here</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">💡 Try saying:</p>
                      <div className="space-y-1">
                        <p className="text-gray-400">"I spent 200 rupees on lunch at McDonald's"</p>
                        <p className="text-gray-400">"Paid 50 rupees for auto ride"</p>
                        <p className="text-gray-400">"Got 5000 rupees as pocket money"</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/70"
            >
              <BarChart3 className="w-6 h-6 mr-2" />
              Open Dashboard
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              <Star className="w-5 h-5 mr-2" />
              Start Free
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>No card needed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Setup in 30 sec</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-pink-400" />
              <span>10K+ students</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Other apps? <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Complicated AF</span>
            </h2>
            <p className="text-xl text-gray-400">Built for corporate folks, not for the student hustle</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
                <div className="text-5xl mb-4">{problem.emoji}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{problem.title}</h3>
                <p className="text-gray-400 text-lg">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Built different
              </span> for Gen-Z
            </h2>
            <p className="text-xl text-gray-400">No cap, this is how budgeting should work</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-white/30 hover:scale-105 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 text-lg">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 rounded-[3rem] p-16 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Join the finance revolution 🚀
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              10,000+ students already track their expenses with just their voice. No typing, no hassle, just vibes.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-10 py-5 bg-white text-purple-900 rounded-2xl font-black text-xl hover:scale-110 transition-all duration-300 shadow-xl"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Start Now - It's Free
              <Sparkles className="w-6 h-6 ml-3" />
            </Link>
            <p className="mt-6 text-white/80">No BS, no credit card, just pure magic ✨</p>
          </div>
        </div>
      </section>
    </div>
  )
}
