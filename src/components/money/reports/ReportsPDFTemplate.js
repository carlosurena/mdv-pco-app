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
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import logo from "../../../assets/img/logo.png";
import { useTranslation } from "react-i18next";

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
export function ReportsPDFTemplate(props) {
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

  const formatToCurrency = (num) => {
    return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image src={logo} style={styles.image} />
          <Text style={styles.church}>Bridgeport Manantial de Vida</Text>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>
            {format(props.dates[0], "MM/dd/yyyy") +
              " - " +
              format(props.dates[1], "MM/dd/yyyy")}
          </Text>
        </View>
        <View style={styles.table}>
          <Table data={props.data}>
            <TableHeader textAlign={"center"}>
              {props.data.length > 0 && props.data[0].date && (
                <TableCell>{t("date")}</TableCell>
              )}
              {props.data.length > 0 && props.data[0].dayOfWeek && (
                <TableCell>{t("day")}</TableCell>
              )}
              {props.data.length > 0 && props.data[0].donor_name && (
                <TableCell>{t("donor")}</TableCell>
              )}
              {props.data.length > 0 && props.data[0].donation_type && (
                <TableCell>{t("type")}</TableCell>
              )}
              {props.data.length > 0 && props.data[0].source && (
                <TableCell>{t("source")}</TableCell>
              )}
              {props.data.length > 0 && props.data[0].expense_type && (
                <TableCell>{t("type")}</TableCell>
              )}
              {props.data.length > 0 && props.data[0].method && (
                <TableCell>{t("method")}</TableCell>
              )}
              {props.isDistrictReport ? (
                <TableCell>{t("income")}</TableCell>
              ) : (
                props.data[0].amount && <TableCell>{t("amount")}</TableCell>
              )}
              {props.isDistrictReport && <TableCell>{t("expenses")}</TableCell>}
              {props.isDistrictReport && <TableCell>{t("tithes")}</TableCell>}
            </TableHeader>
            <TableBody textAlign={"center"}>
              {props.isDistrictReport ? (
                <DataTableCell
                  getContent={(r) => format(r.date, "MM/dd/yyyy")}
                />
              ) : (
                props.data[0].date && (
                  <DataTableCell
                    getContent={(r) => format(r.date.toDate(), "MM/dd/yyyy")}
                  />
                )
              )}
              {props.data.length > 0 && props.data[0].dayOfWeek && (
                <DataTableCell getContent={(r) => r.dayOfWeek} />
              )}
              {props.data.length > 0 && props.data[0].donor_name && (
                <DataTableCell getContent={(r) => r.donor_name} />
              )}
              {props.data.length > 0 && props.data[0].donation_type && (
                <DataTableCell getContent={(r) => r.donation_type} />
              )}
              {props.data.length > 0 && props.data[0].source && (
                <DataTableCell getContent={(r) => r.source} />
              )}
              {props.data.length > 0 && props.data[0].expense_type && (
                <DataTableCell getContent={(r) => r.expense_type} />
              )}
              {props.data.length > 0 && props.data[0].method && (
                <DataTableCell getContent={(r) => r.method} />
              )}
              {props.data[0].amount && (
                <DataTableCell
                  getContent={(r) =>
                    r.amount ? formatToCurrency(parseFloat(r.amount)) : "$0.00"
                  }
                />
              )}
              {props.isDistrictReport &&
                (props.data[0].income ? (
                  <DataTableCell
                    getContent={(r) =>
                      r.income
                        ? formatToCurrency(parseFloat(r.income))
                        : "$0.00"
                    }
                  />
                ) : (
                  <DataTableCell getContent={() => "$0.00"} />
                ))}
              {props.isDistrictReport &&
                (props.data[0].expenses ? (
                  <DataTableCell
                    getContent={(r) =>
                      r.expenses
                        ? formatToCurrency(parseFloat(r.expenses))
                        : "$0.00"
                    }
                  />
                ) : (
                  <DataTableCell getContent={() => "$0.00"} />
                ))}
              {props.isDistrictReport &&
                (props.data[0].income ? (
                  <DataTableCell
                    getContent={(r) =>
                      r.income
                        ? formatToCurrency(parseFloat(r.income))
                        : "$0.00"
                    }
                  />
                ) : (
                  <DataTableCell getContent={() => "$0.00"} />
                ))}
            </TableBody>
          </Table>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        {props.reportType === "detailed" && (
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
                <Table data={props.typeTotals}>
                  <TableBody>
                    <DataTableCell getContent={(r) => r.label} />
                    <DataTableCell
                      getContent={(r) =>
                        r.value.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      }
                    />
                  </TableBody>
                </Table>
              </View>
            )}

            {((props.methodTotals && props.methodTotals.length > 0) ||
              (props.sourceTotals && props.sourceTotals.length > 0)) && (
              <View style={styles.table}>
                <Text>
                  {props.isExpense
                    ? t("totals_by_method")
                    : t("totals_by_source")}
                </Text>
                <Table
                  data={
                    props.isExpense ? props.methodTotals : props.sourceTotals
                  }
                >
                  <TableBody>
                    <DataTableCell getContent={(r) => r.label} />
                    <DataTableCell
                      getContent={(r) =>
                        r.value.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      }
                    />
                  </TableBody>
                </Table>
              </View>
            )}

            <View style={styles.table}>
              <Text>{t("attendance")}</Text>
              <Table data={attendanceRows}>
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
              </Table>
            </View>
          </View>
        )}

        <View>
          <Text>
            {props.isDistrictReport ? "Net: " : "Total: "}{" "}
            {formatToCurrency(parseFloat(props.total))}
          </Text>
          {props.reportType === "detailed" && (
            <Text>
              {t("total_tithes_offerings")}:{" "}
              {formatToCurrency(getTotalTithesOfferings())}
            </Text>
          )}
          {props.reportType === "detailed" && (
            <Text>
              {" "}
              10%: {formatToCurrency(getTotalTithesOfferings() * 0.1)}
            </Text>
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
      </Page>
    </Document>
  );
}
