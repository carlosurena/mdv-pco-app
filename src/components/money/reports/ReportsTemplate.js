import React from 'react'
import { format, toDate } from 'date-fns'
import { Table } from '@mantine/core'
import { CaretUp, CaretDown } from 'tabler-icons-react'


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

	const totals = 
		<tfoot>
			<tr>
				{props.data && props.data.length > 0 && props.data[0].date && <th></th>}
				{props.data && props.data.length > 0 && props.data[0].dayOfWeek && <th></th>} 
				{props.data && props.data.length > 0 && props.data[0].donor_name && <th></th>} 
				{props.data && props.data.length > 0 && props.data[0].expense_type && <th></th>}
				{props.data && props.data.length > 0 && props.data[0].donation_type && <th></th>}
				<th>{props.isDistrictReport ? 'NET' : 'TOTAL'}: ${props.total} </th>
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
							{props.data[0].date && <th>Date {renderSorting}</th>}
							{props.data[0].dayOfWeek && <th>Day {renderSorting}</th>} 
							{props.data[0].donor_name && <th>Donor {renderSorting}</th>} 
							{props.data[0].expense_type && <th>Type {renderSorting}</th>}
							{props.data[0].donation_type && <th>Type {renderSorting}</th>} 
							{props.isDistrictReport ? <th>Income {renderSorting}</th> : props.data[0].amount && <th>Amount {renderSorting}</th>}
							{props.isDistrictReport && <th>Expenses {renderSorting}</th>}
							{props.isDistrictReport && <th>Tithe {renderSorting}</th>}
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
