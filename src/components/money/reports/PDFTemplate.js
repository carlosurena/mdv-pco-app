import React from "react";
import {
  Page,
  Image,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";

import logo from "../../../assets/img/logo.png";
import { useTranslation } from "react-i18next";
import PDFTable from "../../shared/PDFTable/PDFTable";

// const MAX_PER_PG = 35;
const styles = StyleSheet.create({
  page: {
    //flexDirection: 'row',
    //   backgroundColor: '#E4E4E4',
    padding: "20mm",
  },
  church: {
    fontSize: "16px",
    marginBottom: "15px",
    margin: "0 auto",
  },
  title: {
    fontSize: "20px",
    margin: "0 auto",
  },
  image: {
    width: "150px",
    margin: "0 auto",
  },
  subtitle: {
    fontSize: "16px",
    margin: "0 auto",
  },
  section: {
    width: "100%",
    marginBottom: "15px",
    display: "flex",
  },
  signSection: {
    width: "100%",
    flexDirection: "row",
    marginTop: "25px",
  },
  signature: {
    width: "50%",
  },
  signName: {
    width: "100%",
    textAlign: "center",
  },
  rowHeightLg: {
    height: "20px",
  },
  table: {
    margin: "15px 0",
  },
});

// Create Document Component
export function PDFTemplate(props) {
  const { t } = useTranslation();

  const attendanceRows = [
    { label: t("adults") },
    { label: t("kids") },
    { label: t("visitors") },
    { label: t("converted") },
    { label: t("communion") },
  ];

  const getTotalTithesOfferings = () => {
    let total = 0;
    props.typeTotals &&
      props.typeTotals.forEach((type) => {
        if (type.label === "Diezmo" || type.label === "Ofrendas") {
          total += type.value;
        }
      });
    return total;
  };

  const renderTotals = () => {
    return (
      <View>
        <Text>
          {props.isDistrictReport ? "Net: " : "Total: "}{" "}
          {formatToCurrency(parseFloat(props.total))}
        </Text>
        {props.reportType === "detailed" && !props.isExpense && (
          <Text>
            {t("total_tithes_offerings")}:{" "}
            {formatToCurrency(getTotalTithesOfferings())}
          </Text>
        )}
        {props.reportType === "detailed" && (
          <Text>10%: {formatToCurrency(getTotalTithesOfferings() * 0.1)}</Text>
        )}
        {props.isDistrictReport && (
          <Text>
            Total ({t("income")}):{" "}
            {formatToCurrency(parseFloat(props.totalDonations))}{" "}
          </Text>
        )}
        {props.isDistrictReport && (
          <Text>
            Total ({t("expenses")}):{" "}
            {formatToCurrency(parseFloat(props.totalExpenses))}{" "}
          </Text>
        )}
        {props.isDistrictReport && (
          <Text>
            Total ({t("tithes")}):{" "}
            {formatToCurrency(parseFloat(props.totalDonations) * 0.1)}{" "}
          </Text>
        )}
      </View>
    );
  };

  const renderSignatures = () => {
    return (
      <View>
        {props.reportType === "detailed" && (
          <View style={styles.signSection}>
            <View style={styles.signature}>
              <Text style={styles.signName}>__________________</Text>
              <Text style={styles.signName}>{t("counted_by")}</Text>
            </View>
            <View style={styles.signature}>
              <Text style={styles.signName}>__________________</Text>
              <Text style={styles.signName}>{t("counted_by")}</Text>
            </View>
          </View>
        )}
        {props.reportType === "detailed" ? (
          <View style={styles.signSection}>
            <View style={styles.signature}>
              <Text style={styles.signName}>__________________</Text>
              <Text style={styles.signName}>{t("supervisor")}</Text>
            </View>
            <View style={styles.signature}>
              <Text style={styles.signName}>__________________</Text>
              <Text style={styles.signName}>{t("date")}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.signSection}>
            <View style={styles.signature}>
              <Text style={styles.signName}>__________________</Text>
              <Text style={styles.signName}>Pastor</Text>
            </View>
            <View style={styles.signature}>
              <Text style={styles.signName}>__________________</Text>
              <Text style={styles.signName}>{t("secretary")}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderBreakdownSection = () => {
    if (props.reportType !== "detailed") return null;
    return (
      <View>
        <View>
          <Text>Breakdown</Text>
        </View>
        {props.typeTotals && props.typeTotals.length > 0 && (
          <View style={styles.table}>
            <Text>
              {props.isExpense
                ? t("totals_by_expense_type")
                : t("totals_by_donation_type")}
            </Text>
            <PDFTable data={props.typeTotals} />
          </View>
        )}

        {((props.methodTotals && props.methodTotals.length > 0) ||
          (props.sourceTotals && props.sourceTotals.length > 0)) && (
          <View style={styles.table}>
            <Text>
              {props.isExpense ? t("totals_by_method") : t("totals_by_source")}
            </Text>
            <PDFTable
              data={props.isExpense ? props.methodTotals : props.sourceTotals}
            />
          </View>
        )}

        <View style={styles.table}>
          <Text>{t("attendance")}</Text>
          <PDFTable
            data={attendanceRows}
            showHeader
            customHeader={["", t("wednesday"), "9:30AM", "12:00PM", "Total"]}
          />
          {/* <Table data={attendanceRows}>
                <TableHeader textAlign="center">
                  <TableCell>{t("")}</TableCell>
                  <TableCell>{t("wednesday")}</TableCell>
                  <TableCell>9:30AM</TableCell>
                  <TableCell>12:00PM</TableCell>
                  <TableCell>Total</TableCell>
                </TableHeader>
                <TableBody>
                  <DataTableCell
                    style={styles.rowHeightLg}
                    getContent={(r) => r.label}
                  />
                  <DataTableCell getContent={(r) => ""} />
                  <DataTableCell getContent={(r) => ""} />
                  <DataTableCell getContent={(r) => ""} />
                  <DataTableCell getContent={(r) => ""} />
                </TableBody>
              </Table> */}
        </View>
      </View>
    );
  };

  const formatToCurrency = (num) => {
    return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
  };

  const renderHeading = () => {
    return (
      <View style={styles.section}>
        <Image src={logo} style={styles.image} />
        <Text style={styles.church}>{props.campus}</Text>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>
          {format(props.dates[0], "MM/dd/yyyy") +
            " - " +
            format(props.dates[1], "MM/dd/yyyy")}
        </Text>
      </View>
    );
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {/* HEADING */}
          {renderHeading()}
          {/* TABLE */}
          <PDFTable showHeader data={props.data} />
        </View>
      </Page>

      {/* BREAKDOWN AND TOTALS PAGE */}
      <Page size="A4" style={styles.page}>
        {renderBreakdownSection()}
        {renderTotals()}
        {renderSignatures()}
      </Page>
    </Document>
  );
}
