import React, { Component } from 'react';
import './App.css';
import 'survey-react/survey.css'
import * as Survey from 'survey-react'
import FormJson from './form.json'

class FormPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isComplete: false
    }
    this.onCompleteSubmit = this.onCompleteSubmit.bind(this)
  }

  onCompleteSubmit = (surveyData) => {
    this.setState({
      isComplete: true,
      formData: {...surveyData.data}
    })
  }

  render(){
    let surveyRender = !this.state.isComplete ? (
      <Survey.Survey 
        json={FormJson}
        showCompletedPage={false}
        onComplete={this.onCompleteSubmit}
      />
    ) : <div> {JSON.stringify(this.state.formData)} </div>
    return (
      <div>
        {surveyRender}
      </div>
    );
  }
}

export default FormPage;
