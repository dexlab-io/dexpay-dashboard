import React from 'react';
import { Container, Row } from 'reactstrap';
import ProfileTabs from './components/ProfileTabs';

const Calendar = () => (
  <Container>
    <div className="profile">
      <Row>
        <ProfileTabs />
      </Row>
    </div>
  </Container>
);

export default Calendar;
