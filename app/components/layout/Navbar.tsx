'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Menu, X, Mic, TrendingUp, Shield, Smartphone, 
  Target, Users, Brain, ChevronDown, BarChart3
} from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

const navigation = [
  {
    name: 'Features',
    href: '#features',
    icon: TrendingUp,
    dropdown: [
      { name: 'Voice Interaction', href: '#voice-interaction', icon: Mic },
      { name: 'Savings Goals', href: '#savings-goals', icon: Target },
      { name: 'Debt Tracking', href: '#debt-tracking', icon: Users },
      { name: 'AI Categorization', href: '/components/dashboard', icon: Brain },
    ]
  },
  { name: 'Dashboard', href: '/components/dashboard', icon: BarChart3 },
  { name: 'How it Works', href: '#how-it-works', icon: Mic },
  { name: 'Security', href: '#security', icon: Shield },
  { name: 'Mobile App', href: '#mobile', icon: Smartphone },
]


  // Improved dropdown handlers
  const handleDropdownEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(itemName)
  }

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">BB</span>
            </div>
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                BudgetBee
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium animate-pulse">
                AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.name} className="relative group">
                    {item.dropdown ? (
                      <button
                        className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200 py-2"
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200 group"
                      >
                        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    )}

                    {/* Dropdown Menu */}
                    {item.dropdown && activeDropdown === item.name && (
                      <div
                        className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200/50 py-2 z-50"
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {item.dropdown.map((dropdownItem) => {
                          const DropdownIcon = dropdownItem.icon
                          return (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-200 group"
                            >
                              <DropdownIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                              <span className="font-medium">{dropdownItem.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
            >
              Try Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors duration-200 py-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                  
                  {/* Mobile Dropdown Items */}
                  {item.dropdown && (
                    <div className="ml-8 space-y-2 mt-2">
                      {item.dropdown.map((dropdownItem) => {
                        const DropdownIcon = dropdownItem.icon
                        return (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="flex items-center gap-3 text-gray-600 hover:text-emerald-600 transition-colors duration-200 py-2"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <DropdownIcon className="w-4 h-4" />
                            <span className="text-sm">{dropdownItem.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
            
            <div className="pt-6 border-t border-gray-200 space-y-3">
              <Link
                href="/auth/login"
                className="block text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="block bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Try Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
