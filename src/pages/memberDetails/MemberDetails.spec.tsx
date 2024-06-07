import { render, fireEvent } from '@testing-library/react';
import MemberDetails from './MemberDetails';
import { MemoryRouter } from 'react-router';
import { AppContext } from '@/store/AppContext';
import { MockContext } from '@/constants/tests/MockContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.useFakeTimers();

describe('MemberDetails page', () => {
  it('renders both the cards', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <AppContext.Provider value={MockContext}>
          <MemberDetails />
        </AppContext.Provider>
      </MemoryRouter>
    );
    expect(queryByText(/validPoints/i)).toBeInTheDocument();
    expect(getByText('earnPoints')).toBeInTheDocument();
  });

  it('renders Button component with title "enterInformationDirectly" and calls handleSubmit on click', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AppContext.Provider value={MockContext}>
          <MemberDetails />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const button = getByText('enterInformationDirectly');
    fireEvent.click(button);
  });

});