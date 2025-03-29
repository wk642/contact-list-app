import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App Component', () => {
  it('renders the App component without crashing', () => {
    render(<App />);
  });

  it('renders the App with a search bar', () => { 
    render(<App />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
});