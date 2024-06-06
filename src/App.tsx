import "./App.css";
import "./components/styles/Components.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { IdleTimerProvider } from "react-idle-timer";
import routes from "./routes";
import "./i18n";
import { useEffect, useMemo, useState } from "react";
import { AppContext } from "./store/AppContext";
import { useTranslation } from "react-i18next";
import MenuComponent from "./components/Menu";
import { Modal } from "./components/Modal";
import {
  handleVisibilityChange,
  useIdleFunctions,
} from "./api/utils/IdleFunctions";
import {
  useOrganizationRedirect,
  useLanguageChange,
  useLocalStorageLanguage,
  useLocalStorageProperty,
  useLocalStorageStore,
} from "./api/utils/useLocalStorage";
import {session_time} from "./api/const/sessionTimeOut";
import NotFound from "./pages/notFound/NotFound";

interface RouteItem {
  path: string;
  component: JSX.Element;
}

function App() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [showIdleModal, setShowIdleModal] = useState(false);
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "Japanese";
  });
  const [property, setProperty] = useState(() => {
    const savedProperty = localStorage.getItem("property");
    return savedProperty ? JSON.parse(savedProperty) : { label: "", value: "" };
  });
  const [store, setStore] = useState(() => {
    const savedStore = localStorage.getItem("store");
    return savedStore ? JSON.parse(savedStore) : { label: "", value: "" };
  });
  const [organizationID, setOrganizationID] = useState(() => {
    return localStorage.getItem("organizationID") || "";
  });

  useOrganizationRedirect(organizationID, navigate);
  useLanguageChange(language, i18n);
  useLocalStorageLanguage(language);
  useLocalStorageProperty(property);
  useLocalStorageStore(store);

  const handleLanguageUpdate = (language) => {
    setLanguage(language);
  };

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage: handleLanguageUpdate,
      organizationID,
      setOrganizationID,
      property,
      setProperty,
      store,
      setStore,
      reset: () => {
        setProperty({ label: "", value: "" });
        setStore({ label: "", value: "" });
        setOrganizationID("");
        localStorage.removeItem("property");
        localStorage.removeItem("store");
        localStorage.removeItem("organizationID");
      },
    }),
    [language, property, store, organizationID]
  );

  const { handleOnIdle, handleOnActive, handleOnAction, handleModalClose } =
    useIdleFunctions(setShowIdleModal, contextValue, navigate);
  const isLoginPage = location.pathname === "/login";
  const shouldUseIdleTimer = organizationID && !isLoginPage;

  const MainComponent = (
    <div className="App">
      <MenuComponent setLanguage={handleLanguageUpdate} language={language} />
      <Routes>
        {routes.map((item: RouteItem) => (
          <Route key={item.path} path={item.path} element={item.component} />
        ))}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
  const handleVisibilityChangeCallback = handleVisibilityChange(
    session_time,
    setShowIdleModal
  );

  useEffect(() => {
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChangeCallback
    );
    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChangeCallback
      );
    };
  }, [handleVisibilityChangeCallback]);
  useEffect(() => {
    const isIdle = localStorage.getItem("isIdle");
    if (isIdle === "true") {
      setShowIdleModal(true);
    }
  }, []);

  return (
    <AppContext.Provider value={contextValue}>
      {shouldUseIdleTimer ? (
        <IdleTimerProvider
          timeout={+session_time}
          onIdle={handleOnIdle}
          onActive={handleOnActive}
          onAction={handleOnAction}
          events={["visibilitychange", "touchstart"]}
        >
          {MainComponent}
          {showIdleModal && (
            <>
              <div className="blocking-overlay" />
              <div className="modal-container">
                <Modal
                  open={showIdleModal}
                  onClose={handleModalClose}
                  error={true}
                  onClick={handleModalClose}
                  errorText={
                    <span>
                      {t("sessionTimedOut")}
                      <br />
                      {t("pleaseLoginToContinue")}
                    </span>
                  }
                  
                  buttonText={t("login")}
                />
              </div>
            </>
          )}
        </IdleTimerProvider>
      ) : (
        MainComponent
      )}
    </AppContext.Provider>
  );
}
export default App;