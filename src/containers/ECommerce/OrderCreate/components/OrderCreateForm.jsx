import React from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import CurrencyUsdIcon from 'mdi-react/CurrencyUsdIcon';

import renderSelectField from '../../../../shared/components/form/Select';

const currencies = [
  { value: 'EUR', label: 'Euro', },
  { value: 'USD', label: 'United States Dollar' },
  { value: 'JPY', label: 'Japanese Yen',},
  { value: 'GBP', label: 'Pound sterling'},
  { value: 'AUD', label: 'Australian dollar'},
  { value: 'CAD', label: 'Canadian dollar'},
  { value: 'CHF', label: 'Swiss franc'},
  { value: 'CNY', label: 'Renminbi'}
]

const OrderCreateForm = ({ handleSubmit, reset }) => (
  <form className="form product-edit" onSubmit={handleSubmit}>
    <div className="form__half">
      <div className="form__form-group-price-discount">
        <div className="form__form-group form__form-group-price">
          <span className="form__form-group-label">Amount</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <CurrencyUsdIcon />
            </div>
            <Field
              name="amount"
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
            component={renderSelectField}
            type="text"
            options={currencies}
            />
          </div>
        </div>
      </div>
    </div>
    <ButtonToolbar className="form__button-toolbar">
      <Button color="primary" type="submit">Create</Button>
      <Button type="button" onClick={reset}>Cancel</Button>
    </ButtonToolbar>
  </form>
);

OrderCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'order_create_form', // a unique identifier for this form
})(OrderCreateForm);
