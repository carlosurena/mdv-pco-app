import React, { useState } from "react";
import { Grid, Button, Indicator } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  createExpense,
  createExpenseMethod,
  createExpenseType,
} from "../../firebase/expenseRequests";
import MDVSelect from "../shared/MDVSelect";
import MDVNumberInput from "../shared/MDVNumberInput";
import { isToday } from "date-fns";
import { useTranslation } from "react-i18next";
import { getCookie } from "../../utils/cookieUtils";
import ConfirmationModal from "../shared/ConfirmationModal";

function ExpenseEntry(props) {
  const { t } = useTranslation();
  const [expenseType, setExpenseType] = useState("");
  const [method, setMethod] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [createVal, setCreateVal] = useState("");
  const [createFunc, setCreateFunc] = useState(undefined);

  const transferValue = (event) => {
    event.preventDefault();

    const expense = {
      amount: amount,
      expense_type: expenseType,
      method: method,
      campus_code: getCookie("campus_code"),
      date: date,
    };
    createExpense(expense, props.user);
    props.fetchExpenses();
    clearState();
  };

  const clearState = () => {
    setExpenseType("");
    setMethod("");
    setAmount(0);
  };

  const _createNewExpenseType = (query) => {
    setCreateVal(query);
    setCreateFunc(() => createExpenseType);
    setIsConfirmationModal(true);
  };
  const _createNewExpenseMethod = (query) => {
    setCreateVal(query);
    setCreateFunc(() => createExpenseMethod);
    setIsConfirmationModal(true);
  };
  const confirmCreate = () => {
    createFunc(createVal, props.user);
    setIsConfirmationModal(false);
  };

  return (
    <section>
      <ConfirmationModal
        opened={isConfirmationModal}
        setOpened={setIsConfirmationModal}
        confirmFunction={confirmCreate}
        text={t("are_you_sure_create")}
        confirmText={t("create", { query: createVal })}
      />
      <h1>{t("expenses")}</h1>
      {props.people && (
        <Grid align="flex-end">
          <Grid.Col span={2}>
            <DatePicker
              placeholder="Pick Date"
              label={t("date")}
              required
              inputFormat="MM/DD/YYYY"
              labelFormat="MM/YYYY"
              renderDay={(date) => {
                const day = date.getDate();
                return (
                  <Indicator
                    size={6}
                    color="red"
                    offset={8}
                    disabled={!isToday(date)}
                  >
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
              label={t("expense_type")}
              setValue={setExpenseType}
              value={expenseType}
              createNewOption={_createNewExpenseType}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <MDVSelect
              data={props.methods}
              label={t("method")}
              setValue={setMethod}
              value={method}
              createNewOption={_createNewExpenseMethod}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <MDVNumberInput
              label={t("amount")}
              setAmount={setAmount}
              value={amount}
            />
          </Grid.Col>

          <Grid.Col span={2}>
            <Button
              onClick={transferValue}
              disabled={!(date && amount && method && expenseType)}
            >
              {t("submit")}
            </Button>
          </Grid.Col>
        </Grid>
      )}
    </section>
  );
}

export default ExpenseEntry;
