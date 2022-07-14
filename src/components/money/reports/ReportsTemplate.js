import React from 'react'
import { format, toDate } from 'date-fns'
import { Table } from '@mantine/core'
import { CaretUp, CaretDown } from 'tabler-icons-react'
import { useTranslation } from 'react-i18next'

function ReportsTemplate(props) {
	const { t } = useTranslation();
	const rows = props.data.map((element) => (
		<tr key={element.name}>
		  	{props.isDistrictReport ? <td>{format(toDate(element.date), 'MM/dd/yyyy')}</td>: element.date && <td>{format(element.date.toDate(), 'MM/dd/yyyy')}</td>}
			{element.dayOfWeek && <td>{element.dayOfWeek}</td>} 
			{element.donor_name && <td>{element.donor_name}</td>} 
			{element.expense_type && <td>{element.expense_type}</td>}
			{element.donation_type && <td>{element.donation_type}</td>} 
			{element.amount && <td>${element.amount}</td>}
			{props.isDistrictReport && (element.income ? <td>${element.income}</td> : <td>$0</td>)}
			{props.isDistrictReport && (element.expenses ? <td>${element.expenses}</td> : <td>$0</td>)}
			{props.isDistrictReport && (element.income ? <td>${(parseFloat(element.income)*.1).toFixed(2)}</td> : <td>$0</td>)}

		</tr>
	  ));

	const totals = 
		<tfoot>
			<tr>
				{props.data && props.data.length > 0 && props.data[0].date && <th></th>}
				{props.data && props.data.length > 0 && props.data[0].dayOfWeek && <th></th>} 
				{props.data && props.data.length > 0 && props.data[0].donor_name && <th></th>} 
				{props.data && props.data.length > 0 && props.data[0].expense_type && <th></th>}
				{props.data && props.data.length > 0 && props.data[0].donation_type && <th></th>}
				{!props.isDistrictReport && <th>${props.total}</th>}
				{ props.isDistrictReport && <th>${props.totalDonations} </th>}
				{ props.isDistrictReport && <th>${props.totalExpenses} </th>}
				{ props.isDistrictReport && <th>${(parseFloat(props.totalDonations)*.1).toFixed(2)} </th>}
			</tr>
		</tfoot>

	let renderSorting = 
	  	<span>
			<CaretUp />
			<CaretDown />
	  	</span>
	  


	return (
		<div>
		{ props.data && props.data.length > 0 ? 
			<div>
				<div>
					<h2>{props.title}</h2>
				</div>
				<Table>
					<thead>
						<tr>
							{props.data[0].date && <th>{t('date')} {renderSorting}</th>}
							{props.data[0].dayOfWeek && <th>{t('day')} {renderSorting}</th>} 
							{props.data[0].donor_name && <th>{t('donor')} {renderSorting}</th>} 
							{props.data[0].expense_type && <th>{t('type')} {renderSorting}</th>}
							{props.data[0].donation_type && <th>{t('type')} {renderSorting}</th>} 
							{props.isDistrictReport ? <th>{t('income')} {renderSorting}</th> : props.data[0].amount && <th>{t('amount')} {renderSorting}</th>}
							{props.isDistrictReport && <th>{t('expense')} {renderSorting}</th>}
							{props.isDistrictReport && <th>{t('tithes')} {renderSorting}</th>}
						</tr>
					</thead>
					<tbody>{rows}</tbody>
					{totals}
				</Table>
				
			

			</div> : <div>No Data</div>}
		</div>
	)

}
export default ReportsTemplate
