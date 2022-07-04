import React, {useState, useEffect} from 'react'
import ExpenseEntry from './ExpenseEntry'
import { getAllPeopleReshaped } from '../../pco/requests'
import { Table } from '@mantine/core'
import { getExpenses, deleteExpense } from '../../firebase/expenseRequests'
import firebase from '../../firebase/firebase'
import ExpenseTableEditableRow from './ExpenseTableEditableRow'

const db = firebase.firestore();

function ExpensesPage() {
	const [expenseData, setExpenseData] = useState([]);
	const [people, setPeople] = useState([]);
	const [expenseTypes, setExpenseTypes] = useState([]);


	const fetchExpenses = async () => {
		await getExpenses().then( data => {
			console.log('fetched expenses')
			setExpenseData(data.data)
		})
	}

	const _deleteExpense = async (id) => {
		await deleteExpense(id).then( t => {
			console.log('deleted expense', t)
			fetchExpenses();
		});
	}

	const tableRows = expenseData.map((expense) => {
	return (
			<ExpenseTableEditableRow expense={expense} key={expense.id} deleteExpense={_deleteExpense} expenseTypes={expenseTypes} />
		)
	});

	useEffect(() => {
		const fetchPeople = async () => {
			setPeople(await getAllPeopleReshaped())
		}
			
		
		const unsubscribe = db.collection('expenses').onSnapshot(snap => {
			const data = snap.docs.map(doc => doc.data())
			setExpenseData(data)
		  });
		const unsubscribeET = db.collection('expense_types').onSnapshot(snap => {
			const data = snap.docs.map(doc => doc.data())
			data.forEach( et => {
				et.value = et.name
				et.label = et.name
			})
			setExpenseTypes(data)
		});
		
		//getExpenseTypes().then(t => {setExpenseTypes(t)}).catch(err => console.error(err))
		fetchPeople().catch(err => console.error(err));
		fetchExpenses();
		return () => {
			unsubscribe()
			unsubscribeET()
		}

	}, [])
	
	return (
		<div>
			<ExpenseEntry fetchExpenses={fetchExpenses} people={people} expenseTypes={expenseTypes}/>
			<Table>
				<thead>
				<tr>
					<th>Date</th>
					<th>Expense</th>
					<th>Amount</th>
				</tr>
				</thead>
				<tbody>{tableRows}</tbody>
			</Table>
		</div>
	)

}
export default ExpensesPage
