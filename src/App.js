import React from 'react';
import NavigationBar from './components/navigation/navigationBar'
import People from './components/people/People'
import FinancialReportsPage from './components/money/reports/FinancialReportsPage'
import Checkins from './components/checkins/Checkins'
import Person from './components/people/Person'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import {AppShell, MantineProvider} from '@mantine/core'
import ExpensesPage from './components/money/ExpensesPage';
import DonationsPage from './components/money/DonationsPage';

function App() {
  return (
    <BrowserRouter>
		<MantineProvider >
			<AppShell
				padding="md"
				navbar={<NavigationBar />}
				styles={(theme) => ({
				main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
				})}
			>
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/checkins" component={Checkins} />
					<Route exact path="/people" component={People} />
					<Route exact path="/donations" component={DonationsPage} />
					<Route exact path="/expenses" component={ExpensesPage} />
					<Route exact path="/reports" component={FinancialReportsPage} />
					<Route path="/people/:person_id" component={Person} />
				</Switch>
			</AppShell>
		</MantineProvider>			
		
		</BrowserRouter>

  );
}

export default App;
