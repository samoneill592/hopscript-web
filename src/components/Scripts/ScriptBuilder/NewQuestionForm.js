/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to create a question
 * question, description, category, audio, boolean for closing statement
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../../config/styles';
import {
  InputTextArea,
  InputDropDown,
  InputAudio,
  LoaderOrThis,
  Button,
} from '../../common';
import { createNewQuestion, fetchScript } from './ScriptBuilderActions';

class NewQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    this.props.createNewQuestion({ question: data, scriptId: this.props.currentScript.id });
    this.props.toggleStep('answers');
  }

  render() {
    const {
      handleSubmit, loading
    } = this.props;
    return (
      <div>
        <LoaderOrThis loading={loading}>
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
          >
            <div className="single-line-textarea">
              <InputTextArea name="body" placeholder="Write Question Here" />
            </div>
            <div className="flex mt4 justify-between">
              <div className="w-20">Description</div>
              <div className="w-80">
                <div className="block-textarea">
                  <InputTextArea name="description" placeholder="Optional Description" />
                </div>
              </div>
            </div>
            <div className="flex items-center mt4 justify-between">
              <div className="w-20">Category</div>
              <div className="w-80">
                <InputDropDown
                  name="category"
                  type="dropdown"
                  placeholder="Choose category"
                  options={['Intro', 'Prequalifying', 'Provoking', 'Objection', 'Close']}
                  borderColor={Colors.moonGray}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-20">Audio</div>
              <div className="w-80">
                <InputAudio name="audio" />
              </div>
            </div>
            <div className="flex justify-end mt6">
              <Button backgroundColor={Colors.brandGreen}>Create</Button>
            </div>
          </form>
        </LoaderOrThis>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.category) {
    errors.category = '*required';
  }

  return errors;
}

const Form = reduxForm({
  form: 'newQuestion',
  validate
})(NewQuestionForm);

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const {
    error, loading, currentScript
  } = ScriptBuilderReducer;
  return {
    loading,
    error,
    currentScript,
  };
};

export default connect(mapStateToProps, { createNewQuestion, fetchScript })(Form);
