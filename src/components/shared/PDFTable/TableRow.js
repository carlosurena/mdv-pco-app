import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  col: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  description: {
    width: "60%",
  },
  xyz: {
    width: "40%",
  },
});

const formatToCurrency = (num) => {
  console.log(num);
  return !!num
    ? num.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : "$0.00";
};

const getData = (data, type) => {
  try {
    if (type === "date") {
      return format(data.toDate(), "MM/dd/yyyy");
    }
    if (
      type === "amount" ||
      type === "income" ||
      type === "expenses" ||
      type === "value" ||
      type === "tithes"
    ) {
      return formatToCurrency(parseFloat(data));
    }
    return data;
  } catch (e) {
    console.warn(data, e);
    return " ";
  }
};

const TableRow = ({ items, header, types, rowStyle }) => {
  let row = !!header ? (
    <Fragment>
      {items.map((col, i) => {
        let border = i < items.length - 1 ? 2 : 0;
        let width = `${(1 / items.length) * 100}%`;
        return (
          <Text
            key={col}
            style={[styles.col, { borderRight: border, width: width }]}
          >
            {col}
          </Text>
        );
      })}
    </Fragment>
  ) : (
    <Fragment>
      {types.map((type, i) => {
        let border = i < types.length - 1 ? 2 : 0;
        let width = `${(1 / types.length) * 100}%`;
        return (
          <Text
            key={type}
            style={[styles.col, { borderRight: border, width: width }]}
          >
            {getData(items[type], type)}
          </Text>
        );
      })}
    </Fragment>
  );
  return <View style={[styles.row, rowStyle]}>{row}</View>;
};

export default TableRow;
