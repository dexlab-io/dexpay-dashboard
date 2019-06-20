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

class JwtLogIn extends React.Component {
  componentDidMount() {
    const { token } = this.props.match.params;
    this.handleLogin(token);
  }

  handleLogin = async (jwt) => {
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
              <h3 className="account__title">
                Logging you in...
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JwtLogIn;
