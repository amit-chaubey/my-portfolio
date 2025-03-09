import { NextResponse } from 'next/server';
import { generateAnswer } from '@/lib/chatAssistant';

export async function POST(request: Request) {
  console.log('AI Assistant API route called');
  
  try {
    // Parse request body
    const body = await request.json();
    const { question } = body;
    
    console.log('Received question:', question);
    
    // Validate question
    if (!question?.trim()) {
      console.log('Error: Question is required');
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Generate answer
    console.log('Calling generateAnswer function');
    const answer = await generateAnswer(question);
    console.log('Answer generated:', answer);
    
    // Return response
    return NextResponse.json({ answer }, { status: 200 });
    
  } catch (error: any) {
    console.error('Error processing request:', error);
    
    // Handle rate limiting errors
    if (error.message.includes('Rate limit exceeded')) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

// Add OPTIONS method to handle CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
