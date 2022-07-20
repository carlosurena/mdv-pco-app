import { Button, Container, Center, Text, Space } from '@mantine/core'
import React from 'react'

export function LogOutPage(props) {

	
	return (
		<Container style={{ height: '100vh'}}>
			<Center style={{ height: '100%'}}>
				<Text>You are logged out. </Text>
				<Space h="md"/>
				<Text><Button onClick={() => props.auth.signin()}>Log In</Button></Text>
			</Center>
			
		</Container>
	)
}