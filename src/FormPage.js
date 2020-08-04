import React, { useState } from 'react';
import {useSelector} from "react-redux";
import './App.css';
import 'survey-react/survey.css'
import * as Survey from 'survey-react'
import FormJson from './form.json'

function FormPage() {

  const [isComplete, setComplete] = useState(false)
  const [formData, setFormData] = useState({})

  // state subscription to language
  const language = useSelector(state => state.language)

  const onCompleteSubmit = (survey) => {
    setComplete(true)
    setFormData(survey.data)
  }

  return (
    !isComplete ? <Survey.Survey 
      json={FormJson}
      showCompletedPage={false}
      onComplete={onCompleteSubmit}
      locale={language}
    /> : <div> {JSON.stringify(formData)} </div>
  )
}

export default FormPage;
