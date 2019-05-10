import React from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Loading from '../../../../shared/components/Loading';
import renderSelectField from '../../../../shared/components/form/Select';

const OrderEditForm = ({ handleSubmit, history, submitting }) => (
  <form className="form product-edit" onSubmit={handleSubmit}>
    <div className="form__half">
      <div className="form__form-group">
        <span className="form__form-group-label">Fiat Currency</span>
        <div className="form__form-group-field">
          <Field
            name="fiatCurrency"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div className="form__form-group-price-discount">
        <div className="form__form-group form__form-group-price">
          <span className="form__form-group-label">Fiat Amount</span>
          <div className="form__form-group-field">
            <Field
              name="fiatAmount"
              component="input"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Crypto Type</span>
        <div className="form__form-group-field">
          <Field
            name="assetUsed"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div className="form__form-group-price-discount">
        <div className="form__form-group form__form-group-price">
          <span className="form__form-group-label">Crypto Amount</span>
          <div className="form__form-group-field">
            <Field
              name="cryptoAmount"
              component="input"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="form form--horizontal">
        <div className="form__form-group">
          <span className="form__form-group-label">Status</span>
          <div className="form__form-group-field">
            <Field
              name="status"
              component={renderSelectField}
              type="text"
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'paid', label: 'Paid' },
                { value: 'failed', label: 'Failed' }
              ]}
              />
          </div>
        </div>
      </div>
    </div>
    <div className="form__half">
    </div>
    <ButtonToolbar className="form__button-toolbar">
      <Button color="primary" type="submit" disabled={submitting}>Save</Button>
      <Button type="button" onClick={() => history.push('/store/products')}>Cancel</Button>
    </ButtonToolbar>
    {submitting && <Loading color="#646777" />}
  </form>
);

OrderEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const OrderEditFormRedux =  reduxForm({
  form: 'order_edit_form', // a unique identifier for this form
})(OrderEditForm);

export default withRouter(OrderEditFormRedux);
