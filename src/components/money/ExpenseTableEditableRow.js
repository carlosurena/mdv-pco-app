import React, {useState, useEffect} from 'react'
import { Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import MDVSelect from '../shared/MDVSelect';
import MDVNumberInput from '../shared/MDVNumberInput';
import { format } from 'date-fns'
import { updateExpense } from '../../firebase/expenseRequests'


function ExpenseTableEditableRow(props) {
	const [expenseData, setExpenseData] = useState([]);
	const [id,setId] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	const updateExpenseData = (newData) => {
		// console.log(newData)
		setExpenseData(data => ({
			...data,
			...newData
		}));
	}

	const updateExpenseType = (val) => {
		console.log("updateExpenseType", val)
		!!val && val.length > 0 ? updateExpenseData({'expense_type' : val[0]}) : updateExpenseData({'expense_type' : ''})
	}

	const updateAmount = (value) => {
		updateExpenseData({'amount' : value})
	}

	const updateDate = (value) => {
		value && updateExpenseData({'date' : value.toDate()})
	}


	const saveEdit = () => {
		updateExpense(id,expenseData)
		setIsEditing(false)
	}

	useEffect(() => {
		setExpenseData(props.expense)
		props.expense.id && setId(props.expense.id)
		updateDate(props.expense.date)
		// initializeEditableFieldData();
	}, [])

	return (
		<tr key={id}>
			{ isEditing ? (
			<td>
				<DatePicker placeholder='Pick Date'
					label="Date"
					required
					inputFormat="MM/DD/YYYY"
					labelFormat="MM/YYYY"	
					onChange={(query) => updateExpenseData({ 'date' : query})}
					value={expenseData.date ? (expenseData.date instanceof Date ? expenseData.date : expenseData.date.toDate()) : ''}
				/>
			</td>) : (<td>{expenseData.date && format(expenseData.date, 'MM/dd/yyyy')}</td>)}
			{ isEditing ? (
			<td>
				<MDVSelect 
						data={props.expenseTypes} 
						label='Expense Type'
						setValue={updateExpenseType}
						value={expenseData.expense_type === '' ? [] :  [expenseData.expense_type]}

					/>
			</td>) : (<td>{expenseData.expense_type}</td>)}
			{ isEditing ? (
			<td>
				<MDVNumberInput 
					label="Amount"
					setAmount={updateAmount}
					value={expenseData.amount}
				/>

			</td>) : (<td>${expenseData.amount}</td>)}
			{ isEditing ? (<td><Button disabled={!(expenseData.date && expenseData.amount && expenseData.expense_type)} onClick={() => saveEdit()}>Save</Button></td>) : (<td><Button onClick={() => setIsEditing(true)}>Edit</Button><Button color='red' onClick={() => props.deleteExpense(id)}>Delete</Button></td>)}

		</tr>
	)

}
export default ExpenseTableEditableRow
