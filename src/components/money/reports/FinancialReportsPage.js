import React, {useState} from 'react';
import { Button} from '@mantine/core'
import IndividualReport from './IndividualReport';
import GeneralReport from './GeneralReport';
import DistrictReport from './DistrictReport';
import ReportListCard from './ReportListCard';
import { useTranslation } from 'react-i18next';
import DetailedReport from './DetailedReport';

function FinancialReportsPage() {
	const { t } = useTranslation();
	const [activePage, setActivePage] = useState(null)

	const PAGES = {
		HOME : {name: 'HOME', seoName: t('home'), description: '', component: null},
		GENERAL: {name: 'GENERAL', seoName: t('general_report_title'), description: t('general_report_desc'), component: <GeneralReport setPage={setActivePage} />},
		DETAILED: {name: 'DETAILED', seoName: t('detailed_report_title'), description: t('detailed_report_desc'), component: <DetailedReport setPage={setActivePage}/>},
		DISTRICT: {name: 'DISTRICT', seoName: t('district_report_title'), description: t('district_report_desc'), component: <DistrictReport setPage={setActivePage}/>},
		INDIVIDUAL: {name: 'INDIVIDUAL', seoName: t('individual_report_title'), description: t('individual_report_desc'), component: <IndividualReport setPage={setActivePage}/>},
	}
	// const [activePageComponent, setActivePageComponent] = useState(null)
	
	// useEffect(() => {
	// 	getCurrentPage(activePage)
	// }, [activePage.seoName])
		// const page = getCurrentPage(activePage)
		return (
			<div>
				<h1>{t('reports')}</h1>
				{!activePage || activePage.name === PAGES.HOME.name ? (
					<section>
						<ReportListCard PAGES={PAGES} linkTo={PAGES.INDIVIDUAL} activePage={activePage} setActivePage={setActivePage}/>
						<ReportListCard PAGES={PAGES}  linkTo={PAGES.GENERAL} activePage={activePage} setActivePage={setActivePage}/>
						<ReportListCard PAGES={PAGES}  linkTo={PAGES.DETAILED} activePage={activePage} setActivePage={setActivePage}/>
						<ReportListCard PAGES={PAGES}  linkTo={PAGES.DISTRICT} activePage={activePage} setActivePage={setActivePage}/>
					</section>
				) : 
				<section>
					<Button onClick={() => setActivePage(PAGES.HOME)}>Back</Button>
					{activePage.component}
				</section>
				}
				
			</div>
		)
	
}

export default FinancialReportsPage
					