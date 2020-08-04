import React, {useEffect} from 'react';
import './App.css';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import FormPage from "./FormPage"


function App() {
  // i18n
  let {i18n} = useTranslation();

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
    <Router>
      <Switch>
        <Route path='/submit'>
          <div>This will be a submit page for displaying results</div>
        </Route>
        <Route path='/'>
          <FormPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
