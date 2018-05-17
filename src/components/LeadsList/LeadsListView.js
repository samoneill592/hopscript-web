import React from 'react';
import { browserHistory } from 'react-router';
import { FullScreenContainer, CenterThis, Button } from '../common';
import { LeadsList } from './';
import { Colors } from '../../config/styles';

const LeadsListView = () => (
  <FullScreenContainer>
    <CenterThis>
      <LeadsList />
    </CenterThis>
    <div className="pa3 tc">
      <Button
        backgroundColor={Colors.black}
        onClick={() => browserHistory.push('/add-leads')}
      >
        Add Leads
      </Button>
    </div>
    <div className="pa3">
      <Button
        backgroundColor={Colors.black}
        onClick={() => browserHistory.push('/dashboard')}
      >
        Back to dashboard
      </Button>
    </div>
  </FullScreenContainer>
);

export default LeadsListView;
