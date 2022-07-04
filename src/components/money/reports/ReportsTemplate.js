import React from 'react'
import { format } from 'date-fns'
import { Table } from '@mantine/core'

function ReportsTemplate(props) {

	const rows = props.data.map((element) => (
		<tr key={element.name}>
		  	{element.date && <td>{format(element.date.toDate(), 'MM/dd/yyyy')}</td>}
			{element.dayOfWeek && <td>{element.dayOfWeek}</td>} 
			{element.donor_name && <td>{element.donor_name}</td>} 
			{element.expense_type && <td>{element.expense_type}</td>}
			{element.donation_type && <td>{element.donation_type}</td>} 
			{element.amount && <td>${element.amount}</td>}
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
						{props.data[0].amount && <th>Amount</th>}
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
			<div>TOTAL: ${props.total} </div>
		</div> : <div>No Data</div>}
		</div>
	)

}
export default ReportsTemplate
