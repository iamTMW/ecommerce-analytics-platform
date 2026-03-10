import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard home page', () => {
  render(<App />);
  expect(
    screen.getByText(/Welcome to your ecommerce analytics dashboard/i),
  ).toBeInTheDocument();
});

test('renders dashboard navigation', () => {
  render(<App />);
  expect(screen.getByText(/E-Commerce Analysis/i)).toBeInTheDocument();
});
