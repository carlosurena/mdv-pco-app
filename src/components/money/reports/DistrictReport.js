import React, {useState, useEffect} from 'react'
import { getDonations, getDonationTotalsAggregateByDate } from '../../../firebase/donationRequests'
import ReportsTemplate from './ReportsTemplate';
import { format } from 'date-fns'
import { Modal, Button, SegmentedControl } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { getExpenses, getExpenseTotalsAggregateByDate } from '../../../firebase/expenseRequests';

function DistrictReport() {
	const [donationData, setDonationData] = useState([]);
	const [expenseData, setExpenseData] = useState([]);
	const [aggregateData, setAggregateData] = useState([]);
	const [totalDonations, setTotalDonations] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [title, setTitle] = useState('')

	const [dates, setDates] = useState('')
	const [modalOpened, setModalOpened] = useState(true);
	const [isAggregate, setIsAggregate] = useState('')

	useEffect(() => {
	}, [])
	
	const generateReport = () => {
		setTitle('Metro New York District Report from ' + format(dates[0], 'MM/dd/yyyy') +'to ' + format(dates[1], 'MM/dd/yyyy'))
		let newArr = []
		if (isAggregate){
			getDonationTotalsAggregateByDate(dates[0], dates[1]).then( data => {
				setDonationData(data.data)
				setTotalDonations(data.total)
				newArr = [...newArr, ...data.data]
			})
			getExpenseTotalsAggregateByDate(dates[0], dates[1]).then( data => {
				setExpenseData(data.data)
				setTotalExpenses(data.total)
				setModalOpened(false)
				newArr = [...newArr, ...data.data]
				setAggregateData(newArr)
				aggregateDonationsAndExpenses();
			})
		} else {
			getDonations(dates[0] , dates[1]).then( data => {
				setDonationData(data.data)
				setTotalDonations(data.total)
				
			})
			getExpenses(dates[0], dates[1]).then( data => {
				setExpenseData(data.data)
				setTotalExpenses(data.total)
				setModalOpened(false)
			})
		}
	}

	const aggregateDonationsAndExpenses = () => {
		let newArr = [...donationData,...expenseData]
		console.log(newArr)
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
			<h1>{!!title && title}</h1>
			<ReportsTemplate 
				title={'Income'} 
				data={aggregateData}
				total={totalDonations}
				totalDonations={totalExpenses}
			/>
			
		</div>
	)

}
export default DistrictReport
