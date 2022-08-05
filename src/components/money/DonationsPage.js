import React, {useState, useEffect} from 'react'
import DonationEntry from './DonationEntry'
import { getAllPeopleReshaped } from '../../pco/requests'
import { Table } from '@mantine/core'
import { getDonations, deleteDonation } from '../../firebase/donationRequests'
import firebase from '../../firebase/firebase'
import DonationTableEditableRow from './DonationTableEditableRow'
import { useTranslation } from 'react-i18next'
import { getCookie } from '../../utils/cookieUtils';

const db = firebase.firestore();

function DonationsPage(props) {
	const { t } = useTranslation();
	const [donationData, setDonationData] = useState([]);
	const [people, setPeople] = useState([]);
	const [sources, setSources] = useState([]);
	const [donationTypes, setDonationTypes] = useState([]);


	const fetchDonations = async () => {
		await getDonations().then( data => {
			console.log('fetched donations')
			setDonationData(data.data)
		})
	}

	const _deleteDonation = async (id) => {
		await deleteDonation(id).then( t => {
			console.log('deleted donation', t)
			fetchDonations();
		});
	}

	const tableRows = donationData.map((donation) => {
	return (
			<DonationTableEditableRow donation={donation} key={donation.id} deleteDonation={_deleteDonation} user={props.auth.user.data} people={people} donationTypes={donationTypes} sources={sources}/>
		)
	});

	useEffect(() => {
		const fetchPeople = async () => {
			setPeople(await getAllPeopleReshaped())
		}
			
		
		const unsubscribe = db.collection('donations').where("campus_code","==",getCookie("campus_code")).orderBy('date', 'desc').orderBy('donor_name').onSnapshot(snap => {
			const data = snap.docs.map(doc => doc.data())
			setDonationData(data)
		  });
		const unsubscribeDT = db.collection('donation_types').onSnapshot(snap => {
			const data = snap.docs.map(doc => doc.data())
			data.forEach( dt => {
				dt.value = dt.name
				dt.label = dt.name
			})
			setDonationTypes(data)
		});
		const unsubscribeSources = db.collection('donation_sources').onSnapshot(snap => {
			const data = snap.docs.map(doc => doc.data())
			data.forEach( source => {
				source.value = source.name
				source.label = source.name
			})
			setSources(data)
		});
		
		fetchPeople().catch(err => console.error(err));
		fetchDonations();
		return () => {
			unsubscribe()
			unsubscribeDT()
			unsubscribeSources()
		}

	}, [])
	
	return (
		<div>
			<DonationEntry fetchDonations={fetchDonations} people={people} donationTypes={donationTypes} user={props.auth.user.data} sources={sources}/>
			<Table highlightOnHover >
				<thead>
					<tr>
						<th>{t('date')}</th>
						<th>{t('name')}</th>
						<th>{t('donation_type')}</th>
						<th>{t('source')}</th>
						<th>{t('amount')}</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</Table>
		</div>
	)

}
export default DonationsPage
