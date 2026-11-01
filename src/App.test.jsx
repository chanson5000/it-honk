import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import App, { HONKS } from './App.jsx';

let AudioMock;
let play;

beforeEach(() => {
  play = vi.fn(() => Promise.resolve());
  AudioMock = vi.fn(function () {
    this.play = play;
  });
  vi.stubGlobal('Audio', AudioMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const url = (file) => `${import.meta.env.BASE_URL}honks/${file}`;

it('renders the honk button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /honk/i })).toBeInTheDocument();
});

it('offers every honk sound as a choice, with the first selected', () => {
  render(<App />);
  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(HONKS.length);
  expect(screen.getByRole('radio', { name: /ahooga/i })).toBeChecked();
});

it('previews a sound when it is picked', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('radio', { name: /goose/i }));

  expect(screen.getByRole('radio', { name: /goose/i })).toBeChecked();
  expect(AudioMock).toHaveBeenCalledWith(url('goose.mp3'));
  expect(play).toHaveBeenCalledOnce();
});

it('plays the selected honk and shows a burst when clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('radio', { name: /goose/i }));
  AudioMock.mockClear();

  fireEvent.click(screen.getByRole('button', { name: /honk/i }));

  expect(AudioMock).toHaveBeenCalledWith(url('goose.mp3'));
  expect(screen.getByText('HONK!')).toBeInTheDocument();
});
