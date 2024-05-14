import "./App.css";
import "./components/styles/Components.css";
import { Route, Routes } from "react-router-dom";
import routes  from "./routes";
import './i18n';
import { useMemo, useState } from "react";
import MenuComponent from "./components/Menu";
import { Language } from "./types/Types";
import { AppContext } from "./store/AppContext";
import { useTranslation } from "react-i18next";

interface RouteItem{
  path:string,
  component: JSX.Element
}

function App() {
  const [language, setLanguage] = useState<Language>("English");
  const {i18n} = useTranslation();
  
  const handleLanguageUpdate = (language)=>{
    const localeCode = language === 'English'? 'en' : 'jp';
    i18n.changeLanguage(localeCode);
    setLanguage(language);
  }

  const contextValue = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);
  
  return (
    <AppContext.Provider value={contextValue}>
    <div className="App">
      <MenuComponent setLanguage={handleLanguageUpdate} language={language}/>
      <Routes>
        {routes.map((item: RouteItem) => (
          <Route key={item.path} path={item.path} element={item.component}  />
        ))
        }
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;



