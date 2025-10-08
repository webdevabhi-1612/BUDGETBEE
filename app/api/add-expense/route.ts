import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId, message } = await req.json();

    // Validate input
    if (!userId || !message) {
      return NextResponse.json(
        { error: 'Missing userId or message' },
        { status: 400 }
      );
    }

    // Call your ActivePieces webhook
    const webhookURL = 'https://cloud.activepieces.com/api/v1/webhooks/5t3mzKrZC3KCDTCiIGXyO';
    
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error('Webhook call failed');
    }

    return NextResponse.json({
      success: true,
      message: 'Expense added successfully',
    });

  } catch (error) {
    console.error('Error calling webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process expense' },
      { status: 500 }
    );
  }
}
