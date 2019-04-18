import React from 'react';
import { Container, Row } from 'reactstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ProfileTabs from './components/ProfileTabs';
import Loading from '../../../shared/components/Loading';

const query = gql`
  {
    me {
      id
      email
      profile {
        fullName
      }
      store {
        name
        taxNumber
        websiteUrl
        walletAddress
        currency
        featuredImage
      }
    }
  }
`;

const Calendar = () => (
  <Container>
    <div className="profile">
      <Row>
        <Query query={query} fetchPolicy="cache-and-network">
          {({ data, loading, error }) => {
            if (loading && !data.me) return <Loading />;
            if (error) return <p>Error: {error.message}</p>;
            // console.log('me', data.me);

            return (<ProfileTabs user={data.me} />);
          }}
        </Query>
      </Row>
    </div>
  </Container>
);

export default Calendar;
