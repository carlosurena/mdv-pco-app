import { getDonationTotalsAggregateByDate } from "./donationRequests";
import { getExpenseTotalsAggregateByDate } from "./expenseRequests";
import { parse, format, getTime } from "date-fns";
import firebase from "firebase";
export const getDonationsAndExpenses = async (
  startDate = null,
  endDate = null,
  donationTypes = null,
  expenseTypes = null
) => {
  //can improve upon this strucvture by using this: https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
  return getDonationTotalsAggregateByDate(
    startDate,
    endDate,
    donationTypes
  ).then((donations) => {
    return getExpenseTotalsAggregateByDate(
      startDate,
      endDate,
      expenseTypes
    ).then((expenses) => {
      console.log({ donations, expenses });
      let jointArray = [...donations.data, ...expenses.data];
      let dateObj = groupBy(jointArray, "date");
      console.log(dateObj);
      let result = [];
      for (const [key, value] of Object.entries(dateObj)) {
        let obj = {
          date: firebase.firestore.Timestamp.fromDate(
            parse(key, "MM/dd/yyyy", new Date())
          ),
        };
        console.log(getTime(parse(key, "MM/dd/yyyy", new Date())));
        // console.log(`${key}: ${value}`);
        value &&
          value.forEach((element) => {
            if (element.type === "donation") {
              obj.income = element.amount;
              obj.tithes = element.amount * 0.1;
            } else {
              obj.expenses = element.amount;
            }
          });
        result.push(obj);
      }
      console.log(result);
      return {
        result,
        donationTotal: donations.total,
        expenseTotal: expenses.total,
      };
    });
  });
};

const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[format(currentValue[key].toDate(), "MM/dd/yyyy")] =
      result[format(currentValue[key].toDate(), "MM/dd/yyyy")] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};
