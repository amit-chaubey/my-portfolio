import { NextResponse } from 'next/server';
import { generateAnswer } from '@/lib/chatAssistant';

export async function POST(request: Request) {
  try {
    const { question } = await request.json();
    
    if (!question?.trim()) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const answer = await generateAnswer(question);
    return NextResponse.json({ answer });
    
  } catch (error: any) {
    console.error('Error processing request:', error);
    
    if (error.message.includes('Rate limit exceeded')) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
