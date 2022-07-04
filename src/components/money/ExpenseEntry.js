import React, {useState} from 'react'
import { Grid, Button } from '@mantine/core'
import {DatePicker} from '@mantine/dates';
import { createExpense, createExpenseType } from '../../firebase/expenseRequests';
import MDVSelect from '../shared/MDVSelect';
import MDVNumberInput from '../shared/MDVNumberInput';

function ExpenseEntry(props) {
	const [expenseType, setExpenseType] = useState('');
	const [date, setDate] = useState('');
	const [amount, setAmount] = useState('');


	const transferValue = (event) => {
	  event.preventDefault();

	  const expense = {
		  amount : amount,
		  expense_type: expenseType,
		  date: date
	  }
	  createExpense(expense, null)
	  props.fetchExpenses();
	  clearState();
	};
	
	const clearState = () => {
	  setExpenseType('');
	  setAmount(0);
	};

	const _createNewExpenseType = (query) => {
		console.log('creating new', query)
		createExpenseType(query);
	}
	
	return (
	  <div>
		  {props.people && 
		  	<Grid align='flex-end'>
				<Grid.Col span={3}>
					<DatePicker 
						placeholder='Pick Date'
						label="Date"
						required
						inputFormat="MM/DD/YYYY"
						labelFormat="MM/YYYY"	
						onChange={(query) => setDate(query)}
						value={date}
					/>
				</Grid.Col>
				<Grid.Col span={4}>
					<MDVSelect 
						data={props.expenseTypes} 
						label='Expense Type'
						setValue={setExpenseType}
						value={expenseType}
						createNewOption={_createNewExpenseType}

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
					<Button onClick={transferValue} disabled={!(date && amount && expenseType)}>Submit</Button>
				</Grid.Col>
					
			</Grid>
		}
		 
	  </div>
	);
  }
	
  export default ExpenseEntry;