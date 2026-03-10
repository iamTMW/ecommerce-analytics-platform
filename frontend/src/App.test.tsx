import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders placeholder app heading', () => {
  render(<App />);
  expect(screen.getByText(/SPRINT 4 PLACEHOLDER APP/i)).toBeInTheDocument();
});

test('renders backend health check link', () => {
  render(<App />);
  expect(screen.getByText(/Backend health check/i)).toBeInTheDocument();
});