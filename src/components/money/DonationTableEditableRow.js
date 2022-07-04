	import React, {useState, useEffect} from 'react'
	import { ActionIcon } from '@mantine/core';
	import { DatePicker } from '@mantine/dates';
	import MDVSelect from '../shared/MDVSelect';
	import MDVNumberInput from '../shared/MDVNumberInput';
	import { format } from 'date-fns'
	import { updateDonation } from '../../firebase/donationRequests'
	import { Check, Edit, TrashX } from 'tabler-icons-react'

	const donationTypes = [
		{value: 'Diezmo', label: 'Diezmo'},
		{value: 'Ofrenda', label: 'Ofrenda'},
		{value: 'Casa Restauracion', label: 'Casa Restauracion'},
		{value: 'Nuevo Templo', label: 'Nuevo Templo'},
		{value: 'Niños', label: 'Niños'},
		{value: 'Jovenes', label: 'Jovenes'}
	]

	function DonationTableEditableRow(props) {
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

		const updateAmount = (value) => {
			updateDonationData({'amount' : value})
		}

		const updateDate = (value) => {
			value && updateDonationData({'date' : value.toDate()})
		}


		const saveEdit = () => {
			updateDonation(id,donationData)
			setIsEditing(false)
		}

		useEffect(() => {
			setDonationData(props.donation)
			props.donation.id && setId(props.donation.id)
			updateDate(props.donation.date)
			// initializeEditableFieldData();
		}, [])

		return (
			<tr key={id}>
				{ isEditing ? (
				<td>
					<DatePicker placeholder='Pick Date'
						label="Date"
						required
						inputFormat="MM/DD/YYYY"
						labelFormat="MM/YYYY"	
						onChange={(query) => updateDonationData({ 'date' : query})}
						value={donationData.date ? (donationData.date instanceof Date ? donationData.date : donationData.date.toDate()) : ''}
					/>
				</td>) : (<td>{donationData.date && format(donationData.date, 'MM/dd/yyyy')}</td>)}
				{ isEditing ? (
				<td>
					<MDVSelect 
							data={props.people}
							label={'Name'}
							updateLabelName={updateDonorName}
							value={donationData.donor_pco_id}
							setValue={updateDonor}
							labelLookupRequired={true}
						/>
				</td>) : (<td>{donationData.donor_name}</td>)}
				{ isEditing ? (
				<td>
					<MDVSelect 
							data={donationTypes} 
							label='Donation Type'
							setValue={updateDonationType}
							value={donationData.donation_type}

						/>
				</td>) : (<td>{donationData.donation_type}</td>)}
				{ isEditing ? (
				<td>
					<MDVNumberInput 
						label="Amount"
						setAmount={updateAmount}
						value={donationData.amount}
					/>

				</td>) : (<td>${donationData.amount}</td>)}
				{ isEditing ? (
					<td>
						<ActionIcon 
							disabled={!(donationData.donor_pco_id && 
										donationData.donor_name && 
										donationData.date && 
										donationData.amount && 
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
						><TrashX /></ActionIcon></td>)}

				
				
				
				
			</tr>
		)

	}
	export default DonationTableEditableRow
