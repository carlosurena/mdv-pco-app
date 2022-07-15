import React, { useEffect, useState, createContext, useContext } from 'react';
import NavigationBar from './components/navigation/navigationBar'
// import People from './components/people/People'
import FinancialReportsPage from './components/money/reports/FinancialReportsPage'
// import Checkins from './components/checkins/Checkins'
import Person from './components/people/Person'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// import Dashboard from './components/dashboard/Dashboard'
import {AppShell, MantineProvider} from '@mantine/core'
import ExpensesPage from './components/money/ExpensesPage';
import DonationsPage from './components/money/DonationsPage';
import { checkCookie, deleteCookie } from './utils/cookieUtils';
import { getCurrentUserData, getOauthRedirectURL, getAuthToken } from './pco/requests';
import { LogOutPage } from './components/auth/authStates'

function App() {
	const auth = useProvideAuth();
	useEffect(() => {

	}, [auth.user])
  return (
    <BrowserRouter>
		<ProvideAuth>
			<MantineProvider >
			{ auth.user && (auth.isAdmin ? 
				<AppShell
					padding="md"
					fixed
					navbar={<NavigationBar auth={auth}/>}
					styles={(theme) => ({
					main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
					})}
				>
					<Switch>
						<PrivateRoute exact path="/" component={DonationsPage} />
						{/* <Route exact path="/checkins" component={Checkins} /> */}
						{/* <Route exact path="/people" component={People} /> */}
						<PrivateRoute exact path="/donations" component={DonationsPage} />
						<PrivateRoute exact path="/expenses" component={ExpensesPage} />
						<PrivateRoute exact path="/reports" component={FinancialReportsPage} />
						<PrivateRoute path="/people/:person_id" component={Person} />
					</Switch>
				</AppShell> :
				<div>Hi, {auth.user.data.attributes.name}! Your Planning Center Account does not have the required privileges to access this site. Please ask an existing administrator for admin access.</div>)
			}

			<Switch>
				<Route exact path="/logout" >
					<LogOutPage auth={auth}/>
				</Route>
			</Switch>
			</MantineProvider>	
		
		</ProvideAuth>
		</BrowserRouter>

  );
}

const authContext = createContext();

function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return (
	  <authContext.Provider value={auth}>
		{children}
	  </authContext.Provider>
	);
  }

  function useAuth() {
	return useContext(authContext);
  }

  function useProvideAuth() {
	const [user, setUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false)
	useEffect(() => {
		if(window.location.pathname === '/logout'){
			if(checkCookie("jwt")){
				window.location.href = "/"
			} else {
				console.log("user logged out, " , user, isAdmin)
			}
		} else {
			if(checkCookie("jwt")){
				console.log('jwt token exists')
				getCurrentUserData().then( data =>{
					if(data) {
						//successful login
						setUser(data)
						if (data.data.attributes.site_administrator){
							setIsAdmin(true)
						}
					} else{
						//unsuccessful login.. could be expired token or ___
						signout()
					}
				})
			}else {
				console.log('jwt cookie doesnt exist, using url code to ping pco')
				const params = new URLSearchParams(window.location.search);
				const code = params.get("code")
				if(code){
					console.log('code used: ', code)
					getAuthToken(code).then( token => {
						console.log(token)
						getCurrentUserData().then( data =>{
							if (data){
								console.log('we have user data', data)
								setUser(data)
								if (data.data.attributes.site_administrator){
									setIsAdmin(true)
								}
							}else{
								console.log('code but no data(wrong code used), attempting step 1')
								signin()
							}
							
						})
					}).catch( error => {
						console.log("error retrieving access token. Code is", error)
					})
				} else {
					console.log('code doesnt exist, starting from step 1, redirecting to oauth.')
					signin()
				}
			}
		}
		
		
	}, [])

	const signin = () => {
		console.log('redirecting to pco oauth')
		window.location.href = getOauthRedirectURL();
	};
  
	const signout = cb => {

		setUser(null)
		deleteCookie('jwt')
		console.log('reloading pg')
		window.location.href = "/logout"

	};
  
	return {
	  user,
	  isAdmin,
	  signin,
	  signout
	};
  }

  
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
	let auth = useAuth();
	return (
	  <Route
		{...rest}
		render={({ location }) =>
		  auth.user ? (
			children
		  ) : (
			<Redirect
			  to={{
				pathname: "/login",
				state: { from: location }
			  }}
			/>
		  )
		}
	  />
	);
  }

export default App;
