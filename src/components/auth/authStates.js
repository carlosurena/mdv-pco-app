import { Button } from '@mantine/core'
import React from 'react'

export function LogOutPage(props) {

	
	return (
		<div>
			You are logged out.
			<Button onClick={() => props.auth.signin()}>Log In</Button>
		</div>
	)
}