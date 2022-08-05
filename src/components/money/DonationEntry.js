import React, {useState} from 'react'
import { Grid, Button, Indicator} from '@mantine/core'
import {DatePicker} from '@mantine/dates';
import { createDonation, createDonationSource, createDonationType } from '../../firebase/donationRequests';
import MDVSelect from '../shared/MDVSelect';
import MDVPeopleSelect from '../shared/MDVPeopleSelect';
import MDVNumberInput from '../shared/MDVNumberInput';
import { isToday } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { getCookie } from '../../utils/cookieUtils'
import MDVPersonModal from '../shared/MDVPersonModal';
import ConfirmationModal from '../shared/ConfirmationModal';

function DonationEntry(props) {
	const { t } = useTranslation();
	const [donor, setDonor] = useState('');
	const [donorName, setDonorName] = useState('');
	const [donationType, setDonationType] = useState('');
	const [source, setSource] = useState('');
	const [date, setDate] = useState('');
	const [amount, setAmount] = useState('');
	const [pModalOpened, setPModalOpened] = useState(false)
	const [tempNewPersonName, setTempNewPersonName] = useState('')
	const [isConfirmationModal, setIsConfirmationModal] = useState(false)
	const [createVal, setCreateVal] = useState('')
	const [createFunc, setCreateFunc] = useState(undefined)
	const transferValue = (event) => {
	  event.preventDefault();

	  const donation = {
		  donor_pco_id : donor,
		  amount : amount,
		  donation_type: donationType,
		  source: source,
		  donor_name: donorName,
		  campus_code: getCookie("campus_code"),
		  date: date
	  };
	  createDonation(donation, props.user)
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
		setCreateVal(query)
		setCreateFunc(() => createDonationType)
		setIsConfirmationModal(true)
		// createDonationType(query, props.user);
	}

	const _createNewSource = (query) => {
		console.log('creating new ', query)
		setCreateVal(query)
		setCreateFunc(() => createDonationSource)
		setIsConfirmationModal(true)
		// createDonationSource(query, props.user)
	}

	const confirmCreate = () => {
		createFunc(createVal, props.user)
		setIsConfirmationModal(false)
	}

	const _createNewPerson = (query) => {
		console.log('creating new', query)
		setTempNewPersonName(query)
		setPModalOpened(true)
		// window.open('https://people.planningcenteronline.com/people', '_blank');
	}	
	
	return (
		<section>
			<MDVPersonModal person={tempNewPersonName} opened={pModalOpened} setOpened={setPModalOpened}/>
			<ConfirmationModal 
				opened={isConfirmationModal}
				setOpened={setIsConfirmationModal}
				confirmFunction={confirmCreate}
				text={t('are_you_sure_create')}
				confirmText={t('create', {query : createVal})}
			/>
			<h1>{t('donations')}</h1>
		  {props.people && 
		  	<Grid align='flex-end'>
				<Grid.Col span={2}>
					<DatePicker 
						placeholder='Pick Date'
						label={t('date')}
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
					<MDVPeopleSelect 
						data={props.people}
						label={t('name')}
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
						label={t('donation_type')}
						setValue={setDonationType}
						value={donationType}
						createNewOption={_createNewDonationType}
					/>
				</Grid.Col>
				<Grid.Col span={2}>
					<MDVSelect 
						data={props.sources} 
						label={t('source')}
						setValue={setSource}
						value={source}
						createNewOption={_createNewSource}

					/>
				</Grid.Col>
				<Grid.Col span={2}>
					<MDVNumberInput 
						label={t('amount')}
						setAmount={setAmount}
						value={amount}
					/>
				</Grid.Col>
 				
				<Grid.Col span={2}>
					<Button onClick={transferValue} disabled={!(donor && donorName && date && amount && donationType && source)}>{t('submit')}</Button>
				</Grid.Col>
					
			</Grid>
		}
		 
	  </section>
	);
  }
	
  export default DonationEntry;