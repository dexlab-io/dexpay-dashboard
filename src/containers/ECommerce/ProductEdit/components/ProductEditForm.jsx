import React from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import CurrencyUsdIcon from 'mdi-react/CurrencyUsdIcon';
import renderSelectField from '../../../../shared/components/form/Select';

const ProductEditForm = ({ handleSubmit, reset }) => (
  <form className="form product-edit" onSubmit={handleSubmit}>
    <div className="form__half">
      <div className="form__form-group">
        <span className="form__form-group-label">Title</span>
        <div className="form__form-group-field">
          <Field
            name="title"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Full description</span>
        <div className="form__form-group-field">
          <Field
            name="details"
            component="textarea"
            type="text"
          />
        </div>
      </div>

      <div className="card__title">
        <h5 className="bold-text">Pricing</h5>
      </div>
      <div className="form__form-group-price-discount">
        <div className="form__form-group form__form-group-price">
          <span className="form__form-group-label">Price</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <CurrencyUsdIcon />
            </div>
            <Field
              name="price"
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
              options={[{ value: 'active', label: 'Active' }, { value: 'notActive', label: 'Not Active' }]}
              />
          </div>
        </div>
      </div>
    </div>
    <div className="form__half">
    </div>
    <ButtonToolbar className="form__button-toolbar">
      <Button color="primary" type="submit">Save</Button>
      <Button type="button" onClick={reset}>Cancel</Button>
    </ButtonToolbar>
  </form>
);

ProductEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'product_edit_form', // a unique identifier for this form
})(ProductEditForm);
