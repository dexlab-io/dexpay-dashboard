import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import RegisterForm from './components/RegisterForm';

const registerMutation = gql`
  mutation register($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      jwt
      user {
        id
        email
        profile {
          fullName
        }
      }
    }
  }
`;

class Register extends React.Component {
  onRegisterSuccess = async (cache, { data: { register } }) => {
    // console.log('onRegisterSuccess', register);
    // store token in local storage
    await window.localStorage.setItem('token', register.jwt);
    window.location.replace('/dashboard');
  };

  render() {
    return (
      <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">
                Welcome to Dexpay
              </h3>
              <h4 className="account__subhead subhead">Create an account</h4>
            </div>
            <Mutation
              mutation={registerMutation}
              update={this.onRegisterSuccess}
              onError={(error) => {
                swal(
                  'Issue!',
                  error.message.replace('GraphQL error: ', ''),
                  'warning',
                );
              }}
            >
              {register => (
                <RegisterForm
                  onSubmit={data =>
                    // console.log('login form', data);
                    register({
                      variables: data,
                    })
                  }
                />
                      )}
            </Mutation>
            <div className="account__have-account">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
