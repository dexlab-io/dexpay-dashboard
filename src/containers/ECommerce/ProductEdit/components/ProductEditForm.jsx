import React from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Loading from '../../../../shared/components/Loading';
import renderSelectField from '../../../../shared/components/form/Select';

const ProductEditForm = ({ handleSubmit, submitting, history }) => (
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
        <span className="form__form-group-label">Full description <small>(optional)</small></span>
        <div className="form__form-group-field">
          <Field
            name="details"
            component="textarea"
            type="text"
          />
        </div>
      </div>

      <div className="form__form-group-price-discount">
        <div className="form__form-group form__form-group-price">
          <span className="form__form-group-label">Price</span>
          <div className="form__form-group-field">
            <Field
              name="price"
              component="input"
              type="number"
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
      <Button color="primary" type="submit" disabled={submitting}>Save</Button>
      <Button type="button" onClick={() => history.push('/store/products')}>Cancel</Button>
    </ButtonToolbar>
    {submitting && <Loading color="#646777" />}
  </form>
);

ProductEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const ProductEditFormRedux = reduxForm({
  form: 'product_edit_form', // a unique identifier for this form
})(ProductEditForm);

export default withRouter(ProductEditFormRedux);
