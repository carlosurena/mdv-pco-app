import React from 'react'
import { format, toDate } from 'date-fns'
import { Table } from '@mantine/core'

function ReportsTemplate(props) {

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

	return (
		<div>
		{ props.data && props.data.length > 0 ? <div>
			
			<div>
				{props.title}
			</div>
			<Table>
				<thead>
					<tr>
						{props.data[0].date && <th>Date</th>}
						{props.data[0].dayOfWeek && <th>Day</th>} 
						{props.data[0].donor_name && <th>Donor</th>} 
						{props.data[0].expense_type && <th>Type</th>}
						{props.data[0].donation_type && <th>Type</th>} 
						{props.isDistrictReport ? <th>{'Income'}</th> : props.data[0].amount && <th>Amount</th>}
						{props.isDistrictReport && <th>{'Expenses'}</th>}
						{props.isDistrictReport && <th>{'Tithe'}</th>}


					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
			<div>{props.isDistrictReport ? 'NET INCOME' : 'TOTAL'}: ${props.total} </div>
			{ props.isDistrictReport && <div>INCOME: ${props.totalDonations} </div>}
			{ props.isDistrictReport && <div>EXPENSES: ${props.totalExpenses} </div>}
		</div> : <div>No Data</div>}
		</div>
	)

}
export default ReportsTemplate
