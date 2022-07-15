import React, {useEffect, useState} from 'react';
import { Modal, Button, Group, TextInput } from '@mantine/core';
import { useTranslation} from 'react-i18next';

function MDVPersonModal(props) {
	const { t } = useTranslation();
	const [first, setFirst] = useState(props.person)
	const [last, setLast] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')

	useEffect(() => {
		setFirst(props.person)
	}, [props.person])
	return (
		<>
			<Modal
				opened={props.opened}
				onClose={() => props.setOpened(false)}
				title={t('add_a_person')}
			>
				<section>
					<Group>
						<TextInput 
							placeholder={t('first_name')}
							label={t('first_name')}
							value={first} 
							required
							onChange={(event) => setFirst(event.currentTarget.value)}
						/>
						<TextInput 
							placeholder={t('last_name')}
							label={t('last_name')}
							value={last} 
							required
							onChange={(event) => setLast(event.currentTarget.value)}
						/>
					</Group>
					<Group>
						<TextInput 
							placeholder={t('phone')}
							label={t('phone')}
							value={phone} 
							onChange={(event) => setPhone(event.currentTarget.value)}
						/>
						<TextInput 
							placeholder={t('email')}
							label={t('email')}
							value={email} 
							onChange={(event) => setEmail(event.currentTarget.value)}
						/>
					</Group>
				</section>
				<Group>
					<Button onClick={() => createPerson()} disabled={!(first && last)}>{t('submit')}</Button>
				</Group>
			</Modal>
		</>
	);
}

export default MDVPersonModal;