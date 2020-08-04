import React, { useState } from 'react';
import './App.css';
import 'survey-react/survey.css'
import * as Survey from 'survey-react'
import FormJson from './form.json'

function FormPage() {

  const [isComplete, setComplete] = useState(false)
  const [formData, setFormData] = useState({})

  const onCompleteSubmit = (survey) => {
    setComplete(true)
    setFormData(survey.data)
  }

  return (
    !isComplete ? <Survey.Survey 
      json={FormJson}
      showCompletedPage={false}
      onComplete={onCompleteSubmit}
    /> : <div> {JSON.stringify(formData)} </div>
  )
}

export default FormPage;
