import { NextResponse } from 'next/server';
import { generateAnswer } from '@/lib/chatAssistant';

// Fallback response for build time
const buildTimeFallback = {
  answer: 'The AI assistant is currently initializing. Please try again in a moment.'
};

export async function POST(request: Request) {
  // During build time, return a fallback response
  if (process.env.NODE_ENV === 'production' && !process.env.OPENAI_API_KEY) {
    console.log('Build time detected, returning fallback response');
    return NextResponse.json(buildTimeFallback);
  }
  
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

    try {
      // Generate answer
      console.log('Calling generateAnswer function');
      const answer = await generateAnswer(question);
      console.log('Answer generated:', answer);
      
      // Return response
      return NextResponse.json({ answer }, { status: 200 });
    } catch (error: any) {
      console.error('Error generating answer:', error);
      return NextResponse.json({ 
        answer: 'The AI assistant is currently unavailable. Please try again later.' 
      });
    }
    
  } catch (error: any) {
    console.error('Error processing request:', error);
    
    // Handle rate limiting errors
    if (error.message?.includes('Rate limit exceeded')) {
      return NextResponse.json(
        { answer: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { answer: 'The AI assistant is currently unavailable. Please try again later.' },
      { status: 200 } // Return 200 to avoid build errors
    );
  }
}

// Add OPTIONS method to handle CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

// Export config to disable static generation for this route
export const dynamic = 'force-dynamic';
