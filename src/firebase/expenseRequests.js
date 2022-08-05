import firebase from './firebase'
import { format } from 'date-fns'
import { getCookie } from '../utils/cookieUtils';

export const getExpenses = async (startDate = null, endDate = null, options = {}) => {
	let campusCode = getCookie('campus_code');
	let db = firebase.firestore();
	let expensesRef;
	let total = 0;
	expensesRef = db.collection('expenses');
	if(startDate != null) {
		expensesRef = expensesRef.where('date', '>=', startDate)
	}
	if(endDate != null){
		expensesRef = expensesRef.where('date', '<=', endDate)
	} 
	if(campusCode != null){
		expensesRef = expensesRef.where('campus_code', '==', campusCode);
	}
	if(options.type != null && options.type.length > 0){
		expensesRef = expensesRef.where('expense_type', 'in', options.type);
	}
	if(options.method != null && options.method.length > 0){
		expensesRef = expensesRef.where('method', 'in', options.method);
	}
	expensesRef = expensesRef.orderBy('date', 'desc').orderBy('expense_type');

	return expensesRef.get().then(expenses => {
		let typetotals = {}
		let methodtotals = {}
		console.log(expenses)
		var data = expenses.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id
			}
		})
		data.forEach( expense => {
			total += expense.amount
			if(typetotals[expense.expense_type]){
				typetotals[expense.expense_type] += expense.amount;
			} else {
				typetotals[expense.expense_type] = expense.amount;
			}
			if(methodtotals[expense.method]){
				methodtotals[expense.method] += expense.amount;
			} else {
				methodtotals[expense.method] = expense.amount;
			}
		})
		return {typetotals, methodtotals, total, data }
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
			method: expense.method,
			campus_code: expense.campus_code,
            creatorID: user.id,
            creatorName: user.attributes.name,
            createdOn: new Date(),
			updatorID: user.id,
			updatorName: user.attributes.name,
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
		creatorID: user.id,
		creatorName: user.attributes.name,
		createdOn: new Date(),
		updatorID: user.id,
		updatorName: user.attributes.name,
		updatedOn: new Date()
	}).then((expense) => {
		console.log("success!",expense)
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const createExpenseMethod = (em, user) => {
	let db = firebase.firestore();
	let expensesRef = db.collection('expense_methods');
	expensesRef.add({
		name: em,
		creatorID: user.id,
		creatorName: user.attributes.name,
		createdOn: new Date(),
		updatorID: user.id,
		updatorName: user.attributes.name,
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


export const deleteExpenseType = async (id) => {
	let db = firebase.firestore();
	id && db.collection('expense_types').doc(id).delete().then(() => {
		console.log("success DELETE!")
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const deleteExpenseMethod = async (id) => {
	let db = firebase.firestore();
	id && db.collection('expense_methods').doc(id).delete().then(() => {
		console.log("success DELETE!")
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const updateExpense = async (id, data, user) => {
	let db = firebase.firestore();
	id && db.collection('expenses').doc(id).update({
			id: data.id,
			date: data.date,
			amount: data.amount,
			expense_type: data.expense_type,
			method: data.method,
			updatorID: user.id,
			updatorName: user.attributes.name,
            updatedOn: new Date()
	}).then(() => {
		console.log("success UPDATE!")
	}).catch( (err) => {
		console.log("failure!", err)
	});
}

export const getExpensesByType = async (type, startDate = null, endDate = null) => {
	let db = firebase.firestore();
	let campusCode = getCookie("campus_code");

	console.log('getting data for expense type', type, startDate, endDate );
	let expensesRef = db.collection('expenses')
		.where('expense_type', '==', type)
		.where('campus_code', '==', campusCode);

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
	let campusCode = getCookie("campus_code");

	let expensesRef = db.collection('expenses')
		.where('expense_type', '==', type)
		.where('campus_code', '==', campusCode);

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
	let campusCode = getCookie("campus_code");

	let expensesRef = db.collection('expenses')
		.where('date', '>=', startDate)
		.where('date','<=',endDate)
		.where('campus_code', '==', campusCode).orderBy('date', 'desc').orderBy('expense_type');

	
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

export const getExpenseTotalsAggregateByDate = async (startDate = null, endDate = null, filterByType = null) => {
	let db = firebase.firestore();
	let campusCode = getCookie("campus_code");

	let expensesRef = db.collection('expenses')
		.where('date', '>=', startDate)
		.where('date','<=',endDate)
		.where('campus_code', '==', campusCode);
	
	if (filterByType != null && filterByType.length > 0) {
		expensesRef = expensesRef.where('expense_type', 'in', filterByType)
	}
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
			// console.log(formattedDate, value, res, total)

			return res;
		}, {});

		console.log({total, data})
		return {total, data};

	}).catch( err => {
		console.log("there's been an error getting expenses", err)
	})

}