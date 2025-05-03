import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ChatWidget } from '../ChatWidget';

describe('ChatWidget', () => {
  it('renders chat button initially', () => {
    render(<ChatWidget />);
    expect(screen.getByLabelText('Open chat')).toBeInTheDocument();
  });

  it('opens chat window when button is clicked', () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText('Open chat'));
    expect(screen.getByText('AI Assistant (Beta)')).toBeInTheDocument();
  });

  it('shows initial welcome message', () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText('Open chat'));
    expect(screen.getByText(/Hi! I can help you navigate/)).toBeInTheDocument();
  });

  it('handles user input and shows response', async () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByLabelText('Open chat'));
    
    const input = screen.getByPlaceholderText('Ask a question...');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.submit(screen.getByRole('form'));

    // Wait for loading state
    expect(screen.getByText('...')).toBeInTheDocument();

    // Wait for response
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1100));
    });

    // Verify user message is shown
    expect(screen.getByText('Hello')).toBeInTheDocument();
    // Verify bot responded
    expect(screen.getAllByRole('article')).toHaveLength(3); // Welcome + user + response
  });
}); 