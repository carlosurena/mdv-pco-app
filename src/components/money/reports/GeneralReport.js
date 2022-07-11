import React, {useState, useEffect} from 'react'
import { getDonations, getDonationTotalsAggregate } from '../../../firebase/donationRequests'
import ReportsTemplate from './ReportsTemplate';
import { isToday } from 'date-fns'
import { Modal, Button, Switch, Indicator } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { ReportsPDFTemplate } from './ReportsPDFTemplate'

	  
function GeneralReport(props) {
	const [donationData, setDonationData] = useState([]);
	const [total, setTotal] = useState(0);
	const [dates, setDates] = useState('')
	const [modalOpened, setModalOpened] = useState(true);
	const [title, setTitle] = useState('')
	const [isAggregate, setIsAggregate] = useState('')

	useEffect(() => {
	}, [])
	
	const generateReport = () => {
		setTitle('General Report')
		if (isAggregate){
			getDonationTotalsAggregate(dates[0], dates[1]).then( data => {
				setDonationData(data.data)
				setTotal(data.total)
				setModalOpened(false)

			})
		} else {
			getDonations(dates[0] , dates[1]).then( data => {
				setDonationData(data.data)
				setTotal(data.total)
				setModalOpened(false)
			})
		}
	}
	const handleModalClose = () => {
		setModalOpened(false)
		props.setPage(props.home)
	}
	return (
		<div>
			<Modal 
				opened={modalOpened}
				onClose={handleModalClose}
				title="General Report"
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
				</section>
				<section>
					<Switch 
						label='Aggregate Data'
						checked={isAggregate}
						onChange={(event) => setIsAggregate(event.currentTarget.checked)}
					/>
				</section>

			<Button disabled={!(dates && dates[0] !== null && dates[1] !== null)} onClick={() => generateReport()}>Generate Report</Button>
			</Modal>
		

		{donationData && donationData.length > 0 ? (
			<div>
				<ReportsTemplate 
					title={title} 
					data={donationData}
					total={total}
				/>
				<PDFViewer className='pdf-viewer'>
					<ReportsPDFTemplate title={title} dates={dates} data={donationData} total={total}/>
				</PDFViewer>
				<PDFDownloadLink document={<ReportsPDFTemplate title={title} dates={dates} data={donationData} total={total}/>} fileName="test">
					{({loading}) => loading ? (<Button disabled>loading...</Button>) : (<Button>Download</Button>)}
				</PDFDownloadLink>
			</div>
		) : (
			<div>
			</div>
		)}
		
			
		</div>
	)

}
export default GeneralReport
