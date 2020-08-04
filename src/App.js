import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useTranslation} from "react-i18next";

function App() {
  let {t, i18n} = useTranslation();

  const changeLanguage = async (e) => {
    let currentLanguage = e.target.innerText;
    if(currentLanguage === "Français"){
      await i18n.changeLanguage("fr");
    }else{
      await i18n.changeLanguage("en")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={changeLanguage}>
          {i18n.language === "fr"? "English": "Français"}
        </button>
        <p>
          {t("reactWelcome")}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
