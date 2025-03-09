import OpenAI from 'openai';
import { LRUCache } from 'lru-cache';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cache configuration
const cache = new LRUCache<string, string>({
  max: 100,
  ttl: 1000 * 60 * 60, // Cache for 1 hour
});

// Rate limiting configuration
const rateLimit = {
  tokens: 20,
  window: 60 * 1000, // 1 minute window
};

let lastReset = Date.now();
let tokens = rateLimit.tokens;

const SYSTEM_PROMPT = `You are a helpful assistant for Amit's portfolio website. 
You should provide concise, informative responses about:
- Software development experience and skills
- Full-stack development expertise with AI integration
- Notable projects and achievements
Keep responses professional and under 100 words.`;

export async function generateAnswer(question: string): Promise<string> {
  const cacheKey = question.toLowerCase().trim();
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) return cachedResponse;

  const now = Date.now();
  if (now - lastReset >= rateLimit.window) {
    tokens = rateLimit.tokens;
    lastReset = now;
  }
  if (tokens <= 0) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  tokens--;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: question }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    const answer = completion.choices[0].message.content || 
      'I apologize, I could not generate a response.';
    
    cache.set(cacheKey, answer);
    return answer;

  } catch (error: any) {
    if (error.code === 'insufficient_quota') {
      throw new Error('Service temporarily unavailable. Please try again later.');
    }
    throw new Error('Failed to generate response. Please try again.');
  }
}