import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import App, { HONKS } from './App.jsx';

afterEach(() => {
  vi.unstubAllGlobals();
});

it('renders the honk button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /honk/i })).toBeInTheDocument();
});

it('lists every honk sound', () => {
  render(<App />);
  expect(screen.getAllByRole('option')).toHaveLength(HONKS.length);
});

it('plays the selected honk when clicked', () => {
  const play = vi.fn(() => Promise.resolve());
  const AudioMock = vi.fn(function () {
    this.play = play;
  });
  vi.stubGlobal('Audio', AudioMock);

  render(<App />);
  fireEvent.change(screen.getByRole('combobox', { name: /honk sound/i }), {
    target: { value: 'goose.mp3' },
  });
  fireEvent.click(screen.getByRole('button', { name: /honk/i }));

  expect(AudioMock).toHaveBeenCalledWith('/honks/goose.mp3');
  expect(play).toHaveBeenCalledOnce();
});
