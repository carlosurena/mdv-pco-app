import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableRow from "./TableRow";
import { useTranslation } from "react-i18next";
const styles = StyleSheet.create({
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    fontSize: 12,
  },
});

const PDFTable = ({ data, showHeader, customHeader, isDistrictReport }) => {
  const { t } = useTranslation();
  const [headers, setHeaders] = useState([]);
  const [dataTypes, setDataTypes] = useState([]);
  useEffect(() => {
    getHeaders();
		// eslint-disable-next-line
  }, []);

  const getHeaders = () => {
    if (!data) {
      return [];
    }
    let h = [];
    let dt = [];
    if (data[0].date) {
      h.push(t("date"));
      dt.push("date");
    }
    if (data[0].dayOfWeek) {
      h.push(t("day"));
      dt.push("dayOfWeek");
    }
    if (data[0].donor_name) {
      h.push(t("donor"));
      dt.push("donor_name");
    }
    if (data[0].donation_type) {
      h.push(t("type"));
      dt.push("donation_type");
    }
    if (data[0].source) {
      h.push(t("source"));
      dt.push("source");
    }
    if (data[0].expense_type) {
      h.push(t("type"));
      dt.push("expense_type");
    }
    if (data[0].method) {
      h.push(t("method"));
      dt.push("method");
    }
    if (data.find((e) => !!e.income)) {
      h.push(t("income"));
      dt.push("income");
    }
    if (data.find((e) => !!e.expenses)) {
      h.push(t("expenses"));
      dt.push("expenses");
    }
    if (data.find((e) => !!e.tithes)) {
      h.push(t("tithes"));
      dt.push("tithes");
    }
    if (data[0].amount) {
      h.push(t("amount"));
      dt.push("amount");
    }
    if (data[0].label) {
      dt.push("label");
    }
    if (data[0].value) {
      dt.push("value");
    }
    if (customHeader) {
      h = customHeader;
      let actualDataCols = dt.length;
      h.forEach((e, i) => {
        if (i > actualDataCols - 1) {
          dt.push("blank");
        }
      });
    }

    setHeaders(h);
    setDataTypes(dt);
  };
  return (
    <View style={styles.tableContainer}>
      {showHeader && (
        <TableRow
          items={headers}
          header={true}
          rowStyle={{ borderWidth: 2, borderBottomWidth: 0 }}
        />
      )}
      {data.map((row, i) => {
        let borderBottom = i >= data.length - 1 ? 2 : 0;
        return (
          <TableRow
            rowStyle={{
              borderTopWidth: 2,
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderBottomWidth: borderBottom,
            }}
            items={row}
            key={i}
            types={dataTypes}
          />
        );
      })}
      {/*<TableFooter items={data.items} />*/}
    </View>
  );
};

export default PDFTable;
