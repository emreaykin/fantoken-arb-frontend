import { useState, useCallback } from "react";
import "./App.css";

import Header from "./component/header/Header";
import SettingsMenu from "./component/setting/Setting";
import Search from "./component/Search/Search";
import ProfitTable from "./component/profitTable/profitTable";
import { AppContextProvider } from "./context/AppContext";

const App = () => {
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = useCallback(() => {
    setShowSettings((prevState) => !prevState);
  }, []);

  return (
    <div className="App">
      <Header toggleSettings={toggleSettings} />
      <div className="container">
        <Search />
        <ProfitTable />
      </div>
      {showSettings && <SettingsMenu />}
    </div>
  );
};

const WrappedApp = () => (
  <AppContextProvider>
    <App />
    
  </AppContextProvider>
);

export default WrappedApp;
