import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with title when not loading', () => {
    render(<Button title="Submit" onClick={() => {}} />);
    const buttonElement = screen.getByRole('button', { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders loading state when loading prop is true', () => {
    render(<Button title="Submit" loading={true} loadingText="Loading..." onClick={() => {}} />);
    const loadingElement = screen.getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('calls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();
    render(<Button title="Submit" onClick={handleClick} />);
    const buttonElement = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disables button when disabled prop is true', () => {
    render(<Button title="Submit" disabled={true} onClick={() => {}} />);
    const buttonElement = screen.getByRole('button', { name: /submit/i });
    expect(buttonElement).toBeDisabled();
  });
});
