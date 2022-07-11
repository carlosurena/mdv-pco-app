import React, {useState, useEffect} from 'react'
import ReportsTemplate from './ReportsTemplate';
import { format, isToday } from 'date-fns'
import { Modal, Button, Indicator } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { getDonationsAndExpenses } from '../../../firebase/compoundRequests';

function DistrictReport(props) {
	const [aggregateData, setAggregateData] = useState([]);
	const [totalDonations, setTotalDonations] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [title, setTitle] = useState('')
	const [dates, setDates] = useState('')
	const [modalOpened, setModalOpened] = useState(true);
	const [isAggregate, setIsAggregate] = useState(true)

	useEffect(() => {
	}, [])
	
	const generateReport = () => {
		setIsAggregate(true) //can remove this line, i added it just to remove the warning
		setTitle('Metro New York District Report from ' + format(dates[0], 'MM/dd/yyyy') +'to ' + format(dates[1], 'MM/dd/yyyy'))
		if (isAggregate){
			getDonationsAndExpenses(dates[0],dates[1]).then( data => {
				setAggregateData(data.result)
				setTotalDonations(data.donationTotal)
				setTotalExpenses(data.expenseTotal)
				setModalOpened(false)
			})
		} else {
			// getDonations(dates[0] , dates[1]).then( data => {
			// 	setDonationData(data.data)
			// 	setTotalDonations(data.total)
				
			// })
			// getExpenses(dates[0], dates[1]).then( data => {
			// 	setExpenseData(data.data)
			// 	setTotalExpenses(data.total)
			// 	setModalOpened(false)
			// })
		}
	}



	// const aggregateDonationsAndExpenses = () => {
	// 	let newArr = [...donationData,...expenseData]
	// 	console.log(newArr)
	// }
	const handleModalClose = () => {
		setModalOpened(false)
		props.setPage(props.home)
	}

	return (
		<div>
			<Modal 
				opened={modalOpened}
				onClose={handleModalClose}
				title="District Report"
			>
				<section>
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
					{/* <SegmentedControl 
						value={isAggregate}
						onChange={setIsAggregate}
						data={[
							{label:'All', value: false},
							{label:'Aggregate', value: true},
						]}
					/>
					<SegmentedControl 
						value={groupByWeek}
						onChange={setGroupByWeek}
						data={[
							{label:'Day', value: false},
							{label:'Week', value: true},
						]}
					/> */}
			</section>


			<Button disabled={!(dates && dates[0] !== null && dates[1] !== null)} onClick={() => generateReport()}>Generate Report</Button>
			</Modal>
			<ReportsTemplate 
				title={title} 
				data={aggregateData}
				total={(parseFloat(totalDonations) - parseFloat(totalExpenses)).toFixed(2)}
				totalDonations={totalDonations}
				totalExpenses={totalExpenses}
				isDistrictReport={true}
			/>
			
		</div>
	)

}
export default DistrictReport
