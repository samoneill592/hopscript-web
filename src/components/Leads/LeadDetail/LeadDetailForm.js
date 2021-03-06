import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Colors } from '../../../config/styles';
import { InputTextEditable, InputDropDownEditable } from '../../common';
import normalizePhone from '../../helpers/normalize';
import { updateLead } from '../LeadsActions';


class LeadDetailForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    const { lead } = this.props;
    this.props.updateLead(data, lead.id);
  }


  render() {
    const { handleSubmit, lead } = this.props;
    return (
      <div>
        <form className="mv4" >

          <div className="flex flex-row w-100">
            <div className="w-30 mt2 mb2 pt3 pb3 b">Lead Name</div>
            <InputTextEditable
              name="name"
              type="text"
              borderColor={Colors.moonGray}
              placeholder={lead && lead.get('name')}
              onSubmit={handleSubmit(this.handleFormSubmit)} />
          </div>

          <div className="flex flex-row w-100">
            <div className="w-30 mt2 mb2 pt3 pb3 b">Phone</div>
            <InputTextEditable
              name="phone"
              type="text"
              borderColor={Colors.moonGray}
              placeholder={lead && lead.get('phone')}
              normalize={normalizePhone}
              onSubmit={handleSubmit(this.handleFormSubmit)} />
          </div>

          <div className="flex flex-row w-100">
            <div className="w-30 mt2 mb2 pt3 pb3 b">Email</div>
            <InputTextEditable
              name="email"
              type="text"
              borderColor={Colors.moonGray}
              placeholder={lead && lead.get('email')}
              onSubmit={handleSubmit(this.handleFormSubmit)} />
          </div>

          <div className="flex flex-row w-100 items-center">
            <div className="w-30 mt2 mb2 pt3 pb3 b">Lead Type</div>
            <div className="w-100 pa2">
              <InputDropDownEditable
                name="leadType"
                type="dropdown"
                placeholder={lead && lead.get('leadType')}
                options={['New Lead', 'Qualify', 'Nurture', 'Appointment', 'Active', 'Pending', 'Closed', 'SOI', 'Archive', 'Watch', 'Trash']}
                borderColor="lightGray"
                onSubmit={handleSubmit(this.handleFormSubmit)}
                />
            </div>

          </div>
        </form>
      </div>
    );
  }
}


export default reduxForm({
  form: 'LeadDetailForm'
})(connect(null, {
  updateLead,
})(LeadDetailForm));
