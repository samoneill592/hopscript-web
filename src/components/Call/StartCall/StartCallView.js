/**
 * The purpose of this file is to provide UI wrapping around CallForm
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  RenderAlert,
  HalfGrid,
  HSButton,
  CardRight,
  HSCardHeader,
  LoaderOrThis
} from '../../common';
import { SelectGroup, SelectLead, SelectScript, CallTitle } from './';
import { fetchLeads, fetchLeadGroups } from '../../Leads/LeadsActions';
import { fetchScripts } from '../../Scripts/ScriptsList/ScriptsListActions';
import { startCall, startLeadGroupCalls } from '../CallActions';

class StartCallView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedGroup: true, lead: null };
    this.props.fetchLeads();
    this.props.fetchScripts();
    this.props.fetchLeadGroups();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(d) {
    if (d.lead) {
      this.props.startCall(d);
    } else if (d.leadGroup) {
      this.props.startLeadGroupCalls(d);
    }
  }

  render() {
    const {
      handleSubmit,
      leads,
      scripts,
      loading,
      leadGroups,
      error,
      change
    } = this.props;
    return (
      <CardRight>
        <LoaderOrThis loading={loading}>
          <HSCardHeader>Start a Call</HSCardHeader>
          <div className="pa3 mt4">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <HalfGrid classOverrides="pr3">
                <SelectGroup
                  leadGroups={leadGroups}
                  selectedGroup={this.state.selectedGroup}
                  onClick={() => { this.setState({ selectedGroup: true, lead: null }); change('lead', null); }}
                  classOverrides={!this.state.selectedGroup ? 'moon-gray' : 'brand-near-black'} />
                <SelectLead
                  leads={leads}
                  selectedGroup={!this.state.selectedGroup}
                  leadLoaded={this.state.lead}
                  onClick={() => { this.setState({ selectedGroup: false }); change('leadGroup', null); }}
                  selectLead={(lead) => { change('lead', lead); this.setState({ lead }); }}
                  removeLead={() => { change('lead', null); this.setState({ lead: null }); }}
                  classOverrides={this.state.selectedGroup ? 'moon-gray' : 'brand-near-black'} />
              </HalfGrid>
              <HalfGrid classOverrides="pl3 mb4">
                {scripts.length > 0 && <SelectScript scripts={scripts} />}
                <CallTitle />
              </HalfGrid>
              {error
                ?
                  <HSButton onClick={(e) => { e.preventDefault(); this.setState({ showError: true }); }}>Start Call</HSButton>
                :
                  <HSButton>Start Call</HSButton>
              }
              {this.state.showError && error &&
                <div className="pa2">
                  <RenderAlert error={{ message: error }} />
                </div>
              }
            </form>
          </div>
        </LoaderOrThis>
      </CardRight>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.leadGroup && !values.lead) {
    errors._error = 'All fields are required';
  } else if (!values.title || !values.script) {
    errors._error = 'All fields are required';
  }
  console.log('errors', errors);
  return errors;
}

const mapStateToProps = ({ LeadsReducer, ScriptsListReducer, CallReducer }) => {
  const { leads, leadGroups } = LeadsReducer;
  const { scripts } = ScriptsListReducer;
  const { loading } = CallReducer;
  return {
    leads,
    scripts,
    loading,
    leadGroups
  };
};

export default reduxForm({
  form: 'callForm',
  validate
})(connect(mapStateToProps, {
  fetchLeads, fetchScripts, startCall, fetchLeadGroups, startLeadGroupCalls
})(StartCallView));
