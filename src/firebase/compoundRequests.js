import { getDonationTotalsAggregateByDate } from './donationRequests'
import { getExpenseTotalsAggregateByDate } from './expenseRequests'
import { parse, format } from 'date-fns'
export const getDonationsAndExpenses = async (startDate = null, endDate = null) => {

	return getDonationTotalsAggregateByDate(startDate, endDate).then( donations => {
		return getExpenseTotalsAggregateByDate(startDate, endDate).then(expenses => {
			console.log({donations, expenses})
			let jointArray = [...donations.data, ...expenses.data]
			let dateObj = groupBy(jointArray, 'date')
			console.log(dateObj)
			let result = []
			for (const [key, value] of Object.entries(dateObj)) {
				let obj = { date : parse(key, 'MM/dd/yyyy', new Date())}
				// console.log(`${key}: ${value}`);
				value && value.forEach(element => {
					if (element.type === 'donation') {
						obj.income = element.amount
					} else {
						obj.expenses = element.amount
					}
				});
				result.push(obj)
			  }
			  console.log(result)
			  return {result, donationTotal: donations.total, expenseTotal: expenses.total};
		});
	});
}

const groupBy = (array, key) => {
	// Return the end result
	return array.reduce((result, currentValue) => {
	  // If an array already present for key, push it to the array. Else create an array and push the object
	  ((result[format(currentValue[key].toDate(), 'MM/dd/yyyy')]) = result[format(currentValue[key].toDate(), 'MM/dd/yyyy')] || []).push(
		currentValue
	  );
	  // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
	  return result;
	}, {}); // empty object is the initial value for result object
  };