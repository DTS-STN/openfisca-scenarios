import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";


function App() {
  // i18n
  let {t, i18n} = useTranslation();

  // state subscription to language
  const language = useSelector(state => state.language)

  // effect to handle language switching based on redux state
  useEffect(
      () => {
        if(i18n.language !== language){
            i18n.changeLanguage(language)
        }
      },
      [
          i18n,
          language
      ]
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {t("reactWelcome")}
        </p>
      </header>
    </div>
  );
}

export default App;
