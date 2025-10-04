import Link from 'next/link'
import { 
  Mic, Mail, Phone, MapPin, Twitter, Linkedin,
  Github, Instagram, Youtube, Facebook,
  TrendingUp, Target, Users, Brain, Shield,
  Smartphone, ArrowRight, ExternalLink
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const productLinks = [
    { name: 'Voice Interaction', href: '#voice-interaction', icon: Mic },
    { name: 'Savings Goals', href: '#savings-goals', icon: Target },
    { name: 'Debt Tracking', href: '#debt-tracking', icon: Users },
    { name: 'AI Categorization', href: '#ai-categorization', icon: Brain },
    { name: 'Mobile App', href: '#mobile', icon: Smartphone },
    { name: 'Security', href: '#security', icon: Shield },
  ]

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Kit', href: '/press' },
    { name: 'Contact', href: '/contact' },
    { name: 'Investors', href: '/investors' },
  ]

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'API Documentation', href: '/docs' },
    { name: 'Status', href: '/status' },
    { name: 'Community', href: '/community' },
  ]

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/budgetbee', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/budgetbee', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/budgetbee', icon: Github },
    { name: 'Instagram', href: 'https://instagram.com/budgetbee', icon: Instagram },
    { name: 'YouTube', href: 'https://youtube.com/@budgetbee', icon: Youtube },
    { name: 'Facebook', href: 'https://facebook.com/budgetbee', icon: Facebook },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50"></div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">BB</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  BudgetBee
                </span>
                <p className="text-sm text-gray-400">Voice-First AI Finance</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Revolutionizing personal finance through voice technology. Track expenses, manage budgets, 
              and achieve financial goals with just your voice. Built specifically for Indian users.
            </p>

            {/* Key Features Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-emerald-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>85% Time Savings</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>&lt; 2s Response Time</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>95% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-orange-300">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Bank-Grade Security</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                <Mail className="w-4 h-4 text-emerald-400" />
                <a href="mailto:hello@budgetbee.ai">hello@budgetbee.ai</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Pune, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Features
            </h3>
            <div className="space-y-3">
              {productLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>{link.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
            <div className="space-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm group"
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <div className="space-y-3">
              {supportLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm group"
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                    {link.name === 'API Documentation' && (
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-400" />
                Stay Updated with BudgetBee
              </h3>
              <p className="text-gray-400 text-sm mb-4 max-w-md">
                Get the latest updates on new features, voice AI improvements, and financial tips 
                delivered straight to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-200"
                />
                <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>

            {/* App Download Links */}
            <div className="text-center lg:text-right">
              <h4 className="text-lg font-semibold mb-4 text-white">Download BudgetBee</h4>
              <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded"></div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded"></div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-gray-900/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} BudgetBee AI. All rights reserved. Made with ❤️ in India by Team Brogrammers.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </Link>
                )
              })}
            </div>

            {/* Voice Feature Badge */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 px-4 py-2 rounded-full border border-emerald-500/30">
              <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-300 font-medium">Voice-Powered Finance</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
