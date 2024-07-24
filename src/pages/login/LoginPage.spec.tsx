import { act, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { AppContext } from '../../store/AppContext';
import { MockContext } from '@/constants/tests/MockContext';
import * as http from '../../utils/api/http';
import { AxiosResponse } from 'axios';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));


jest.useFakeTimers();
const apiSpy = jest.spyOn(http, 'getApi');

describe('LoginPage', () => {
  describe('handles form validations', () => {
    it('handles username with space', async () => {
      const { getByPlaceholderText, getByRole, queryByText } = render(
        <MemoryRouter>
          <AppContext.Provider value={MockContext}>
            <LoginPage />
          </AppContext.Provider>
        </MemoryRouter>
      );

      const submitButton = getByRole('button');

      const usernameInput = getByPlaceholderText('enterEmployeeID');
      fireEvent.change(usernameInput, { target: { value: 'testuser ' } });

      const passwordInput = getByPlaceholderText('enterPassword');
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });

      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);

      await act(async () => { jest.runAllTimers(); });
      expect(queryByText('usernameNoSpace')).toBeInTheDocument();
    });

    it('handles username with length >50', async () => {
      const { getByPlaceholderText, getByRole, queryByText } = render(
        <MemoryRouter>
          <AppContext.Provider value={MockContext}>
            <LoginPage />
          </AppContext.Provider>
        </MemoryRouter>
      );
      const username = 'testusername'.repeat(5);

      const submitButton = getByRole('button');

      const usernameInput = getByPlaceholderText('enterEmployeeID');
      fireEvent.change(usernameInput, { target: { value: username } });

      const passwordInput = getByPlaceholderText('enterPassword');
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });

      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);

      await act(async () => { jest.runAllTimers(); });
      expect(queryByText('usernameMaxLength')).toBeInTheDocument();
    });

    it('handles password with length <8', async () => {
      const { getByPlaceholderText, getByRole, queryByText } = render(
        <MemoryRouter>
          <AppContext.Provider value={MockContext}>
            <LoginPage />
          </AppContext.Provider>
        </MemoryRouter>
      );

      const submitButton = getByRole('button');

      const usernameInput = getByPlaceholderText('enterEmployeeID');
      fireEvent.change(usernameInput, { target: { value: "username" } });

      const passwordInput = getByPlaceholderText('enterPassword');
      fireEvent.change(passwordInput, { target: { value: 'pass' } });

      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);

      await act(async () => { jest.runAllTimers(); });
      expect(queryByText('passwordMinLength')).toBeInTheDocument();
    });

  });

  describe('handles form submission', () => {

    it('handles wrong credentials ', async () => {
      apiSpy.mockImplementation(() => Promise.reject(new Error('Unauthorized')));
      const { getByPlaceholderText, getByRole, queryByText } = render(
        <MemoryRouter>
          <AppContext.Provider value={MockContext}>
            <LoginPage />
          </AppContext.Provider>
        </MemoryRouter>
      );

      const submitButton = getByRole('button');
      expect(submitButton).toBeDisabled();

      const usernameInput = getByPlaceholderText('enterEmployeeID');
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      expect(usernameInput).toHaveValue('testuser');

      const passwordInput = getByPlaceholderText('enterPassword');
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });
      expect(passwordInput).toHaveValue('testpass');

      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);
      expect(submitButton).toHaveTextContent('loading');

      await act(async () => { jest.runAllTimers(); });
      expect(queryByText('invalidUsernameorPassword')).toBeInTheDocument();
    });

    it('accepts correct credentials', async () => {
      apiSpy.mockImplementation(() =>
        Promise.resolve({
          data: { response: { organization: { id: '1231' } } },
          status: 200,
        } as AxiosResponse)
      );
      const { getByPlaceholderText, getByRole } = render(
        <MemoryRouter>
          <AppContext.Provider value={MockContext}>
            <LoginPage />
          </AppContext.Provider>
        </MemoryRouter>
      );

      const submitButton = getByRole('button');
      expect(submitButton).toBeDisabled();

      const usernameInput = getByPlaceholderText('enterEmployeeID');
      fireEvent.change(usernameInput, { target: { value: 'zapcom_test' } });
      expect(usernameInput).toHaveValue('zapcom_test');

      const passwordInput = getByPlaceholderText('enterPassword');
      fireEvent.change(passwordInput, { target: { value: 'Zapcom@test123' } });
      expect(passwordInput).toHaveValue('Zapcom@test123');

      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);

      await act(async () => { jest.runAllTimers(); });
    });
  });
});