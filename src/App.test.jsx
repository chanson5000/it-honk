import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import App from './App.jsx';

it('renders the honk button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /honk/i })).toBeInTheDocument();
});
