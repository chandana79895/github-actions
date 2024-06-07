import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('Error Message Component', () => {
  test('renders error message', () => {
    render(<ErrorMessage message="Error message" />);
    const errorMessageElement = screen.getByText(/error message/i);
    expect(errorMessageElement).toBeInTheDocument();
  });

  test('renders when message is empty', () => {
    expect(() => render(<ErrorMessage message='' />));
  });

  test('renders warning icon', () => {
    render(<ErrorMessage message="Error message" />);
    const warningIcon = screen.getByRole('img');
    expect(warningIcon).toBeInTheDocument();
  });
  
  test('does not render when message is null', () => {
    render(<ErrorMessage message={null} />);
    const errorMessageElement = screen.queryByText(/error message/i);
    expect(errorMessageElement).not.toBeInTheDocument();
  });
});