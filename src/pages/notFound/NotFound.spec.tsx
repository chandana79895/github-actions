import { render } from '@testing-library/react';
import NotFound from './NotFound';
import { AppContext } from '@/store/AppContext';
import { MemoryRouter } from 'react-router';
import { MockContext } from '@/constants/tests/MockContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('NotFound page', () => {
  it('renders Typography component with text "pageNotFound"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AppContext.Provider value={MockContext}>
          <NotFound />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const err = getByText('pageNotFound');
    expect(err).toBeInTheDocument();
  });
});