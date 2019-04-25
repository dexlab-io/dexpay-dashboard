import React from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Loading from '../../../../shared/components/Loading';

const ProfileSettings = ({ handleSubmit, reset, submitting }) => (
  <form className="form product-edit" onSubmit={handleSubmit}>
    <div className="form__half">
      <div className="form__form-group">
        <span className="form__form-group-label">Full Name</span>
        <div className="form__form-group-field">
          <Field
            name="fullName"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Store Name</span>
        <div className="form__form-group-field">
          <Field
            name="name"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Tax Number</span>
        <div className="form__form-group-field">
          <Field
            name="taxNumber"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Website Url</span>
        <div className="form__form-group-field">
          <Field
            name="websiteUrl"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Wallet Address</span>
        <div className="form__form-group-field">
          <Field
            name="walletAddress"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Currency</span>
        <div className="form__form-group-field">
          <Field
            name="currency"
            component="input"
            type="text"
          />
        </div>
      </div>
    </div>
    <div className="form__half">
    </div>
    <ButtonToolbar className="form__button-toolbar">
      <Button color="primary" type="submit" disabled={submitting}>Save</Button>
      <Button type="button" onClick={reset}>Cancel</Button>
    </ButtonToolbar>
    {submitting && <Loading color="#646777" />}
  </form>
);

ProfileSettings.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'profile_settings_form', // a unique identifier for this form
})(ProfileSettings);
