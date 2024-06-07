import { act,fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MemberSearchPage from './MemberSearchPage';
import { AppContext } from '../../store/AppContext';
import { MockContext } from '@/constants/tests/MockContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock('../../api/utils/http', () => ({
  getApi: jest.fn(() => Promise.resolve({ data: 'success' })),
}));

jest.useFakeTimers();

describe('LoginPage', () => {

  test('handles valid or Invalid Check form submission', async () => {
    const { getByPlaceholderText, getByText, queryByText} = render(
      <MemoryRouter>
        <AppContext.Provider value={MockContext}>
          <MemberSearchPage />
        </AppContext.Provider>
      </MemoryRouter>
    );

    const submitButton = getByText('search');
    expect(submitButton).toBeInTheDocument();
   
    const memberIdOrCardNumberInput = getByPlaceholderText('enterMemberIDorCardNumber');
    fireEvent.change(memberIdOrCardNumberInput, { target: { value: 'ID1234567890' } });
    expect(memberIdOrCardNumberInput).toHaveValue('ID1234567890');

    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    expect(submitButton).toHaveTextContent('search');

    act(() => { jest.runAllTimers(); });
    expect(queryByText('InvalidMemberIdOrCardNumber')).not.toBeInTheDocument();
  });


});