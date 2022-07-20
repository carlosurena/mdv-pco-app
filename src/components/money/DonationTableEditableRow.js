import React, {useState, useEffect} from 'react'
import { ActionIcon, Indicator } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import MDVSelect from '../shared/MDVSelect';
import MDVPeopleSelect from '../shared/MDVPeopleSelect'
import MDVNumberInput from '../shared/MDVNumberInput';
import { format, isToday } from 'date-fns'
import { updateDonation } from '../../firebase/donationRequests'
import { Check, Edit, TrashX } from 'tabler-icons-react'
import { useTranslation } from 'react-i18next'


function DonationTableEditableRow(props) {
	const { t } = useTranslation();
	const [donationData, setDonationData] = useState([]);
	const [id,setId] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	const updateDonationData = (newData) => {
		// console.log(newData)
		setDonationData(data => ({
			...data,
			...newData
		}));
	}
	
	const updateDonorName = (name) => {
		updateDonationData({'donor_name' : name})
	}

	const updateDonor = (val) => {
		console.log("updateDonor", val)
		!!val && updateDonationData({'donor_pco_id' : val}) 
	}

	const updateDonationType = (val) => {
		console.log("updateDonationType", val)
		!!val && updateDonationData({'donation_type' : val})
	}

	const updateSource = (val) => {
		console.log("updateSource", val)
		!!val && updateDonationData({'source' : val})
	}

	const updateAmount = (value) => {
		updateDonationData({'amount' : value})
	}

	


	const saveEdit = () => {
		updateDonation(id, donationData, props.user)
		setIsEditing(false)
	}

	useEffect(() => {
		const updateDate = (value) => {
			value && updateDonationData({'date' : value.toDate()})
		}
		setDonationData(props.donation)
		props.donation.id && setId(props.donation.id)
		updateDate(props.donation.date)
		// initializeEditableFieldData();
	}, [props.donation])

	return (
		<tr key={id}>
			{ isEditing ? (
			<td>
				<DatePicker placeholder='Pick Date'
					label={t('date')}
					required
					inputFormat="MM/DD/YYYY"
					labelFormat="MM/YYYY"	
					renderDay={(date) => {
						const day = date.getDate();
						return (
							<Indicator size={6} color="red" offset={8} disabled={!isToday(date)}>
							<div>{day}</div>
							</Indicator>
						);
						}}
					onChange={(query) => updateDonationData({ 'date' : query})}
					value={donationData.date ? (donationData.date instanceof Date ? donationData.date : donationData.date.toDate()) : ''}
				/>
			</td>) : (<td>{donationData.date && format(donationData.date, 'MM/dd/yyyy')}</td>)}
			{ isEditing ? (
			<td>
				<MDVPeopleSelect 
						data={props.people}
						label={t('name')}
						updateLabelName={updateDonorName}
						value={donationData.donor_pco_id}
						setValue={updateDonor}
						name={donationData.donor_name}
						labelLookupRequired={true}
					/>
			</td>) : (<td>{donationData.donor_name}</td>)}
			{ isEditing ? (
			<td>
				<MDVSelect 
						data={props.donationTypes} 
						label={t('donation_type')}
						setValue={updateDonationType}
						value={donationData.donation_type}

					/>
			</td>) : (<td>{donationData.donation_type}</td>)}
			{ isEditing ? (
			<td>
				<MDVSelect 
						data={props.sources} 
						label={t('source')}
						setValue={updateSource}
						value={donationData.source}

					/>
			</td>) : (<td>{donationData.source}</td>)}
			{ isEditing ? (
			<td>
				<MDVNumberInput 
					label={t('amount')}
					setAmount={updateAmount}
					value={donationData.amount}
				/>

			</td>) : (<td>{parseFloat(donationData.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</td>)}
			{ isEditing ? (
				<td>
					<ActionIcon 
						disabled={!(donationData.donor_pco_id && 
									donationData.donor_name && 
									donationData.date && 
									donationData.amount && 
									donationData.source && 
									donationData.donation_type)} 
						onClick={() => saveEdit()}
						variant="light"
						color="green"
						>
						<Check />
					</ActionIcon></td>) : (
				<td>
					<ActionIcon 
						onClick={() => setIsEditing(true)}
						variant="light"
						color="blue"
						>
						<Edit size={16} />
					</ActionIcon>
					<ActionIcon 
						onClick={() => props.deleteDonation(id)}
						variant="light"
						color="red"
					><TrashX /></ActionIcon>
				</td>)}

			
			
			
			
		</tr>
	)

}
export default DonationTableEditableRow
