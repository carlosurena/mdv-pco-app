import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {Tabs, Text, Button, SimpleGrid} from '@mantine/core';
import { List as ListIcon, Settings, TrashX } from 'tabler-icons-react';
import firebase from '../../firebase/firebase';
import { deleteDonationSource, deleteDonationType } from '../../firebase/donationRequests';
import { deleteExpenseMethod, deleteExpenseType } from '../../firebase/expenseRequests';
import ConfirmationModal from '../shared/ConfirmationModal';

const db = firebase.firestore();

function SettingsPage(props) {
	const { t } = useTranslation();
	const [dt, setDT] = useState([]);
	const [ds, setDS] = useState([]);
	const [et, setET] = useState([]);
	const [em, setEM] = useState([]);
	const [itemToDelete, setItemoDelete] = useState('')
	const [isConfirmationModal, setIsConfirmationModal] = useState(false)

	useEffect( () => {
		const unsubscribeSources = db.collection('donation_sources').onSnapshot(snap => {
			const data = snap.docs.map(doc => {
				return {id: doc.id, ...doc.data()}
			})
			data.forEach( source => {
				source.value = source.name
				source.label = source.name
			})
			setDS(data)
		});
		const unsubscribeDT = db.collection('donation_types').onSnapshot(snap => {
			const data = snap.docs.map(doc => {
				return {id: doc.id, ...doc.data()}
			})
			data.forEach( dt => {
				dt.value = dt.name
				dt.label = dt.name
			})
			setDT(data)
		});
		const unsubscribeMethods = db.collection('expense_methods').onSnapshot(snap => {
			const data = snap.docs.map(doc => {
				return {id: doc.id, ...doc.data()}
			})
			data.forEach( method => {
				method.value = method.name
				method.label = method.name
			})
			setEM(data)
		});
		const unsubscribeET = db.collection('expense_types').onSnapshot(snap => {
			const data = snap.docs.map(doc => {
				return {id: doc.id, ...doc.data()}
			})
			data.forEach( et => {
				et.value = et.name
				et.label = et.name
			})
			setET(data)
		});

		return () => {
			unsubscribeSources()
			unsubscribeDT()
			unsubscribeMethods()
			unsubscribeET()
		}	
	}, [])

	const handleItemDelete = (type, id) => {
		setItemoDelete({type, id})
		setIsConfirmationModal(true);
	}

	const deleteItems = () => {
		switch(itemToDelete.type) {
			case 'dt':
				deleteDonationType(itemToDelete.id);
				break;
			case 'ds':
				deleteDonationSource(itemToDelete.id);
				break;
			case 'et':
				deleteExpenseType(itemToDelete.id);
				break;
			case 'em':
				deleteExpenseMethod(itemToDelete.id);
				break;
			default:
				console.log('WRONG item type');
				break;
		}
		setIsConfirmationModal(false)
	}
	return (
		<div>
			<ConfirmationModal 
				opened={isConfirmationModal}
				setOpened={setIsConfirmationModal}
				confirmFunction={() => deleteItems()}
				text={t('are_you_sure_delete')}
				confirmText={t('delete_row')}
			/>
			<h1>{t('settings')}</h1>
			<Tabs>
				<Tabs.Tab label={t('delete_options')} icon={<ListIcon size={14} />}>
					<SimpleGrid cols={2}>
						<div>
							<Text size="lg">{t('donation_type')}</Text>
							{dt.map( item => {
								return (
									<div>
										<Button onClick={() => handleItemDelete('dt', item.id)} leftIcon={<TrashX />} variant="white" color='red'>
											{item.label}
										</Button>
									</div>
								)
							})}
						</div>
						<div>
							<Text size="lg">{t('source')}</Text>
							{ds.map( item => {
								return (
									<div>
										<Button onClick={() => handleItemDelete('ds', item.id)} leftIcon={<TrashX />} variant="white" color='red'>
											{item.label}
										</Button>
									</div>
								)
							})}
						</div>
						<div>
							<Text size="lg">{t('expense_type')}</Text>
							{et.map( item => {
								return (
									<div>
										<Button onClick={() => handleItemDelete('et', item.id)} leftIcon={<TrashX />} variant="white" color='red'>
											{item.label}
										</Button>
									</div>
								)
							})}
						</div>
						<div>
							<Text size="lg">{t('method')}</Text>
							{em.map( item => {
								return (
									<div>
										<Button onClick={() => handleItemDelete('em', item.id)} leftIcon={<TrashX />} variant="white" color='red'>
											{item.label}
										</Button>
									</div>
								)
							})}
						</div>
					</SimpleGrid>
					
				</Tabs.Tab>
				<Tabs.Tab label={t('coming_soon')} disabled icon={<Settings size={14} />}>Settings tab content</Tabs.Tab>
			</Tabs>
		</div>
		
	)
}

export default SettingsPage