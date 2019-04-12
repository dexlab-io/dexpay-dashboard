import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import LogInForm from './components/LogInForm';

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      jwt
      user {
        id
        email
        profile {
          fullName
        }
        store {
          name
          walletAddress
          currency
          acceptedTokens
        }
      }
    }
  }
`;

class LogIn extends React.Component {
  onLoginSuccess = async (cache, { data: { login } }) => {
    // console.log('onLoginSuccess', login);
    const { jwt } = login;
    // store token in local storage
    await window.localStorage.setItem('token', jwt);

    // redirect to dashboard
    setTimeout(() => {
      window.location.replace('/dashboard');
    }, 1000);
  };

  render() {
    return (
      <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">Welcome to Dexpay
              </h3>
            </div>
            <Mutation
              mutation={loginMutation}
              update={this.onLoginSuccess}
              onError={(error) => {
                    swal(
                      'Issue!',
                      error.message.replace('GraphQL error: ', ''),
                      'warning',
                    );
                  }}
            >
              {login => (
                <LogInForm
                  onSubmit={data =>
                    // console.log('login form', data);
                      login({
                      variables: data,
                    })
                  }
                />
                  )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
