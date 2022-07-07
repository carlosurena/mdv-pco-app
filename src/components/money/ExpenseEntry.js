import React, {useState} from 'react'
import { Grid, Button, Indicator } from '@mantine/core'
import {DatePicker} from '@mantine/dates';
import { createExpense, createExpenseMethod, createExpenseType } from '../../firebase/expenseRequests';
import MDVSelect from '../shared/MDVSelect';
import MDVNumberInput from '../shared/MDVNumberInput';
import { isToday } from 'date-fns'
function ExpenseEntry(props) {
	const [expenseType, setExpenseType] = useState('');
	const [method, setMethod] = useState('');
	const [date, setDate] = useState('');
	const [amount, setAmount] = useState('');


	const transferValue = (event) => {
	  event.preventDefault();

	  const expense = {
		  amount : amount,
		  expense_type: expenseType,
		  method: method,
		  date: date
	  }
	  createExpense(expense, null)
	  props.fetchExpenses();
	  clearState();
	};
	
	const clearState = () => {
	  setExpenseType('');
	  setMethod('');
	  setAmount(0);
	};

	const _createNewExpenseType = (query) => {
		console.log('creating new', query)
		createExpenseType(query);
	}
	const _createNewExpenseMethod = (query) => {
		console.log('creating new', query)
		createExpenseMethod(query);
	}
	
	
	return (
	  <div>
		  {props.people && 
		  	<Grid align='flex-end'>
				<Grid.Col span={2}>
					<DatePicker 
						placeholder='Pick Date'
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
						onChange={(query) => setDate(query)}
						value={date}
					/>
				</Grid.Col>
				<Grid.Col span={3}>
					<MDVSelect 
						data={props.expenseTypes} 
						label='Expense Type'
						setValue={setExpenseType}
						value={expenseType}
						createNewOption={_createNewExpenseType}

					/>
				</Grid.Col>
				<Grid.Col span={2}>
					<MDVSelect 
						data={props.methods} 
						label='Method'
						setValue={setMethod}
						value={method}
						createNewOption={_createNewExpenseMethod}

					/>
				</Grid.Col>
				<Grid.Col span={3}>
					<MDVNumberInput 
						label="Amount"
						setAmount={setAmount}
						value={amount}
					/>
				</Grid.Col>
 				
				<Grid.Col span={2}>
					<Button onClick={transferValue} disabled={!(date && amount && method && expenseType)}>Submit</Button>
				</Grid.Col>
					
			</Grid>
		}
		 
	  </div>
	);
  }
	
  export default ExpenseEntry;