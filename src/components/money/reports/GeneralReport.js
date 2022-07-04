import React, {useState, useEffect} from 'react'
import { getDonations, getDonationTotalsAggregate, getDonationTotalsByPerson } from '../../../firebase/donationRequests'
import ReportsTemplate from './ReportsTemplate';
import { format } from 'date-fns'
import { Modal, Button, SegmentedControl } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'

function GeneralReport() {
	const [donationData, setDonationData] = useState([]);
	const [total, setTotal] = useState(0);
	const [dates, setDates] = useState('')
	const [modalOpened, setModalOpened] = useState(true);
	const [title, setTitle] = useState('')
	const [isAggregate, setIsAggregate] = useState('')

	useEffect(() => {
	}, [])
	
	const generateReport = () => {
		setTitle('General Report from ' + format(dates[0], 'MM/dd/yyyy') +'to ' + format(dates[1], 'MM/dd/yyyy'))
		if (isAggregate){
			getDonationTotalsAggregate(dates[0], dates[1]).then( data => {
				setDonationData(data.data)
				setTotal(data.total)
				setModalOpened(false)

			})
		} else {
			getDonations(dates[0] , dates[1]).then( data => {
				setDonationData(data.data)
				setModalOpened(false)
			})
		}
	}
	return (
		<div>
			<Modal 
				opened={modalOpened}
				onClose={ () => setModalOpened(false)}
				title="data"
			>
			<DateRangePicker 
				placeholder='Pick Date'
				label="Pick a Date Range"
				required
				inputFormat="MM/DD/YYYY"
				labelFormat="MM/YYYY"	
				onChange={(query) => setDates(query)}
				value={dates}
			/>
			<SegmentedControl 
				value={isAggregate}
				onChange={setIsAggregate}
				data={[
					{label:'All', value: false},
					{label:'Aggregate', value: true},
				]}
			/>

			<Button onClick={() => generateReport()}>Generate Report</Button>
			</Modal>
		<ReportsTemplate 
			title={title} 
			data={donationData}
			total={total}
			/>
		</div>
	)

}
export default GeneralReport
