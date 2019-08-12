import React from 'react';
import { Container } from 'react-bootstrap'
import NavigationBar from './components/navigation/navigationBar'
import People from './components/people/People'
import Checkins from './components/checkins/Checkins'
import Person from './components/people/Person'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Container>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/checkins" component={Checkins} />
          <Route exact path="/people" component={People} />
          <Route path="/people/:person_id" component={Person} />


        </Switch>
      </Container>
    </BrowserRouter>

  );
}

export default App;
