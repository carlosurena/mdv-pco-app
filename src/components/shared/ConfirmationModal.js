import React from 'react'
import { Modal, Button, Text, Space, Grid } from '@mantine/core';
import { useTranslation } from 'react-i18next';

function ConfirmationModal(props) {
	const { t } = useTranslation();
	return (
		<Modal
			opened={props.opened}
			onClose={() => props.setOpened(false)}
			withCloseButton={false}
			centered
			padding="lg"
		>
			<Text weight={700} align='center'>{t('are_you_sure_create')}</Text>
			<Space h="lg"/>
			<Grid justify={"center"}>
				<Grid.Col span={3}>				
					<Button color="red" onClick={() => props.setOpened(false)}>{t('cancel')}</Button>
				</Grid.Col>
				<Grid.Col span={3}>
					<Button onClick={() => props.confirmCreate()} color="teal">{t('create', {query : props.createVal})}</Button>
				</Grid.Col>
			</Grid>
		</Modal>
	)	
}

export default ConfirmationModal