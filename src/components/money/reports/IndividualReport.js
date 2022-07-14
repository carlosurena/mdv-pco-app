import React, {useState, useEffect} from 'react'
import { getDonationsByDateAndPerson } from '../../../firebase/donationRequests'
import ReportsTemplate from './ReportsTemplate';
import { isToday } from 'date-fns'
import { Modal, Button, Indicator} from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import MDVSelect from '../../shared/MDVSelect';
import { getAllPeopleReshaped } from '../../../pco/requests'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { ReportsPDFTemplate } from './ReportsPDFTemplate'
import { useTranslation } from 'react-i18next';

function IndividualReport(props) {
	const { t } = useTranslation();
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
		setTitle(t('individual_report_title_generated') + donorName)
		getDonationsByDateAndPerson(id, dates[0] , dates[1]).then( data => {
			setDonationData(data.data)
			setTotal(data.total)
			setModalOpened(false)
		});
		console.log(total, 'total')
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
				title={t('individual_report_title')}
			>
				<section>
					<MDVSelect 
						data={people}
						label={t('donor')}
						updateLabelName={setDonorName}
						value={id}
						setValue={setId}
						labelLookupRequired={true}
					/>
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
				<Button disabled={!(id && dates && dates[0] !== null && dates[1] !== null)} onClick={() => generateReport()}>{t('generate_report')}</Button>
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
					<PDFDownloadLink document={<ReportsPDFTemplate title={title} dates={dates} data={donationData} total={total}/>} fileName="report">
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
export default IndividualReport
