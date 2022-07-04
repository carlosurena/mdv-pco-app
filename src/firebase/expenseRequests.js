import firebase from './firebase'
import { format } from 'date-fns'

export const getExpenses = async (startDate = null, endDate = null) => {
	let db = firebase.firestore();
	let expensesRef;
	let total = 0;
	if(startDate != null && endDate != null) {
		expensesRef = db.collection('expenses')
			.where('date', '>=', startDate)
			.where('date','<=',endDate)
			.orderBy('date', 'desc');
	}else if(startDate != null){
		expensesRef = db.collection('expenses')
			.where('date', '>=', startDate)
			.orderBy('date', 'desc');
	} else{
		expensesRef = db.collection('expenses').orderBy('date', 'desc');
	}
	return expensesRef.get().then(expenses => {
		var data = expenses.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id
			}
		})
		data.forEach( expense => {
			total += expense.amount
		})
		return {total, data }
	}).catch((err) => {
		console.log("there's been an error getting expenses", err)

	}
	)
}

export const getExpenseTypes = async () => {
	let db = firebase.firestore();
	let expenseTypesRef = db.collection('expense_types');

	return expenseTypesRef.get().then(types => {
		return types.docs.map(doc => {
			return {
				id: doc.id,
				value: doc.data().name,
				label: doc.data().name
			}
		})
	}).catch((err) => {
		console.log("there's been an error getting expenses", err)

	}
	)
}

export const createExpense = (expense, user) => {
	let db = firebase.firestore();
	let expensesRef = db.collection('expenses');
	expensesRef.add({
		date: expense.date,
			amount: expense.amount,
			expense_type: expense.expense_type,
            createdBy: 'test',
            creatorName: 'test',
            createdOn: new Date(),
            updatedOn: new Date()
	}).then((expense) => {
		console.log("success!",expense)
	}).catch( (err) => {
		console.log("failure!", err)
	});
}


export const createExpenseType = (et, user) => {
	let db = firebase.firestore();
	let expensesRef = db.collection('expense_types');
	expensesRef.add({
		name: et,
		createdBy: 'test',
		creatorName: 'test',
		createdOn: new Date(),
		updatedOn: new Date()
	}).then((expense) => {
		console.log("success!",expense)
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const deleteExpense = async (id) => {
	let db = firebase.firestore();
	id && db.collection('expenses').doc(id).delete().then(() => {
		console.log("success DELETE!")
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const updateExpense = async (id, data) => {
	let db = firebase.firestore();
	id && db.collection('expenses').doc(id).set({
			id: data.id,
			date: data.date,
			amount: data.amount,
			expense_type: data.expense_type,
			updatedBy: 'test',
            updatedOn: new Date()
	}).then(() => {
		console.log("success UPDATE!")
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const getExpensesByType = async (type, startDate = null, endDate = null) => {
	let db = firebase.firestore();
	console.log('getting data for expense type', type, startDate, endDate );
	let expensesRef = db.collection('expenses')
		.where('expense_type', '==', type)
	if( startDate != null && endDate != null) {
		expensesRef = expensesRef.where('date', '>=', startDate)
		.where('date','<=',endDate)
		.orderBy('date', 'desc');
	}
	let expenses = expensesRef.get().then(expenses => {
		var data = expenses.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id
			}
		})
		console.log(data)
		return data
	}).catch((err) => {
		console.log("there's been an error getting expenses", err)

	}
	)
    return expenses
}

export const getExpenseTotalsByType = async (type, startDate = null, endDate = null) => {
	let db = firebase.firestore();
	let expensesRef = db.collection('expenses').where('expense_type', '==', type);
	if (startDate != null && endDate != null) {
		expensesRef = expensesRef.where('date', '>=', startDate)
			.where('date','<=',endDate)
	}
	let total = 0;
	return expensesRef.get().then( expenses => {
		var data = expenses.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id
			}
		})

		data.forEach( don => {
			total += don.amount;
		})

		return total;

	}).catch( err => {
		console.log("there's been an error getting expense totals", err)
	})

}
export const getExpenseTotalsAggregate = async (startDate = null, endDate = null) => {
	let db = firebase.firestore();
	let expensesRef = db.collection('expenses').where('date', '>=', startDate)
			.where('date','<=',endDate)
	
	let total = 0;
	return expensesRef.get().then( expenses => {
		var dbData = expenses.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id
			}
		})

		var data = []
		dbData.reduce(function(res, value) {
			if (!res[value.expense_type]) {
				res[value.expense_type] = { expense_type: value.expense_type, type: 'expense', amount: 0 };
				data.push(res[value.expense_type])
			}
			res[value.expense_type].amount += value.amount;
			total += value.amount;
			console.log(res, value, data, total)
			return res;
		}, {});

		console.log({total, data})
		return {total, data};

	}).catch( err => {
		console.log("there's been an error getting expenses", err)
	})
}

export const getExpenseTotalsAggregateByDate = async (startDate = null, endDate = null) => {
	let db = firebase.firestore();
	let expensesRef = db.collection('expenses').where('date', '>=', startDate)
			.where('date','<=',endDate)
	
	let total = 0;
	return expensesRef.get().then( expenses => {
		var dbData = expenses.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id
			}
		})

		var data = []
		dbData.reduce(function(res, value) {
			let formattedDate = value.date.toDate();
			let dayOfWeek = format(formattedDate, 'EEEE')
			if (!res[formattedDate]) {
				res[formattedDate] = { date: value.date, type: 'expense', dayOfWeek: dayOfWeek ,amount: 0 };
				data.push(res[formattedDate])
			}
			res[formattedDate].amount += value.amount;
			total += value.amount;
			console.log(formattedDate, value, res, total)

			return res;
		}, {});

		console.log({total, data})
		return {total, data};

	}).catch( err => {
		console.log("there's been an error getting expenses", err)
	})

}