import { render, screen } from '@testing-library/react';
import Loader from './Loader'; 

describe('Loader Component Tests', () => {
  it('renders without crashing', () => {
    render(<Loader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies default props correctly', () => {
    render(<Loader />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveStyle('width: 100px');
    expect(progress).toHaveStyle('height: 100px');
  });

  it('applies custom size correctly', () => {
    const customSize = 150;
    render(<Loader size={customSize} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveStyle(`width: ${customSize}px`);
    expect(progress).toHaveStyle(`height: ${customSize}px`);
  });

  it('applies custom color correctly', () => {
    const customColor = 'secondary';
    render(<Loader color={customColor} />);
  });

  it('applies custom thickness correctly', () => {
    const customThickness = 6;
    render(<Loader thickness={customThickness} />);
  });
});