import React, { Component } from 'react'
import { NavLink } from 'react-router-dom' 
import {Navbar, UnstyledButton, Avatar, Text, Group, Box} from '@mantine/core'
import { TrendingDown, TrendingUp, ReportAnalytics, ChevronRight} from 'tabler-icons-react'
export class NavigationBar extends Component {
  render() {
    return (
		<Navbar height={600} p="xs" width={{ base: 250 }}>
			<Navbar.Section>MDV</Navbar.Section>
			<Navbar.Section grow mt="md">
				{/* <div className="nav-link">
					<NavLink to="/">
						<UnstyledButton onClick={() => console.log('try focusing button with tab')}>
							<Group>
								<Avatar size={30} color="blue"><Home size={20}/></Avatar>
								<div>
									<Text color="blue">Dashboard</Text>
								</div>
							</Group>
						</UnstyledButton>
					</NavLink>
				</div>
				<div className="nav-link">
					<NavLink to="/checkins">
						<UnstyledButton onClick={() => console.log('try focusing button with tab')}>
							<Group>
								<Avatar size={30} color="blue"><DiscountCheck size={20}/></Avatar>
								<div>
									<Text color="blue">Check-ins</Text>
								</div>
							</Group>
						</UnstyledButton>
					</NavLink>
				</div>
				<div className="nav-link">
					<NavLink to="/people">
						<UnstyledButton onClick={() => console.log('try focusing button with tab')}>
							<Group>
								<Avatar size={30} color="blue"><Man size={20}/></Avatar>
								<div>
									<Text color="blue">People</Text>
								</div>
							</Group>
						</UnstyledButton>
					</NavLink>
				</div> */}
				<div className="nav-link">
					<NavLink to="/donations">
						<UnstyledButton onClick={() => console.log('try focusing button with tab')}>
							<Group>
								<Avatar size={30} color="blue"><TrendingUp size={20}/></Avatar>
								<div>
									<Text color="blue">Donations</Text>
								</div>
							</Group>
						</UnstyledButton>
					</NavLink>
				</div>
				<div className="nav-link">
					<NavLink to="/expenses">
						<UnstyledButton onClick={() => console.log('try focusing button with tab')}>
							<Group>
								<Avatar size={30} color="blue"><TrendingDown size={20}/></Avatar>
								<div>
									<Text color="blue">Expenses</Text>
								</div>
							</Group>
						</UnstyledButton>
					</NavLink>
				</div>
				<div className="nav-link">
					<NavLink to="/reports">
						<UnstyledButton onClick={() => console.log('try focusing button with tab')}>
							<Group>
								<Avatar size={30} color="blue"><ReportAnalytics size={20}/></Avatar>
								<div>
									<Text color="blue">Reports</Text>
								</div>
							</Group>
						</UnstyledButton>
					</NavLink>
				</div>
				
			</Navbar.Section>
			<Navbar.Section>
				<UnstyledButton className="user-btn" onClick={() => console.log('try focusing button with tab')}>
					<Group className="user-btn-hover">
						<Avatar radius="xl" color="blue" />
						<Box style={{flex: 1}}>
							<Text size="sm" weight={500}>First Last</Text>
							<Text size="xs" color="dimmed">Email@email.com</Text>
						</Box>
						<ChevronRight />
					</Group>
				</UnstyledButton>
			</Navbar.Section>
		</Navbar>
    )
  }
}

export default NavigationBar
