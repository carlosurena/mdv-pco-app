import React, {useState} from 'react'
import { Grid, Button, Indicator } from '@mantine/core'
import {DatePicker} from '@mantine/dates';
import { createDonation, createDonationSource, createDonationType } from '../../firebase/donationRequests';
import MDVSelect from '../shared/MDVSelect';
import MDVNumberInput from '../shared/MDVNumberInput';
import { isToday } from 'date-fns'

function DonationEntry(props) {
	const [donor, setDonor] = useState('');
	const [donorName, setDonorName] = useState('');
	const [donationType, setDonationType] = useState('');
	const [source, setSource] = useState('');
	const [date, setDate] = useState('');
	const [amount, setAmount] = useState('');


	const transferValue = (event) => {
	  event.preventDefault();

	  const donation = {
		  donor_pco_id : donor,
		  amount : amount,
		  donation_type: donationType,
		  source: source,
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
	  setSource('');
	  setAmount(0);
	};

	const _createNewDonationType = (query) => {
		console.log('creating new', query)
		createDonationType(query);
	}

	const _createNewSource = (query) => {
		console.log('creating new ', query)
		createDonationSource(query)
	}

	const _createNewPerson = (query) => {
		console.log('creating new', query)
	}
	
	return (
		<section>
			<h1>Donations</h1>
		  {props.people && 
		  	<Grid align='flex-end'>
				<Grid.Col span={2}>
					<DatePicker 
						placeholder='Pick Date'
						label="Date"
						required
						inputFormat="MM/DD/YYYY"
						labelFormat="MM/YYYY"	
						onChange={(query) => setDate(query)}
						renderDay={(date) => {
							const day = date.getDate();
							return (
							  <Indicator size={6} color="red" offset={8} disabled={!isToday(date)}>
								<div>{day}</div>
							  </Indicator>
							);
						  }}
						value={date}
					/>
				</Grid.Col>
				  <Grid.Col span={2}>
					<MDVSelect 
						data={props.people}
						label={'Name'}
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
						setValue={setDonationType}
						value={donationType}
						createNewOption={_createNewDonationType}
					/>
				</Grid.Col>
				<Grid.Col span={2}>
					<MDVSelect 
						data={props.sources} 
						label='Source'
						setValue={setSource}
						value={source}
						createNewOption={_createNewSource}

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
					<Button onClick={transferValue} disabled={!(donor && donorName && date && amount && donationType && source)}>Submit</Button>
				</Grid.Col>
					
			</Grid>
		}
		 
	  </section>
	);
  }
	
  export default DonationEntry;