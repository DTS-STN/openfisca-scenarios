import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./redux";
import {Provider} from "react-redux";
import "./i18n";
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';
import {changeLanguageCreator, LANGUAGES} from "./redux/actions";

function reloadTemplate() {
    // babel will handle transpilation to ES5
    const language = document
        .getElementsByTagName("html")[0]
        .getAttribute("lang");
    let switchLanguage = "fr";
    if (language === "fr") {
        switchLanguage = "en";
    }

    const defTop = document.getElementById("def-top");

    /* global wet */
    if (defTop) {
        // @ts-ignore
        defTop.innerHTML = wet.builder.appTop({
            appName: [
                {
                    href: "#",
                    text:
                        switchLanguage === "en"
                            ? "Scénarios Open Fisca"
                            : "Open Fisca Scenarios"
                }
            ],
            search: false,

            breadcrumbs: [
                {
                    title: switchLanguage === "en" ? "Accueil" : "Home",
                    href:
                        switchLanguage === "en"
                            ? "https://www.canada.ca/fr.html"
                            : "https://www.canada.ca/en.html"
                },
                {
                    title:
                        switchLanguage === "en" ? "Gouvernement ouvert" : "Open Government",
                    href:
                        switchLanguage === "en"
                            ? "https://ouvert.canada.ca/fr"
                            : "https://open.canada.ca/en"
                }
            ]
        });
    }

    let defPreFooter = document.getElementById("def-preFooter");
    if (defPreFooter) {
        // @ts-ignore
        defPreFooter.innerHTML = wet.builder.preFooter({
            // see public index.html
            // get the build time which is injected into the root element at build time
            dateModified: "2020-06-03",
            versionIdentifier: "0.0.1",
            showPostContent: false,
            showShare: false
        });
    }
    let defFooter = document.getElementById("def-footer");
    if (defFooter) {
        // @ts-ignore
        defFooter.innerHTML = wet.builder.appFooter({
            footerSections: [
                {
                    href:
                        switchLanguage === "en"
                            ? "/fr/formulaire/faites-nous-part-de-vos-commentaires"
                            : "/en/forms/contact-us",
                    text:
                        switchLanguage === "en"
                            ? "Contactez-nous du gouvernement ouvert"
                            : "Open Government Contact"
                },
                {
                    href:
                        switchLanguage === "en"
                            ? "https://www.canada.ca/fr/gouvernement/min.html"
                            : "https://www.canada.ca/en/government/dept.html",
                    text:
                        switchLanguage === "en"
                            ? "Ministères et organismes"
                            : "Departments and agencies"
                },
                {
                    href:
                        switchLanguage === "en"
                            ? "https://www.canada.ca/fr/gouvernement/fonctionpublique.html"
                            : "https://www.canada.ca/en/government/publicservice.html",
                    text:
                        switchLanguage === "en"
                            ? "Fonction publique et force militaire"
                            : "Public service and military"
                },
                {
                    href:
                        switchLanguage === "en"
                            ? "http://nouvelles.gc.ca/"
                            : "http://news.gc.ca/",
                    text: switchLanguage === "en" ? "Nouvelles" : "News"
                },
                {
                    href:
                        switchLanguage === "en"
                            ? "https://www.canada.ca/fr/gouvernement/systeme/lois.html"
                            : "https://www.canada.ca/en/government/system/laws.html",
                    text:
                        switchLanguage === "en"
                            ? "Traités, lois et règlements"
                            : "Treaties, laws and regulations"
                },
                {
                    href:
                        switchLanguage === "en"
                            ? "https://www.canada.ca/fr/transparence/rapports.html"
                            : "https://www.canada.ca/en/transparency/reporting.html",
                    text:
                        switchLanguage === "en"
                            ? "Rapports à l'échelle du gouvernement"
                            : "Government-wide reporting"
                },
                {
                    href: switchLanguage === "en" ? "/fr/user" : "/en/user",
                    text:
                        switchLanguage === "en"
                            ? "Ouverture de session Gouvernement ouvert"
                            : "Open Government Log In"
                },
                {
                    href:
                        switchLanguage === "en"
                            ? "https://www.canada.ca/fr/gouvernement/systeme.html"
                            : "https://www.canada.ca/en/government/system.html",
                    text:
                        switchLanguage === "en"
                            ? "Comment le gouvernement fonctionne"
                            : "How government works"
                }
            ],
            showFeatures: false
        });
    }
}

// cdts language switching is built for static applications
// create a language button which will toggle the i18n locale from english to french
// such as the page does not need to reload  if a user switches the language
function generateLanguageToggle() {
    const htmlElement = document.getElementsByTagName("html")[0];
    const language = htmlElement.getAttribute("lang");
    let switchLanguage = "en";
    if (language === "fr") {
        switchLanguage = "fr";
    }

    // create language toggle
    let languageButton = document.createElement("button");

    languageButton.innerText = switchLanguage === "en" ? "Français" : "English";
    languageButton.className =
        "btn btn-default fixed-top language-button position-absolute";
    languageButton.style["left"] = "unset";
    console.log(languageButton)
    languageButton.addEventListener("click", e => {
        let currentLanguage = store.getState()["language"];

        if (currentLanguage === "fr") {
            store.dispatch(
                changeLanguageCreator(LANGUAGES.EN)
            )

            if (e.target instanceof HTMLElement) {
                e.target.innerText = "Français";
            }
            htmlElement.setAttribute("lang", "en");
            reloadTemplate();

            // once the template reloads we will need to mount the button back into the banner
            let wbBanner = document.getElementById("wb-bnr") ;
            wbBanner.appendChild(e.currentTarget );
        } else {
            store.dispatch(
                changeLanguageCreator(LANGUAGES.FR)
            )
            if (e.target instanceof HTMLElement) {
                e.target.innerText = "English";
            }
            htmlElement.setAttribute("lang", "fr");
            reloadTemplate();

            let wbBanner = document.getElementById("wb-bnr") ;
            wbBanner.appendChild(e.currentTarget);
        }

        // reload the cdts template
    });
    let wbBanner = document.getElementById("wb-bnr");

    wbBanner.appendChild(languageButton);
}

window.onload = function() {
    reloadTemplate();
    generateLanguageToggle();
};

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
