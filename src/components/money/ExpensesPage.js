import React, { useState, useEffect } from "react";
import ExpenseEntry from "./ExpenseEntry";
import { getAllPeopleReshaped } from "../../pco/requests";
import { Button, Loader, Table } from "@mantine/core";
import { deleteExpense } from "../../firebase/expenseRequests";
import firebase from "../../firebase/firebase";
import ExpenseTableEditableRow from "./ExpenseTableEditableRow";
import { useTranslation } from "react-i18next";
import { getCookie } from "../../utils/cookieUtils";
import { MAX_ITEMS_PER_CALL } from "../../utils/constants";
import FilterButton from "../shared/FilterButton";

const db = firebase.firestore();

function ExpensesPage(props) {
  const { t } = useTranslation();
  const [expenseData, setExpenseData] = useState([]);
  const [people, setPeople] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [methods, setMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  const [hasMoreData, setHasMoreData] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchExpenses = (loadMore = false, filterObj) => {
    filterObj = filterObj ?? filters;
    const lastVisible = expenseData && expenseData[expenseData.length - 1];
    !!loadMore ? setIsLoadingMore(true) : setIsLoading(true);

    let ref = db.collection("expenses");

    if (filterObj.dates?.[0] != null) {
      ref = ref.where("date", ">=", filterObj.dates[0]);
    }
    if (filterObj.dates?.[1] != null) {
      ref = ref.where("date", "<=", filterObj.dates[1]);
    }
    ref = ref
      .where("campus_code", "==", getCookie("campus_code"))
      .orderBy("date", "desc")
      .orderBy("expense_type")
      .orderBy("createdOn", "desc");
    if (lastVisible && loadMore) {
      ref = ref.startAfter(
        lastVisible?.date,
        lastVisible?.expense_type,
        lastVisible?.createdOn
      );
    }
    ref.limit(MAX_ITEMS_PER_CALL).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setHasMoreData(data.length >= MAX_ITEMS_PER_CALL);
      setExpenseData(loadMore ? expenseData.concat(data) : data);
      setIsLoading(false);
      setIsLoadingMore(false);
    });
  };

  const handleFilterChange = (filterObj = {}) => {
    setFilters(filterObj);
    setIsLoading(true);
    fetchExpenses(false, filterObj);
  };

  const _deleteExpense = async (id) => {
    console.log("attempting delete", id);
    await deleteExpense(id).then((t) => {
      console.log("deleted expense", t);
      fetchExpenses();
    });
  };

  const tableRows = expenseData.map((expense) => {
    return (
      <ExpenseTableEditableRow
        expense={expense}
        key={expense.id}
        deleteExpense={_deleteExpense}
        user={props.auth.user.data}
        expenseTypes={expenseTypes}
        methods={methods}
      />
    );
  });

  useEffect(() => {
    const fetchPeople = async () => {
      setPeople(await getAllPeopleReshaped());
    };

    fetchExpenses(true);

    const unsubscribeET = db.collection("expense_types").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      data.forEach((et) => {
        et.value = et.name;
        et.label = et.name;
      });
      setExpenseTypes(data);
    });

    const unsubscribeEM = db
      .collection("expense_methods")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        data.forEach((em) => {
          em.value = em.name;
          em.label = em.name;
        });
        setMethods(data);
      });

    //getExpenseTypes().then(t => {setExpenseTypes(t)}).catch(err => console.error(err))
    fetchPeople().catch((err) => console.error(err));
    return () => {
      unsubscribeET();
      unsubscribeEM();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <ExpenseEntry
        fetchExpenses={fetchExpenses}
        people={people}
        expenseTypes={expenseTypes}
        user={props.auth.user.data}
        methods={methods}
      />
      <section>
        <FilterButton prevFilter={filters} changeFilter={handleFilterChange} />
      </section>
      <Table>
        <thead>
          <tr>
            <th>{t("date")}</th>
            <th>{t("expense")}</th>
            <th>{t("method")}</th>
            <th>{t("amount")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 30,
          paddingBottom: 30,
        }}
      >
        {isLoadingMore ? (
          <Loader />
        ) : (
          hasMoreData && (
            <Button onClick={() => fetchExpenses(true)} disabled={isLoading}>
              Load More
            </Button>
          )
        )}
      </div>
    </div>
  );
}
export default ExpensesPage;
