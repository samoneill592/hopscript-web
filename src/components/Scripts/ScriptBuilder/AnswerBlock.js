import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { Edit } from 'react-feather';
import { Colors, BorderRadius } from '../../../config/styles';
import {
  InputTextArea,
  InputDropDown,
  LoaderOrThis,
  Button,
  TrashIcon,
  PlusIcon
} from '../../common';
import { addAnswersToQuestion, setCurrentAnswer } from './ScriptBuilderActions';
import UpdateAnswerForm from './UpdateAnswerForm';

const AnswerDisplay = ({ answer, removeAnswer, handleAnswer }) => (
  <div>
    <div className="flex mt4 mb2">
      <div className="w-10">
        <div className="h2 w2 bg-brand-green white br-100 flex justify-center items-center" />
      </div>
      <div className="w-10">Answer</div>
      <div className="w-60">
        <div className="block-textarea">
          {answer && answer.attributes.body}
        </div>
      </div>
      <div className="w-20 flex items-end flex-column">
        <div
          className="bg-light-gray flex items-center justify-center pa2 w3 h3 ml2 pointer"
          style={{ borderRadius: BorderRadius.all }}
          onClick={() => removeAnswer(answer.id)}
          role="button"
          >
          <TrashIcon color={Colors.silver} width="1rem" height="1rem" />
        </div>
      </div>
    </div>
    <div className="flex items-center">
      <div className="w-10">
        <div className="h2 w2 bg-brand-white br-100 flex" />
      </div>
      <div className="w-10">Route to</div>
      <div className="w-60">
        {(answer && answer.attributes.route) ? answer.attributes.route.attributes.body : 'NA'}
      </div>
      <div className="w-20 flex items-end flex-column">
        <div
          className="bg-light-gray flex items-center justify-center pa2 w3 h3 ml2 pointer bn"
          role="button"
          style={{ borderRadius: BorderRadius.all }}
          onClick={() => handleAnswer(answer)}
          >
          <Edit color={Colors.brandGreen} size={16} />
        </div>
      </div>
    </div>
  </div>);

class AnswerBlockEditable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSetCurrentAnswer = this.handleSetCurrentAnswer.bind(this);
  }
  handleClick() {
    this.setState({ edit: !this.state.edit });
  }

  handleSetCurrentAnswer(answer) {
    this.props.setCurrentAnswer(answer);
    this.handleClick();
  }

  render() {
    const {
      answer,
      removeAnswer,
      questions
    } = this.props;
    return (
      <div>
        {!this.state.edit
          ?
            <AnswerDisplay
              answer={answer}
              handleAnswer={this.handleSetCurrentAnswer}
              removeAnswer={removeAnswer}
          />
          :
            <UpdateAnswerForm
              answer={answer}
              questions={questions}
              onClick={() => {
              this.setState({ edit: !this.state.edit });
            }}
              toggleForm={() => {
              this.setState({ edit: !this.state.edit });
            }}
          />
        }
      </div>
    );
  }
}

export default connect(null, { setCurrentAnswer })(AnswerBlockEditable);
