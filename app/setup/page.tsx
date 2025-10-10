'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, User, Wallet, Target, Settings, ArrowRight, CheckCircle2 } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function SetupPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

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
    currentSavings: '0',
    
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
  });

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        
        // Check if setup already completed
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists() && userSnap.data().profile) {
          // Already completed setup
          router.push('/dashboard');
        }
      } else {
        // Not logged in, redirect to home
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateBudgetCategory = (category: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      budgetCategories: {
        ...prev.budgetCategories,
        [category]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('⚠️ Please login first!');
      return;
    }

    setLoading(true);

    try {
      const userRef = doc(db, 'users', currentUser.uid);

      // Prepare data for Firestore
      const userData = {
        profile: {
          name: formData.name,
          email: currentUser.email,
          monthlyIncome: Number(formData.monthlyIncome),
          studentType: formData.studentType,
          incomeSource: formData.incomeSource,
          createdAt: serverTimestamp()
        },
        budgetCategories: {
          food: { 
            budget: Number(formData.budgetCategories.food) || 0, 
            spent: 0,
            color: '#F59E0B' 
          },
          transport: { 
            budget: Number(formData.budgetCategories.transport) || 0, 
            spent: 0,
            color: '#3B82F6'
          },
          shopping: { 
            budget: Number(formData.budgetCategories.shopping) || 0, 
            spent: 0,
            color: '#EC4899'
          },
          entertainment: { 
            budget: Number(formData.budgetCategories.entertainment) || 0, 
            spent: 0,
            color: '#8B5CF6'
          },
          books: { 
            budget: Number(formData.budgetCategories.books) || 0, 
            spent: 0,
            color: '#10B981'
          },
          other: { 
            budget: Number(formData.budgetCategories.other) || 0, 
            spent: 0,
            color: '#6B7280'
          }
        },
        savingsGoal: {
          item: formData.goalItem,
          target: Number(formData.goalAmount),
          saved: Number(formData.currentSavings) || 0,
          deadline: formData.goalDeadline
        },
        preferences: {
          trackingMethod: formData.trackingMethod,
          reminderFrequency: formData.reminderFrequency
        }
      };

      // Save to Firestore
      await setDoc(userRef, userData, { merge: true });

      console.log('✅ Setup completed successfully!');
      
      // Redirect to dashboard
      router.push('/dashboard');

    } catch (error) {
      console.error('❌ Setup error:', error);
      alert('Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalBudget = Object.values(formData.budgetCategories).reduce(
    (sum, val) => sum + (parseInt(val) || 0), 
    0
  );

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎯 Complete Your Profile
          </h1>
          <p className="text-gray-600">
            Let's set up your personalized finance dashboard
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {step > s ? <CheckCircle2 size={20} /> : s}
                </div>
                {s < 3 && (
                  <div className={`h-1 flex-1 mx-2 rounded transition-all ${
                    step > s ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-2xl mx-auto mt-2 text-sm text-gray-600">
            <span>Personal</span>
            <span>Budget</span>
            <span>Goals</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            
            {/* STEP 1: Personal & Financial Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="text-purple-600" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">Personal & Financial Info</h2>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Student Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Type
                  </label>
                  <select
                    value={formData.studentType}
                    onChange={(e) => updateFormData('studentType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="undergraduate">Undergraduate</option>
                    <option value="postgraduate">Postgraduate</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Monthly Income */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Pocket Money (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.monthlyIncome}
                    onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="8500"
                  />
                </div>

                {/* Income Source */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Income Source
                  </label>
                  <select
                    value={formData.incomeSource}
                    onChange={(e) => updateFormData('incomeSource', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="parents">Parents/Family</option>
                    <option value="scholarship">Scholarship</option>
                    <option value="part-time">Part-time Job</option>
                    <option value="freelance">Freelancing</option>
                    <option value="mixed">Mixed Sources</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 2: Budget Categories */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Wallet className="text-purple-600" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">Budget Categories</h2>
                </div>

                <p className="text-gray-600 mb-4">
                  Allocate your monthly budget across different categories
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Food */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🍔 Food & Dining
                    </label>
                    <input
                      type="number"
                      value={formData.budgetCategories.food}
                      onChange={(e) => updateBudgetCategory('food', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="3000"
                    />
                  </div>

                  {/* Transport */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🚗 Transport
                    </label>
                    <input
                      type="number"
                      value={formData.budgetCategories.transport}
                      onChange={(e) => updateBudgetCategory('transport', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="1500"
                    />
                  </div>

                  {/* Shopping */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🛍️ Shopping
                    </label>
                    <input
                      type="number"
                      value={formData.budgetCategories.shopping}
                      onChange={(e) => updateBudgetCategory('shopping', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="2000"
                    />
                  </div>

                  {/* Entertainment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      🎮 Entertainment
                    </label>
                    <input
                      type="number"
                      value={formData.budgetCategories.entertainment}
                      onChange={(e) => updateBudgetCategory('entertainment', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="1000"
                    />
                  </div>

                  {/* Books */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📚 Books & Study
                    </label>
                    <input
                      type="number"
                      value={formData.budgetCategories.books}
                      onChange={(e) => updateBudgetCategory('books', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="800"
                    />
                  </div>

                  {/* Other */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      💡 Other Expenses
                    </label>
                    <input
                      type="number"
                      value={formData.budgetCategories.other}
                      onChange={(e) => updateBudgetCategory('other', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="500"
                    />
                  </div>
                </div>

                {/* Budget Summary */}
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Total Budget:</span>
                    <span className="text-2xl font-bold text-purple-600">
                      ₹{totalBudget.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {formData.monthlyIncome && (
                    <div className="mt-2 text-sm text-gray-600">
                      Remaining: ₹{(Number(formData.monthlyIncome) - totalBudget).toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: Savings Goal & Preferences */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="text-purple-600" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">Savings Goal</h2>
                </div>

                {/* Goal Item */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are you saving for? *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.goalItem}
                    onChange={(e) => updateFormData('goalItem', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Laptop, Trip, Emergency Fund..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Goal Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Amount (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.goalAmount}
                      onChange={(e) => updateFormData('goalAmount', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="75000"
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Date
                    </label>
                    <input
                      type="date"
                      value={formData.goalDeadline}
                      onChange={(e) => updateFormData('goalDeadline', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Current Savings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Savings (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.currentSavings}
                    onChange={(e) => updateFormData('currentSavings', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>

                {/* Preferences */}
                <div className="pt-6 border-t">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="text-purple-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Tracking Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Tracking Method
                      </label>
                      <select
                        value={formData.trackingMethod}
                        onChange={(e) => updateFormData('trackingMethod', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="voice">🎤 Voice Commands</option>
                        <option value="manual">⌨️ Manual Entry</option>
                        <option value="both">🔄 Both</option>
                      </select>
                    </div>

                    {/* Reminder Frequency */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Reminder Frequency
                      </label>
                      <select
                        value={formData.reminderFrequency}
                        onChange={(e) => updateFormData('reminderFrequency', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
              >
                ← Previous
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all flex items-center gap-2"
              >
                Next <ArrowRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Complete Setup
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
