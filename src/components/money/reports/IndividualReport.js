import React, {useState, useEffect} from 'react'
import { getDonationsByDateAndPerson, getDonationTotalsByPerson } from '../../../firebase/donationRequests'
import ReportsTemplate from './ReportsTemplate';
import { format, isToday } from 'date-fns'
import { Modal, Button, Indicator} from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import MDVSelect from '../../shared/MDVSelect';
import { getAllPeopleReshaped } from '../../../pco/requests'


function IndividualReport() {
	const [donationData, setDonationData] = useState([]);
	const [id, setId] = useState('')
	const [donorName, setDonorName] = useState('')
	const [dates, setDates] = useState('')
	const [modalOpened, setModalOpened] = useState(true);
	const [people, setPeople] = useState([])
	const [title, setTitle] = useState('')
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const fetchPeople = async () => {
			setPeople(await getAllPeopleReshaped())
		}
		fetchPeople().catch(console.error);
	}, [])
	
	const generateReport = async () => {
		setTitle('Individual Report for ' + donorName + 'from ' + format(dates[0], 'MM/dd/yyyy') +'to ' + format(dates[1], 'MM/dd/yyyy'))
		getDonationsByDateAndPerson(id, dates[0] , dates[1]).then( data => {
			setDonationData(data)
			setModalOpened(false)
		})
		setTotal(await getDonationTotalsByPerson(id[0], dates[0] , dates[1]))
		console.log(total, 'total')
	}
	return (
		<div>
			<Modal 
				opened={modalOpened}
				onClose={ () => setModalOpened(false)}
				title="data"
			>
			<MDVSelect 
				data={people}
				label={'Person Name'}
				updateLabelName={setDonorName}
				value={id}
				setValue={setId}
				labelLookupRequired={true}
			/>
			<DateRangePicker 
				placeholder='Pick Date'
				label="Pick a Date Range"
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
				onChange={(query) => setDates(query)}
				value={dates}
			/>
			<Button disabled={!(id && dates && dates[0] !== null && dates[1] !== null)} onClick={() => generateReport()}>Generate Report</Button>
			</Modal>
		<ReportsTemplate 
			title={title} 
			data={donationData}
			total={total}
			/>
		</div>
	)

}
export default IndividualReport
