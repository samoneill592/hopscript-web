/**
 * The purpose of this file is to define Redux Actions that allow an Agent to:
 * manually add Leads and assign the Leads a type and a group.
 * Loading and Error states are handled for UX purposes
 */

import Parse from 'parse';
import { browserHistory } from 'react-router';

import {
  LEADS_ADD_ERROR,
  LEADS_ADD_CLEAR_ERROR,
  LEADS_ADD_LOADING,
  LEADS_ADD_LOAD_END
} from './LeadsAddTypes';

import { UPDATE_USER, CLEAR_USER } from '../UserTypes';

function _leadsAddError(error) {
  return {
    type: LEADS_ADD_ERROR,
    payload: error
  };
}

function _clearError() {
  return {
    type: LEADS_ADD_CLEAR_ERROR
  };
}

function _leadsAddLoading() {
  return {
    type: LEADS_ADD_LOADING
  };
}

function _leadsAddLoadEnd() {
  return {
    type: LEADS_ADD_LOAD_END
  };
}

/**
 * As an agent, I want to manually create a lead.

 A 'Lead' is created in the database. Eventually, the leadType and leadGroup will become pointers.
 Loading and Errors are handled for UX

 * @param  {string} data.name full name of Lead
 * @param  {string} data.phoneNumber phone number of Lead
 * @param  {string} data.leadType type of lead
 * @param  {string} data.leadGroup group that the lead is in
 */

function _createNewLead({
  name, phoneNumber, leadType, leadGroup
}) {
  return new Promise((resolve) => {
    const Lead = Parse.Object.Extend('Lead');
    const newLead = new Lead();

    newLead.set('name', name);
    newLead.set('phoneNumber', phoneNumber);
    newLead.set('leadType', leadType);
    newLead.set('leadGroup', leadGroup);
    resolve(newLead.save());
  });
}

export const createLead = data => (dispatch) => {
  dispatch(leadLoading());
  _createNewLead(data)
    .then(() => {
      browserHistory.push('/dashboard');
    })
    .catch(err => dispatch({ type: LEAD_CREATE_ERROR, payload: err }));
};

export const clearError = () => (dispatch) => {
  dispatch(_clearError());
};
