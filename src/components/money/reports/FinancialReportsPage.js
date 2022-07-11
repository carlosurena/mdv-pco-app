import React, { Component } from 'react';
import { Button} from '@mantine/core'
import IndividualReport from './IndividualReport';
import GeneralReport from './GeneralReport';
import IncomeExpenseReport from './IncomeExpenseReport';
import DistrictReport from './DistrictReport';
import ReportListCard from './ReportListCard';


const PAGES = {
	HOME : {name: 'HOME', seoName: 'Home', description: ''},
	GENERAL: {name: 'GENERAL', seoName: 'General Tithe and Offering Reports', description: 'Line-by-line reports on every donation made within the specified date range. Or, create an aggregate report to see who your biggest donors are!'},
	INCOME_EXPENSE: {name: 'INCOME_EXPENSE', seoName: 'Income/Expense Reports', description: "Line-by-line detailed reports of the church's income and expenses. Or, switch to an aggregate view to see your best income days, or your heaviest expenses."},
	DISTRICT: {name: 'DISTRICT', seoName: 'Metro New York District Reports', description: 'Generate Aggregated reports on donations and expenses, as well as tithing totals. Good for Metro New York District.'},
	INDIVIDUAL: {name: 'INDIVIDUAL', seoName: 'Individual Report', description: 'Quickly Generate Reports for individual people on any given date range.'},
}
export class FinancialReportsPage extends Component {

	state = {
		//List of all people in the Church
		people: null,
		//List of people returned from user query (Searchbar)
		list: undefined,
		activePage: PAGES.HOME
	}
	componentDidMount() {
		
	}

	setPage = (page) => {
		this.setState({ activePage : page})
	}

	getCurrentPage = (page) => {
		switch(page){
			case PAGES.INDIVIDUAL:
				return <IndividualReport setPage={this.setPage} home={PAGES.HOME}/>
			case PAGES.GENERAL:
				return <GeneralReport setPage={this.setPage} home={PAGES.HOME} />
			case PAGES.INCOME_EXPENSE:
				return <IncomeExpenseReport setPage={this.setPage} home={PAGES.HOME}/>
			case PAGES.DISTRICT:
				return <DistrictReport setPage={this.setPage} home={PAGES.HOME}/>
			default:
				return null
		}
	}
	render() {
		const page = this.getCurrentPage(this.state.activePage)
		return (
			<div>
				<h1>Reports</h1>
				{this.state.activePage.seoName === PAGES.HOME.seoName ? (
					<section>
						<ReportListCard linkTo={PAGES.INDIVIDUAL} activePage={this.state.activePage} setPage={this.setPage}/>
						<ReportListCard linkTo={PAGES.GENERAL} activePage={this.state.activePage} setPage={this.setPage}/>
						<ReportListCard linkTo={PAGES.INCOME_EXPENSE} activePage={this.state.activePage} setPage={this.setPage}/>
						<ReportListCard linkTo={PAGES.DISTRICT} activePage={this.state.activePage} setPage={this.setPage}/>
					</section>
				) : 
				<section>
					<Button onClick={() => this.setPage(PAGES.HOME)}>Back</Button>
					{page}
				</section>
				}
				
			</div>
		)
	}
}

export default FinancialReportsPage
					