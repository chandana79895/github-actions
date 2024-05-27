import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../../store/AppContext';
import { MockContext } from '@/constants/tests/MockContext';
import LocationSearchPage from './LocationSearchPage';
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));
jest.mock('../../api/utils/http', () => ({
  getApi: jest.fn(() => Promise.resolve({ data: 'success' })),
}));
describe('Location Select Page', () => {
  test('handles form submission', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <AppContext.Provider value={MockContext}>
          <LocationSearchPage />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const submitButton = getByRole('button');
    expect(submitButton).toBeDisabled();
    // const propertyName =
     getByPlaceholderText('enterPropertyName');
    // const storeName =
     getByPlaceholderText('selectStore');
    expect(submitButton).toBeDisabled();
    fireEvent.click(submitButton);
    expect(submitButton).toHaveTextContent('chooseLocation');
  });
});