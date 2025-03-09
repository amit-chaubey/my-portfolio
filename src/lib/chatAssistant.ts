import { LRUCache } from 'lru-cache';

// Cache configuration
const cache = new LRUCache<string, string>({
  max: 100, // Store up to 100 responses
  ttl: 1000 * 60 * 60 * 24, // Cache for 24 hours
});

// Rate limiting configuration
const rateLimit = {
  tokens: 20, // Allow 20 requests
  window: 60 * 1000, // Per 1 minute window
};

let lastReset = Date.now();
let tokens = rateLimit.tokens;

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are a helpful assistant for Amit's portfolio website. 
You should provide concise, informative responses about:
- Software development experience and skills
- Full-stack development expertise with AI integration
- Notable projects and achievements
Keep responses professional and under 100 words.`;

// Initialize OpenAI client lazily to avoid build errors
let openai: any = null;

/**
 * Generates an answer to a user question using OpenAI's API
 * Implements caching and rate limiting
 */
export async function generateAnswer(question: string): Promise<string> {
  console.log('Generating answer for question:', question);
  
  // Check cache first
  const cacheKey = question.toLowerCase().trim();
  const cachedResponse = cache.get(cacheKey);
  
  if (cachedResponse) {
    console.log('Cache hit! Returning cached response');
    return cachedResponse;
  }
  
  console.log('Cache miss. Checking rate limit...');
  
  // Check rate limit
  const now = Date.now();
  if (now - lastReset >= rateLimit.window) {
    console.log('Resetting rate limit tokens');
    tokens = rateLimit.tokens;
    lastReset = now;
  }
  
  if (tokens <= 0) {
    console.log('Rate limit exceeded');
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  tokens--;
  console.log(`Rate limit tokens remaining: ${tokens}`);

  try {
    // Initialize OpenAI client if not already initialized
    if (!openai) {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY environment variable is missing');
      }
      
      const { default: OpenAI } = await import('openai');
      openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
    
    console.log('Calling OpenAI API...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: question }
      ],
      temperature: 0.7,
      max_tokens: 100 // Limit to 100 tokens as requested
    });

    const answer = completion.choices[0].message.content || 
      'I apologize, I could not generate a response.';
    
    console.log('Received answer from OpenAI, caching response');
    cache.set(cacheKey, answer);
    return answer;

  } catch (error: any) {
    console.error('Error calling OpenAI API:', error);
    if (error.message.includes('OPENAI_API_KEY')) {
      return 'The AI assistant is currently unavailable. Please try again later.';
    }
    if (error.code === 'insufficient_quota') {
      return 'Service temporarily unavailable. Please try again later.';
    }
    return 'Failed to generate response. Please try again.';
  }
}
