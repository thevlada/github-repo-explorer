import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GitHub Repository Explorer', () => {
  render(<App />);
  const titleElement = screen.getByText(/GitHub Repository Explorer/i);
  expect(titleElement).toBeInTheDocument();
});
