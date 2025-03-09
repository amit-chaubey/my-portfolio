import { NextResponse } from 'next/server';

// Static fallback response for static export
const staticFallback = {
  answer: 'The AI assistant is available only in the development environment. Please contact the site owner for more information.'
};

// For static export, we need to provide a static response
export async function POST() {
  return NextResponse.json(staticFallback);
}

// Add OPTIONS method to handle CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
