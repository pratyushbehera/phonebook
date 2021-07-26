import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the parent container', () => {
  render(<App />);
  const divElement = screen.getByText(/Phone Numbers/i);
  expect(divElement).toBeInTheDocument();
});
