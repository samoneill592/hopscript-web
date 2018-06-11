import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { PlusCircle } from 'react-feather';
import { InputDropDownEditable } from '../../common';
import { Colors } from '../../../config/styles';
import { fetchLeadGroups } from '../LeadGroupList/LeadGroupListActions';
import { fetchLead } from '../LeadsAdd/LeadsAddActions';
import { updateLead, removeGroupFromLead } from './LeadDetailActions';
import { LeadGroupListItem } from '../LeadGroupList';


class LeadGroupForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRemoveLeadGroup = this.handleRemoveLeadGroup.bind(this);
  }

  handleFormSubmit(data) {
    const { lead } = this.props;
    this.props.updateLead(data.leadGroup, lead.id);
  }

  handleRemoveLeadGroup(data) {
    const { lead } = this.props;
    this.props.removeGroupFromLead(data, lead.id);
  }

  componentWillMount() {
    this.props.fetchLeadGroups();
  }

  render() {
    const {
      handleSubmit, handleRemoveLeadGroup, lead, leadGroups
    } = this.props;
    const existingLeadGroups = lead && lead.get('leadGroups');
    // TODO booboo butter, get this sucker into the constructor

    const leadGroupOptions = leadGroups.map((group) => {
      group = {
        value: group.id,
        id: group.id,
        display: group.attributes.groupName
      };
      return group;
    });

    return (
      <div>
        <div className="b mb4">Lead Groups</div>
        <div className="ba pa2" style={{ borderColor: Colors.lightGray, borderRadius: '4px' }}>
          {leadGroups && (
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div className="flex flex-row w-100 items-center">
                <div className="w-100 pv2 ph3 mr1">
                  <InputDropDownEditable
                    name="leadGroup"
                    type="dropdown"
                    editButtonName={<PlusCircle />}
                    saveButtonName="Add"
                    options={leadGroupOptions}
                    placeholder="Add to New Group"
                    onSubmit={handleSubmit(this.handleFormSubmit)}
                    borderColor="lightGray" />
                </div>
              </div>
            </form>
          )}
          <div>
            {existingLeadGroups &&
          existingLeadGroups.map(group => (
            <LeadGroupListItem leadGroup={group} key={group.id} onClick={() => this.handleRemoveLeadGroup(group.id)} />
          ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ LeadGroupListReducer }) => {
  const { leadGroups } = LeadGroupListReducer;
  return {
    leadGroups
  };
};

export default reduxForm({
  form: 'LeadGroupForm'
})(connect(mapStateToProps, {
  fetchLeadGroups,
  fetchLead,
  updateLead,
  removeGroupFromLead
})(LeadGroupForm));
