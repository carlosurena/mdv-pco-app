import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom' 
import {Navbar, UnstyledButton, Avatar, Text, Group, Box, Image, Popover, Button, Select } from '@mantine/core'
import { TrendingDown, TrendingUp, ReportAnalytics, ChevronRight} from 'tabler-icons-react'
import logo from '../../assets/img/logo.png';
import { useTranslation } from 'react-i18next';
import { setCookie, getCookie, checkCookie } from '../../utils/cookieUtils'

function NavigationBar(props) {
	const { t, i18n } = useTranslation();
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

	const changeLanguage = (lang) => {
		setCookie("language",lang, 365);
		i18n.changeLanguage(lang)
	}

	useEffect(() => {
		if(checkCookie("language")){
			i18n.changeLanguage(getCookie("language"))
		}

	}, [i18n])
    return (
		<Navbar p="xs" width={{ base: 250 }}>
			<Navbar.Section><Image className='navbar-logo' src={logo} /></Navbar.Section>
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
								<Avatar size={30} color="green"><TrendingUp size={20}/></Avatar>
								<div>
									<Text color="green">{t('donations')}</Text>
								</div>
							</Group>
						</UnstyledButton>
					</NavLink>
				</div>
				<div className="nav-link">
					<NavLink to="/expenses">
						<UnstyledButton onClick={() => console.log('try focusing button with tab')}>
							<Group>
								<Avatar size={30} color="red"><TrendingDown size={20}/></Avatar>
								<div>
									<Text color="red">{t("expenses")}</Text>
								</div>
							</Group>
						</UnstyledButton>
					</NavLink>
				</div>
				<div className="nav-link">
					<NavLink to="/reports">
						<UnstyledButton >
							<Group>
								<Avatar size={30} color="blue"><ReportAnalytics size={20}/></Avatar>
								<div>
									<Text color="blue">{t('reports')}</Text>
								</div>
							</Group>
						</UnstyledButton>
					</NavLink>
				</div>
				
			</Navbar.Section>
			{
				props.auth && props.auth.user &&
				<Navbar.Section>
					<Popover target={
						<UnstyledButton className="user-btn" onClick={() => setIsUserMenuOpen((o) => !o)}>
							<Group className="user-btn-hover">
								<Avatar radius="xl" color="blue" src={props.auth.user.data.attributes.avatar}/>
								<Box style={{flex: 1}}>
									<Text size="sm" weight={500}>{props.auth.user.data.attributes.name}</Text>
									<Text size="xs" color="dimmed">{}</Text>
								</Box>
								<ChevronRight />
							</Group>
						</UnstyledButton>
					} 
					opened={isUserMenuOpen} 
					position="right" 
					placement="end" 
					onClose={() => setIsUserMenuOpen(false)}
					gutter={10}
					style={{width: '100%'}}>
						<section>
							<Select 
								data={['en', 'es']} 
								label={t('language')}
								onChange={(query) => changeLanguage(query)}
								value={i18n.language}
							/>
						</section>

						<Button onClick={props.auth.signout}>{t('signout')}</Button>
					</Popover>
						
						
					
				</Navbar.Section>
			}
			
		</Navbar>
    )

}

export default NavigationBar
