import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors } from '../../../config/styles';
import { HSButton, CardRight } from '../../common';
import { startCall, fetchAndSetToken } from '../CallActions';

class NextCallView extends Component {
  constructor(props) {
    super(props);
    this.handleNextCall = this.handleNextCall.bind(this);
  }

  handleNextCall(e) {
    e.preventDefault();
    this.props.fetchAndSetToken()
      .then(() => {
        this.props.startCall({
          lead: { id: this.props.leadGroup.attributes.leads[this.props.leadGroupIndex].id },
          leadGroup: this.props.leadGroupDetails.leadGroup,
          script: this.props.leadGroupDetails.script,
          title: this.props.leadGroupDetails.title
        });
      });
  }

  render() {
    return (
      <CardRight>
        {this.props.leadGroup &&
          <div>
            <div className="f3 tc mt4">start next call with</div>
            <div className="f1 tc mt4">{this.props.leadGroup.attributes.leads[this.props.leadGroupIndex].attributes.name || 'biff baff'}</div>
          </div>}
        <HSButton
          classOverrides="items-center mt4 mb4"
          backgroundColor={Colors.brandGreen}
          onClick={e => this.handleNextCall(e)}>
          Start Call
        </HSButton>
      </CardRight>
    );
  }
}

const mapStateToProps = ({ CallReducer }) => {
  const {
    leadGroup, leadGroupIndex, currentCall, leadGroupDetails
  } = CallReducer;
  return {
    leadGroup,
    leadGroupIndex,
    currentCall,
    leadGroupDetails
  };
};

export default connect(mapStateToProps, { startCall, fetchAndSetToken })(NextCallView);
