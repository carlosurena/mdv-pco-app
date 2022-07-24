import React, {useState, useEffect} from 'react'
import ReportsTemplate from './ReportsTemplate';
import { isToday } from 'date-fns'
import { Modal, Button, Indicator, MultiSelect } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { getDonationsAndExpenses } from '../../../firebase/compoundRequests';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { ReportsPDFTemplate } from './ReportsPDFTemplate'
import { useTranslation } from 'react-i18next';
import { getDonationTypes } from '../../../firebase/donationRequests'
import { getExpenseTypes } from '../../../firebase/expenseRequests'

function DistrictReport(props) {
	const { t } = useTranslation();
	const [aggregateData, setAggregateData] = useState([]);
	const [totalDonations, setTotalDonations] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [title, setTitle] = useState('')
	const [dates, setDates] = useState('')
	const [modalOpened, setModalOpened] = useState(true);
	const [donationType, setDonationType] = useState([]);
	const [donationTypes, setDonationTypes] = useState([]);
	const [expenseType, setExpenseType] = useState([]);
	const [expenseTypes, setExpenseTypes] = useState([]);
	
	useEffect(() => {
		getDonationTypes().then( data => {
			setDonationTypes(data)
		})
		getExpenseTypes().then( data => {
			setExpenseTypes(data)
		})
	}, [])
	
	const generateReport = () => {
		setTitle(t('district_report_title_generated'))
		
		getDonationsAndExpenses(dates[0],dates[1], donationType, expenseType).then( data => {
			setAggregateData(data.result)
			setTotalDonations(data.donationTotal)
			setTotalExpenses(data.expenseTotal)
			setModalOpened(false)
		})

	}



	// const aggregateDonationsAndExpenses = () => {
	// 	let newArr = [...donationData,...expenseData]
	// 	console.log(newArr)
	// }
	const handleModalClose = () => {
		setModalOpened(false)
		props.setPage(null)
	}

	return (
		<div>
			<Modal 
				opened={modalOpened}
				onClose={handleModalClose}
				title={t('district_report_title')}
			>
				<section>
						<DateRangePicker 
						placeholder={t('pick_date')}
						label={t('pick_date_range')}
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
				<section>
				<MultiSelect 
						data={donationTypes} 
						label={t('filterby_donation_type')}
						onChange={(query) => setDonationType(query)}
						value={donationType}
					/>
					<MultiSelect 
						data={expenseTypes} 
						label={t('filterby_expense_type')}
						onChange={(query) => setExpenseType(query)}
						value={expenseType}
					/> 
					
				</section>
			</section>


			<Button disabled={!(dates && dates[0] !== null && dates[1] !== null)} onClick={() => generateReport()}>{t('generate_report')}</Button>
			</Modal>

			{aggregateData && aggregateData.length > 0 ? (
				<div>
					<ReportsTemplate 
						title={title} 
						data={aggregateData}
						total={(parseFloat(totalDonations) - parseFloat(totalExpenses)).toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
						totalDonations={totalDonations}
						totalExpenses={totalExpenses}
						isDistrictReport={true}
					/>
					<PDFViewer className='pdf-viewer'>
						<ReportsPDFTemplate 
							title={title} 
							dates={dates} 
							data={aggregateData} 
							total={(parseFloat(totalDonations) - parseFloat(totalExpenses))}
							totalDonations={totalDonations}
							totalExpenses={totalExpenses}
							isDistrictReport={true}
						/>
					</PDFViewer>
					<PDFDownloadLink 
						document={<ReportsPDFTemplate 
							title={title} 
							dates={dates} 
							data={aggregateData} 
							total={(parseFloat(totalDonations) - parseFloat(totalExpenses))}
							totalDonations={totalDonations}
							totalExpenses={totalExpenses}
							isDistrictReport={true}
							/>} 
						fileName="test">
						{({loading}) => loading ? (<Button disabled>{t('loading')}</Button>) : (<Button>{t('download')}</Button>)}
					</PDFDownloadLink>
				</div>
			) : (
				<div>
				</div>
			)}
			
		</div>
	)

}
export default DistrictReport
