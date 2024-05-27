import "./App.css";
import "./components/styles/Components.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import routes from "./routes";
import "./i18n";
import { useMemo, useState, useEffect } from "react";
import { AppContext } from "./store/AppContext";
import { useTranslation } from "react-i18next";
import MenuComponent from "./components/Menu";

interface RouteItem {
  path: string;
  component: JSX.Element;
}

function App() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

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

  const sessionTimeout = process.env.REACT_APP_SESSION;
  console.log(`Session Timeout: ${sessionTimeout}`);

  const [organizationID, setOrganizationID] = useState(() => {
    return localStorage.getItem("organizationID") || "";
  });

  useEffect(()=>{
    if (organizationID === ''|| organizationID === undefined) {
      navigate('/login', { replace: true });
    }
  },[organizationID, navigate])

  useEffect(() => {
    // const localeCode = language === "English" ? "en" : "jp";
    const localeCode = language === "Japanese" ? "jp" : "en";
    i18n.changeLanguage(localeCode);
  }, [language, i18n]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("property", JSON.stringify(property));
  }, [property]);

  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);

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

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <MenuComponent setLanguage={handleLanguageUpdate} language={language} />
        <Routes>
          {routes.map((item: RouteItem) => (
            <Route key={item.path} path={item.path} element={item.component} />
          ))}
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
