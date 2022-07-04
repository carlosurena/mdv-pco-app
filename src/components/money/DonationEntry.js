import React, {useState} from 'react'
import { Grid, Button } from '@mantine/core'
import {DatePicker} from '@mantine/dates';
import { createDonation, createDonationType } from '../../firebase/donationRequests';
import MDVSelect from '../shared/MDVSelect';
import MDVNumberInput from '../shared/MDVNumberInput';

function DonationEntry(props) {
	const [donor, setDonor] = useState('');
	const [donorName, setDonorName] = useState('');
	const [donationType, setDonationType] = useState('');
	const [date, setDate] = useState('');
	const [amount, setAmount] = useState('');


	const transferValue = (event) => {
	  event.preventDefault();

	  const donation = {
		  donor_pco_id : donor,
		  amount : amount,
		  donation_type: donationType,
		  donor_name: donorName,
		  date: date
	  }
	  createDonation(donation, null)
	  props.fetchDonations();
	  clearState();
	};
	
	const clearState = () => {
	  setDonor('');
	  setDonorName('');
	  setDonationType('');
	  setAmount(0);
	};

	const _createNewDonationType = (query) => {
		console.log('creating new', query)
		createDonationType(query);
	}

	const _createNewPerson = (query) => {
		console.log('creating new', query)
	}
	
	return (
	  <div>
		  {props.people && 
		  	<Grid align='flex-end'>
				<Grid.Col span={3}>
					<DatePicker 
						placeholder='Pick Date'
						label="Date"
						required
						inputFormat="MM/DD/YYYY"
						labelFormat="MM/YYYY"	
						onChange={(query) => setDate(query)}
						value={date}
					/>
				</Grid.Col>
				  <Grid.Col span={3}>
					<MDVSelect 
						data={props.people}
						label={'Name'}
						maxSelectedValues={1}
						updateLabelName={setDonorName}
						value={donor}
						setValue={setDonor}
						labelLookupRequired={true}
						createNewOption={_createNewPerson}
					/>
				</Grid.Col>
				<Grid.Col span={2}>
					<MDVSelect 
						data={props.donationTypes} 
						label='Donation Type'
						maxSelectedValues={1}
						setValue={setDonationType}
						value={donationType}
						createNewOption={_createNewDonationType}

					/>
				</Grid.Col>
				<Grid.Col span={2}>
					<MDVNumberInput 
						label="Amount"
						setAmount={setAmount}
						value={amount}
					/>
				</Grid.Col>
 				
				<Grid.Col span={2}>
					<Button onClick={transferValue} disabled={!(donor && donorName && date && amount && donationType)}>Submit</Button>
				</Grid.Col>
					
			</Grid>
		}
		 
	  </div>
	);
  }
	
  export default DonationEntry;