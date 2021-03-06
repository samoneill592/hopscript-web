import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CardRight,
  CenterThis,
  Button,
  ModalCard
} from '../common';
import { Colors } from '../../config/styles';
import { deleteBrokerProfile } from './BrokerProfileActions';
import { BrokerProfileForm } from './';
import { logOutUser } from '../Auth/AuthActions';


class BrokerDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.deleteBrokerProfile = this.deleteBrokerProfile.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  deleteBrokerProfile() {
    this.props.deleteBrokerProfile();
  }

  handleSignOut() {
    this.props.logOutUser();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { showModal } = this.state;
    const { loading } = this.props;
    return (
      <CardRight loading={loading}>
        <div className="w-100 flex justify-between bb b--light-gray bw2 pa3 items-center">
          <div className="b brand-near-black f4">Broker Account</div>
          <Button backgroundColor={Colors.brandGreen} onClick={this.handleSignOut} buttonPadding="pa2 pr4 pl4" classOverrides="f5">Logout</Button>
        </div>

        <div className="ph3 pt4 pb3">
          <CenterThis>
            <div className="w-50 mt5 mb4">
              <BrokerProfileForm />
            </div>
          </CenterThis>
          <CenterThis>
            <div className="w-50 mb1">
              <Button
                classOverrides="w-100 f5"
                backgroundColor={Colors.white}
                fontColor="silver"
                borderRadius="10px"
                borderColor="silver"
                borderWidth="1px"
                onClick={() => this.toggleModal()}>
           Permanently Delete Account
              </Button>
            </div>
          </CenterThis>

          {showModal && (
          <ModalCard header="Delete Account" onClick={this.toggleModal}>
            <div className="pa4 pl5 pr5 ">
              <div className="mb4">
              Are you sure you want to delete your account? This action
              cannot be undone.
              </div>
              <Button
                onClick={() => this.toggleModal()}
                classOverrides="w-100 mb3"
                fontColor="silver"
                borderRadius="10px"
                borderColor="silver"
                borderWidth="1px">
                  Cancel
              </Button>
              <Button
                borderWidth="1px"
                borderColor="brand-red"
                borderRadius="10px"
                backgroundColor="white"
                fontColor="brandRed"
                classOverrides="w-100"
                onClick={this.deleteBrokerProfile}>
                  Permanently Delete Account
              </Button>
            </div>
          </ModalCard>)}
        </div>
      </CardRight>
    );
  }
}

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;
  return { user };
};

export default connect(mapStateToProps, {
  deleteBrokerProfile,
  logOutUser
})(BrokerDetailView);
