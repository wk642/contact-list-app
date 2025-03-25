// import React from 'react';
import { render } from '@testing-library/react';
// import numbers from '../../numbers';
import App from '../../App';

// it('returns a sum of two number', () => {
//   expect(numbers(2, 2)).toBe(4);
// })

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
})