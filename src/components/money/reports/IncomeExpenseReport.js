import React, {useState, useEffect} from 'react'
import { getDonations, getDonationTotalsAggregateByDate } from '../../../firebase/donationRequests'
import ReportsTemplate from './ReportsTemplate';
import { format } from 'date-fns'
import { Modal, Button, SegmentedControl } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { getExpenses, getExpenseTotalsAggregate } from '../../../firebase/expenseRequests';

function IncomeExpenseReport() {
	const [donationData, setDonationData] = useState([]);
	const [expenseData, setExpenseData] = useState([]);
	const [totalDonations, setTotalDonations] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [title, setTitle] = useState('')

	const [dates, setDates] = useState('')
	const [modalOpened, setModalOpened] = useState(true);
	const [isAggregate, setIsAggregate] = useState('')

	useEffect(() => {
	}, [])
	
	const generateReport = () => {
		setTitle('Income/Expense Report from ' + format(dates[0], 'MM/dd/yyyy') +'to ' + format(dates[1], 'MM/dd/yyyy'))
		if (isAggregate){
			getDonationTotalsAggregateByDate(dates[0], dates[1]).then( data => {
				setDonationData(data.data)
				setTotalDonations(data.total)
			})
			getExpenseTotalsAggregate(dates[0], dates[1]).then( data => {
				setExpenseData(data.data)
				setTotalExpenses(data.total)
				setModalOpened(false)
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
				data={donationData}
				total={totalDonations}
			/>
			<ReportsTemplate 
				title={'Expenses'} 
				data={expenseData}
				total={totalExpenses}
			/>
		</div>
	)

}
export default IncomeExpenseReport
