import React, { useState, useEffect } from "react";
import {
  getDonations,
  getDonationTotalsAggregate,
  getDonationTypes,
} from "../../../firebase/donationRequests";
import ReportsTemplate from "./ReportsTemplate";
import { isToday } from "date-fns";
import {
  Modal,
  Button,
  Switch,
  Indicator,
  MultiSelect,
  SegmentedControl,
  Loader,
} from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { PDFViewer } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import {
  getExpenses,
  getExpenseTotalsAggregate,
  getExpenseTypes,
} from "../../../firebase/expenseRequests";
import { PDFTemplate } from "./PDFTemplate";

function GeneralReport(props) {
  const { t } = useTranslation();
  const [donationData, setDonationData] = useState([]);
  const [donationType, setDonationType] = useState();
  const [donationTypes, setDonationTypes] = useState("");
  const [expenseData, setExpenseData] = useState([]);
  const [expenseType, setExpenseType] = useState();
  const [expenseTypes, setExpenseTypes] = useState("");
  const [total, setTotal] = useState(0);
  const [dates, setDates] = useState("");
  const [modalOpened, setModalOpened] = useState(true);
  const [title, setTitle] = useState("");
  const [isAggregate, setIsAggregate] = useState(false);
  const [isExpense, setIsExpense] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDonationTypes().then((data) => {
      setDonationTypes(data);
    });
    getExpenseTypes().then((data) => {
      setExpenseTypes(data);
    });
  }, []);

  const generateReport = () => {
    setLoading(true);
    setTitle(t("general_report_title_generated"));
    if (isAggregate) {
      if (isExpense) {
        getExpenseTotalsAggregate(dates[0], dates[1], expenseType)
          .then((data) => {
            setExpenseData(data.data);
            setTotal(data.total);
            setModalOpened(false);
            setLoading(false);
          })
          .catch((e) => {
            console.error("error retrieving data");
          });
      } else {
        getDonationTotalsAggregate(dates[0], dates[1], donationType)
          .then((data) => {
            setDonationData(data.data);
            setTotal(data.total);
            setModalOpened(false);
            setLoading(false);
          })
          .catch((e) => {
            console.error("error retrieving data");
          });
      }
    } else {
      if (isExpense) {
        getExpenses(dates[0], dates[1], { type: expenseType }).then((data) => {
          setExpenseData(data.data);
          setTotal(data.total);
          setModalOpened(false);
          setLoading(false);
        });
      } else {
        getDonations(dates[0], dates[1], { types: donationType }).then(
          (data) => {
            setDonationData(data.data);
            setTotal(data.total);
            setModalOpened(false);
            setLoading(false);
          }
        );
      }
    }
  };
  const handleModalClose = () => {
    setModalOpened(false);
    props.setPage(null);
  };
  return (
    <div>
      <Modal
        opened={modalOpened}
        onClose={handleModalClose}
        title={t("general_report_title")}
      >
        <section className="centered-control">
          <SegmentedControl
            data={[
              { label: t("donations"), value: "donations" },
              { label: t("expenses"), value: "expenses" },
            ]}
            value={isExpense ? "expenses" : "donations"}
            onChange={(q) =>
              q === "expenses" ? setIsExpense(true) : setIsExpense(false)
            }
          />
        </section>
        <section>
          <DateRangePicker
            placeholder={t("pick_date")}
            label={t("pick_date_range")}
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
            onChange={(query) => setDates(query)}
            value={dates}
          />
        </section>
        <section>
          {isExpense
            ? expenseTypes && (
                <MultiSelect
                  data={expenseTypes}
                  label={t("filterby_expense_type")}
                  onChange={(query) => setExpenseType(query)}
                  disabled={isAggregate}
                  value={expenseType}
                />
              )
            : donationTypes && (
                <MultiSelect
                  data={donationTypes}
                  label={t("filterby_donation_type")}
                  onChange={(query) => setDonationType(query)}
                  disabled={isAggregate}
                  value={donationType}
                />
              )}
        </section>
        <section>
          <Switch
            label={t("aggregate_data")}
            checked={isAggregate}
            onChange={(event) => setIsAggregate(event.currentTarget.checked)}
          />
        </section>

        <Button
          disabled={!(dates && dates[0] !== null && dates[1] !== null)}
          onClick={() => generateReport()}
        >
          {t("generate_report")}
        </Button>
      </Modal>
      {loading ? (
        <Loader />
      ) : (donationData && donationData.length > 0) ||
        (expenseData && expenseData.length > 0) ? (
        <div>
          <ReportsTemplate
            title={title}
            data={isExpense ? expenseData : donationData}
            total={total}
          />
          {(expenseData || donationData) && (
            <PDFViewer className="pdf-viewer">
              <PDFTemplate
                title={title}
                dates={dates}
                data={isExpense ? expenseData : donationData}
                total={total}
                campus={"Manantial de Vida"}
              />
            </PDFViewer>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default GeneralReport;
