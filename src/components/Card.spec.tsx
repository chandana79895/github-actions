import { render, screen } from "@testing-library/react";
import CustomCard from "./Card";

describe('Card Component', () => {
  test('renders card with title and children', () => {
    render(
      <CustomCard title="Card Title">
        Card Content
      </CustomCard>
    );
    const cardElement = screen.getByText(/card title/i);
    const cardContentElement = screen.getByText(/card content/i);
    expect(cardElement).toBeInTheDocument();
    expect(cardContentElement).toBeInTheDocument();
  });

  test('renders card with single child', () => {
    render(
      <CustomCard>
        Card Content
      </CustomCard>
    );
    const cardContentElement = screen.getByText(/card content/i);
    expect(cardContentElement).toBeInTheDocument();
  });

  test('renders card with multiple child', () => {
    render(
      <CustomCard>
        <div>Card Content</div>
        <div>Content2</div>
      </CustomCard>
    );
    const cardContentElement = screen.getByText(/card content/i);
    const cardContentElement2 = screen.getByText(/content2/i);
    expect(cardContentElement).toBeInTheDocument();
    expect(cardContentElement2).toBeInTheDocument();
  });

  test('throws an error when only title is specified', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
    render(<CustomCard title="Card Title" />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });

  test('renders card with nested card', () => {
    render(
      <CustomCard title="Main title">
        Main Content
        <CustomCard title="Sub title">
          Sub Content
        </CustomCard>
      </CustomCard>
    );
    const cardElement = screen.getByText(/main title/i);
    const cardContentElement = screen.getByText(/main content/i);
    const subcardElement = screen.getByText(/sub title/i);
    const subcardContentElement = screen.getByText(/sub content/i);
    expect(cardElement).toBeInTheDocument();
    expect(cardContentElement).toBeInTheDocument();
    expect(subcardElement).toBeInTheDocument();
    expect(subcardContentElement).toBeInTheDocument();
  });

  test('throws an error when children is null', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
    render(
      <CustomCard title="Card Title">
        {null}
      </CustomCard>
    );
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });

  test('renders when children is a fragment', () => {
    expect(() => render(
      <CustomCard>
        <></>
      </CustomCard>
    ));
  });
});