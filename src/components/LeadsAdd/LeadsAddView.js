/**
 * The purpose of this file is to provide UI wrapping around LeadsAddForm
 */

import React from 'react';
import { browserHistory } from 'react-router';
import { FullScreenContainer, CenterThis, Button, SideBar } from '../common';
import { LeadsAddForm, LeadsCSVForm } from './';
import { Colors } from '../../config/styles';

const LeadsAddView = () => (
  <FullScreenContainer classOverrides="vh-100 bg-light-gray">
    <div className="dib mw4-ns w-10 vh-100 " style={{ position: 'fixed' }}>
      <div className="w-100" >
        <SideBar />
      </div>
    </div>
    <div className="w-90 absolute right-0">
      <CenterThis>
        <div className="w-90 mt3 mb1 pa3 f4" style={{ backgroundColor: Colors.white }} >
          <div className="b pa2">Add New Lead</div>
        </div>
      </CenterThis>

      <CenterThis>
        <div className="w-90 flex flex-row justify-around" style={{ backgroundColor: Colors.white }} >
          <div className="w-40 mt6 "><LeadsCSVForm /></div>
          <div className="w-40 mt6 mb5">  <LeadsAddForm /></div>
        </div>
      </CenterThis>

    </div>
  </FullScreenContainer>
);

export default LeadsAddView;

/*
<CenterThis>
  <LeadsAddForm />
  <LeadsCSVForm />
</CenterThis>
<div className="pa3">
  <Button
    backgroundColor={Colors.black}
    onClick={() => browserHistory.push('/dashboard')}
  >
    Back to dashboard
  </Button>
</div>
*/
