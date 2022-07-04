import React, { Component } from 'react';
import { Button} from '@mantine/core'
import IndividualReport from './IndividualReport';
import GeneralReport from './GeneralReport';
import IncomeExpenseReport from './IncomeExpenseReport';
import DistrictReport from './DistrictReport';


const PAGES = {
	HOME : {name: 'HOME', seoName: 'Home', component: ''},
	GENERAL: {name: 'GENERAL', seoName: 'General Tithe and Offering Reports'},
	INCOME_EXPENSE: {name: 'INCOME_EXPENSE', seoName: 'Income/Expense Reports'},
	DISTRICT: {name: 'DISTRICT', seoName: 'Metro New York District Reports'},
	INDIVIDUAL: {name: 'INDIVIDUAL', seoName: 'Individual Report'},
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
				return <IndividualReport />
			case PAGES.GENERAL:
				return <GeneralReport />
			case PAGES.INCOME_EXPENSE:
				return <IncomeExpenseReport/>
			case PAGES.DISTRICT:
				return <DistrictReport />
			default:
				return null
		}
	}
	render() {
		const page = this.getCurrentPage(this.state.activePage)
		return (
			<div>
				<div><Button onClick={() => this.setPage(PAGES.INDIVIDUAL)} >{PAGES.INDIVIDUAL.seoName}</Button></div>
				<div><Button onClick={() => this.setPage(PAGES.GENERAL)}>{PAGES.GENERAL.seoName}</Button></div>

				<div><Button onClick={() => this.setPage(PAGES.INCOME_EXPENSE)}>{PAGES.INCOME_EXPENSE.seoName}</Button></div>
				<div><Button onClick={() => this.setPage(PAGES.DISTRICT)} >{PAGES.DISTRICT.seoName}</Button></div>
				
				{page}
			</div>
		)
	}
}

export default FinancialReportsPage
					