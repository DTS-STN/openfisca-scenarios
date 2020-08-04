import React from 'react';
import {useSelector} from "react-redux";
import './App.css';
import 'survey-react/survey.css'
import * as Survey from 'survey-react'
import FormJson from './form.json'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function FormPage() {

  // state subscription to language
  const language = useSelector(state => state.language)

  // use react-router history object to navigate programatically
  const history = useHistory()

  const onCompleteSubmit = async (survey) => {
    const data = composeDataForPost(survey.data)
    try {
      const res = await axios.post('http://api.rules.nz/calculate', data)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
    history.push('/submit')
  }

  const composeDataForPost = (surveyData) => {
    let requestObject = {
      persons: {
        person: {
          someone: {
            social_security__eligible_for_accommodation_supplement: null
          }
        }
      }
    }

    for(const key in surveyData) {
      if (key === 'age') {
        requestObject.persons.person.someone[key] = { "2018-06-01": surveyData[key] }
      } else {
        requestObject.persons.person.someone[key] = { "2018-06": surveyData[key] }
      }
    }
    return requestObject
  }

  return (
    <Survey.Survey 
      json={FormJson}
      showCompletedPage={false}
      onComplete={onCompleteSubmit}
      locale={language}
    />
  )
}

export default FormPage;
