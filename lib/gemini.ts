import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

export interface CategorizedExpense {
  amount: number
  category: 'food' | 'transport' | 'shopping' | 'entertainment' | 'books' | 'other'
  description: string
}

export async function categorizeExpense(spokenText: string): Promise<{
  success: boolean
  data?: CategorizedExpense
  error?: string
}> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
You are an expense categorization assistant. Extract these from: "${spokenText}"

1. Amount (number in rupees)
2. Category (food, transport, shopping, entertainment, books, or other)
3. Description (short, under 30 chars)

Respond ONLY with valid JSON:
{"amount": 250, "category": "food", "description": "Pizza"}
`

    const result = await model.generateContent(prompt)
    const response = result.response.text()
    
    console.log('Gemini Response:', response)
    
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Invalid response format')

    const parsed = JSON.parse(jsonMatch[0])
    
    if (!parsed.amount || !parsed.category || !parsed.description) {
      throw new Error('Missing required fields')
    }

    const validCategories = ['food', 'transport', 'shopping', 'entertainment', 'books', 'other']
    if (!validCategories.includes(parsed.category.toLowerCase())) {
      parsed.category = 'other'
    }

    return {
      success: true,
      data: {
        amount: Math.abs(Number(parsed.amount)),
        category: parsed.category.toLowerCase(),
        description: parsed.description.trim()
      }
    }
  } catch (error) {
    console.error('Gemini Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process'
    }
  }
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    food: '🍔',
    transport: '🚕',
    shopping: '🛍️',
    entertainment: '🎮',
    books: '📚',
    other: '💰'
  }
  return icons[category] || '💰'
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    food: 'bg-orange-500',
    transport: 'bg-yellow-500',
    shopping: 'bg-pink-500',
    entertainment: 'bg-purple-500',
    books: 'bg-blue-500',
    other: 'bg-gray-500'
  }
  return colors[category] || 'bg-gray-500'
}
