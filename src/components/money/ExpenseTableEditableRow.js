import React, {useState, useEffect} from 'react';
import { ActionIcon, Indicator } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import MDVSelect from '../shared/MDVSelect';
import MDVNumberInput from '../shared/MDVNumberInput';
import { format, isToday } from 'date-fns'
import { updateExpense } from '../../firebase/expenseRequests'
import { Check, Edit, TrashX } from 'tabler-icons-react';

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
		!!val && updateExpenseData({'expense_type' : val})
	}

	const updateExpenseMethod = (val) => {
		console.log("updateExpenseMethod", val)
		!!val && updateExpenseData({'method' : val})
	}

	const updateAmount = (value) => {
		updateExpenseData({'amount' : value})
	}

	


	const saveEdit = () => {
		updateExpense(id,expenseData)
		setIsEditing(false)
	}

	useEffect(() => {

		const updateDate = (value) => {
			value && updateExpenseData({'date' : value.toDate()})
		}
		
		setExpenseData(props.expense)
		props.expense.id && setId(props.expense.id)
		updateDate(props.expense.date)
	}, [props.expense])

	return (
		<tr key={id}>
			{ isEditing ? (
			<td>
				<DatePicker placeholder='Pick Date'
					label="Date"
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
						value={expenseData.expense_type}

					/>
			</td>) : (<td>{expenseData.expense_type}</td>)}
			{ isEditing ? (
			<td>
				<MDVSelect 
						data={props.methods} 
						label='Method'
						setValue={updateExpenseMethod}
						value={expenseData.method}

					/>
			</td>) : (<td>{expenseData.method}</td>)}
			{ isEditing ? (
			<td>
				<MDVNumberInput 
					label="Amount"
					setAmount={updateAmount}
					value={expenseData.amount}
				/>

			</td>) : (<td>${expenseData.amount}</td>)}
			{ isEditing ? (
					<td>
						<ActionIcon 
							disabled={!(expenseData.date && 
										expenseData.expense_type && 
										expenseData.method && 
										expenseData.amount)} 
							onClick={() => saveEdit()}
							variant="light"
							color="green"
							>
							<Check />
						</ActionIcon></td>) : (
					<td>
						<ActionIcon 
							onClick={() => setIsEditing(true)}
							variant="light"
							color="blue"
							>
							<Edit size={16} />
						</ActionIcon>
						<ActionIcon 
							onClick={() => props.deleteExpense(id)}
							variant="light"
							color="red"
						><TrashX /></ActionIcon>
					</td>)}
		</tr>
	)

}
export default ExpenseTableEditableRow
