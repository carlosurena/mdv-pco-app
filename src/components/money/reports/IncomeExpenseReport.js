import React, {useState, useEffect} from 'react'
import { getDonations, getDonationTotalsAggregateByDate } from '../../../firebase/donationRequests'
import ReportsTemplate from './ReportsTemplate';
import { format, isToday } from 'date-fns'
import { Modal, Switch, Button, Indicator } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import { getExpenses, getExpenseTotalsAggregate } from '../../../firebase/expenseRequests';
import { useTranslation } from 'react-i18next';

function IncomeExpenseReport(props) {
	const { t } = useTranslation();
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
		setTitle(t('income_expense_report_title_generated') + format(dates[0], 'MM/dd/yyyy') +'to ' + format(dates[1], 'MM/dd/yyyy'))
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
	const handleModalClose = () => {
		setModalOpened(false)
		props.setPage(null)
	}
	return (
		<div>
			<Modal 
				opened={modalOpened}
				onClose={handleModalClose}
				title={t('income_expense_report_title')}
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
				</section>	
				<section>
					<Switch 
						label={t('aggregate_data')}
						checked={isAggregate}
						onChange={(event) => setIsAggregate(event.currentTarget.checked)}
					/>
				</section>

			<Button disabled={!(dates && dates[0] !== null && dates[1] !== null)} onClick={() => generateReport()}>{t('generate_report')}</Button>
			</Modal>
			<h1>{!!title && title}</h1>
			<ReportsTemplate 
				title={t('income')}
				data={donationData}
				total={totalDonations}
			/>
			<ReportsTemplate 
				title={t('expenses')}
				data={expenseData}
				total={totalExpenses}
			/>
		</div>
	)

}
export default IncomeExpenseReport
