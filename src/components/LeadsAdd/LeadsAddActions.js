/**
 * The purpose of this file is to define Redux Actions that allow an Agent to:
 * Manually add Leads and assign the Leads a type and a group
 * Batch import leads from a csv file to our Parse database
 *
 * Loading and Error states are handled for UX purposes
 */

import Parse from 'parse';
import Papa from 'papaparse';

import {
  LEADS_ADD_ERROR,
  LEADS_ADD_CLEAR_ERROR,
  LEADS_ADD_LOADING,
  LEADS_ADD_LOAD_END,
  LEAD_SET_CURRENT
} from './LeadsAddTypes';
import parsePhone from '../helpers/parsePhone';
import { fetchUser } from '../UserActions';
import { browserHistory } from 'react-router';

function _leadsAddError(error) {
  return {
    type: LEADS_ADD_ERROR,
    payload: error
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
function _clearError() {
  return {
    type: LEADS_ADD_CLEAR_ERROR
  };
}

const clearError = () => (dispatch) => {
  dispatch(_clearError());
};

const leadsAddError = err => (dispatch) => {
  dispatch(_leadsAddError(err));
};

/**
 * A CSV file is parsed into javascript objects using papaparse
 * docs: https://www.papaparse.com/docs
 * download is set to true, so as to handle local files
 * header is set to true, so as to format the returned objects with the keys set in the CSV's first line
 * delimiter is set to ',' to identify the next data block in CSV format
 * A formatting error is thrown if the first result does not comply to our header format of name and phone
 * @param  {object} lead object containing name and phone
 */
function _parseCSV(data) {
  return new Promise((resolve) => {
    Papa.parse(data, {
      download: true,
      header: true,
      delimiter: ',',
      complete: (results) => {
        if (!results.data[0].name || !results.data[0].phone) {
          resolve(_leadsAddError({
            message:
                'It looks like the leads you uploaded were incorrectly formatted. Please use the Swift Script template as a guide to format your leads or upload leads individually'
          }));
        }
        const formattedData = results.data.map((lead) => {
          const formattedPhone = parsePhone(lead.phone);
          return {
            ...lead,
            phone: formattedPhone
          };
        });
        resolve(formattedData);
      }
    });
  });
}

/**
 * A Lead Parse Object is instantiated
 * the lead's name and phone are set on the Lead object
 * the current Agent is set to the Lead object as a Pointer
 * the Lead is saved
 * @param  {object} lead object containing name and phone
 */
function _reconcileLeadToDB({
  name, phone, leadType, leadGroup
}) {
  return new Promise((resolve) => {
    const Agent = Parse.User.current();
    const Lead = Parse.Object.extend('Lead');
    const LObj = new Lead();
    const formattedPhone = `+1${phone}`;
    LObj.set('name', name);
    LObj.set('phone', formattedPhone);
    if (leadType) {
      LObj.set('leadType', leadType);
    }
    if (leadGroup) {
      LObj.set('leadGroup', leadGroup);
    }
    LObj.set('agent', Agent);
    resolve(LObj.save());
  });
}

/**
 * A Lead Parse object is added to the current user's leads array as a Pointer
 * @param  {object} lead Lead Parse object
 */
function _reconcileLeadToAgent(lead) {
  return new Promise((resolve) => {
    const Agent = Parse.User.current();
    Agent.add('leads', lead);
    resolve(Agent.save());
  });
}

/**
 * A lead object is sent to _reconcileLeadToDB, which creates a Lead Parse object with the data provided and current Agent
 * the newly created Lead Parse object is sent to _reconcileLeadToAgent, which adds the Lead to the Agent as a Pointer
 * @param  {object} lead lead object containing name and phone number
 */
function _createAndReconcileLead(lead) {
  return new Promise((resolve) => {
    _reconcileLeadToDB(lead)
      .then((lObj) => {
        resolve(_reconcileLeadToAgent(lObj));
      })
      .catch((err) => {
        console.log('_reconcileLeadToDB ERR:', err);
      });
  });
}
/**
 * As an agent, I want to batch import leads via a csv file
 * First, The csv file is parsed to json with papaparse
 * Then, the eads parsed from the csv file are used to generate Lead objects in the db
 * Those Lead objects are then added to an Agent's leads pointer array
 * Finally, we fetch the updated user and rehydrate our redux store
 *
 * results.map creates an array of promises
 * promise.all will wait on all those promises to resolve before moving on
 * @param  {string} data csv file
 */

const parseCSV = data => (dispatch) => {
  dispatch(_leadsAddLoading());
  _parseCSV(data)
    .then((results) => {
      Promise.all(results.map(lead => _createAndReconcileLead(lead)))
        .then(() => {
          dispatch(fetchUser());
          dispatch(_leadsAddLoadEnd());
        })
        .catch((err) => {
          dispatch(leadsAddError(err));
        });
    })
    .catch(() => {
      dispatch(_leadsAddError({
        message:
            'File format is incorrect. Please use a .csv file or create leads individually'
      }));
    });
};

/**
 * As an agent, I want to manually create a lead.
 * First, a 'Lead' is created in the database. The current `Agent` is added to the `Lead` as a `Pointer`
 * Then, the `Lead` is added to the current `Agent`'s `leads` array as a `Pointer`
 Loading and Errors are handled for UX
 * @param  {string} data lead object
 */

const createLead = data => (dispatch) => {
  dispatch(_leadsAddLoading());
  _createAndReconcileLead(data)
    .then(() => {
      dispatch(_leadsAddLoadEnd());
      browserHistory.push('/list-leads');
    })
    .catch(err => dispatch({ type: LEADS_ADD_ERROR, payload: err }));
};

function _setCurrentLead(lead) {
  return {
    type: LEAD_SET_CURRENT,
    payload: lead
  };
}

const fetchLead = id => (dispatch) => {
  dispatch(_leadsAddLoading());
  const Lead = Parse.Object.extend('Lead');
  const query = new Parse.Query(Lead);
  query
    .get(id)
    .then((lead) => {
      dispatch(_leadsAddLoadEnd());
      dispatch(_setCurrentLead(lead));
    })
    .catch((err) => {
      dispatch(_leadsAddError(err));
    });
};

export { parseCSV, clearError, createLead, fetchLead };
