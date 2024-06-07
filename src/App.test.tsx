import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContext } from "./store/AppContext";
import App from "./App";
import { useTranslation } from "react-i18next";
import * as useLocalStorage from "./api/utils/useLocalStorage";
import * as IdleFunctions from "./api/utils/IdleFunctions";

jest.mock("./components/Menu", () => () => <div>MenuComponent</div>);
jest.mock("./components/Modal", () => ({ Modal: (_props: any) => <div>Modal</div> }));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },
}));

describe("App component", () => {
  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
      i18n: {
        changeLanguage: jest.fn(),
      },
    });

    jest.spyOn(useLocalStorage, "useOrganizationRedirect").mockImplementation(() => {});
    jest.spyOn(useLocalStorage, "useLanguageChange").mockImplementation(() => {});
    jest.spyOn(useLocalStorage, "useLocalStorageLanguage").mockImplementation(() => {});
    jest.spyOn(useLocalStorage, "useLocalStorageProperty").mockImplementation(() => {});
    jest.spyOn(useLocalStorage, "useLocalStorageStore").mockImplementation(() => {});

    jest.spyOn(IdleFunctions, "useIdleFunctions").mockReturnValue({
      handleOnIdle: jest.fn(),
      handleOnActive: jest.fn(),
      handleOnAction: jest.fn(),
      handleModalClose: jest.fn(),
    });
    jest.spyOn(IdleFunctions, "handleVisibilityChange").mockReturnValue(jest.fn());
  });

  const renderApp = (contextValue: any) => {
    return render(
      <Router>
        <AppContext.Provider value={contextValue}>
          <App />
        </AppContext.Provider>
      </Router>
    );
  };

  test("renders App component correctly", async () => {
    const contextValue = {
      language: "en",
      setLanguage: jest.fn(),
      organizationID: "123",
      setOrganizationID: jest.fn(),
      property: { label: "", value: "" },
      setProperty: jest.fn(),
      store: { label: "", value: "" },
      setStore: jest.fn(),
      reset: jest.fn(),
    };

    renderApp(contextValue);

    expect(screen.getByText("MenuComponent")).toBeInTheDocument();
  });

  test("shows idle modal when isIdle is true in localStorage", async () => {
    const contextValue = {
      language: "en",
      setLanguage: jest.fn(),
      organizationID: "123",
      setOrganizationID: jest.fn(),
      property: { label: "", value: "" },
      setProperty: jest.fn(),
      store: { label: "", value: "" },
      setStore: jest.fn(),
      reset: jest.fn(),
    };

    localStorage.setItem("isIdle", "true");

    renderApp(contextValue);

    await waitFor(() => {
      expect(screen.getByText("login")).toBeInTheDocument();
    });
  });

  test("does not show idle modal when isIdle is false in localStorage", async () => {
    const contextValue = {
      language: "en",
      setLanguage: jest.fn(),
      organizationID: "123",
      setOrganizationID: jest.fn(),
      property: { label: "", value: "" },
      setProperty: jest.fn(),
      store: { label: "", value: "" },
      setStore: jest.fn(),
      reset: jest.fn(),
    };

    localStorage.setItem("isIdle", "false");

    renderApp(contextValue);

    await waitFor(() => {
      // Checking if Modal is not rendered
      expect(screen.queryByText("Modal")).not.toBeInTheDocument();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
});
