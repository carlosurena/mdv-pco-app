import React, { useState, useEffect } from "react";
import { getDonationsByDateAndPerson } from "../../../firebase/donationRequests";
import ReportsTemplate from "./ReportsTemplate";
import { isToday } from "date-fns";
import { Modal, Button, Indicator, TextInput } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { getAllPeopleReshaped } from "../../../pco/requests";
import { PDFViewer } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import MDVMultiSelect from "../../shared/MDVMultiSelect";
import { PDFTemplate } from "./PDFTemplate";

function IndividualReport(props) {
  const { t } = useTranslation();
  const [donationData, setDonationData] = useState([]);
  const [ids, setIds] = useState("");
  // const [donorNames, setDonorNames] = useState('')
  const [dates, setDates] = useState("");
  const [modalOpened, setModalOpened] = useState(true);
  const [people, setPeople] = useState([]);
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState(0);
  const [customTitle, setCustomTitle] = useState("");

  useEffect(() => {
    const fetchPeople = async () => {
      setPeople(await getAllPeopleReshaped());
    };
    fetchPeople().catch(console.error);
  }, []);

  const generateReport = async () => {
    // let flattenedDonorNames = donorNames && donorNames.join(", ")
    let flattenedDonorNames = "";
    setTitle(t("individual_report_title_generated") + flattenedDonorNames);
    getDonationsByDateAndPerson(ids, dates[0], dates[1]).then((data) => {
      setDonationData(data.data);
      setTotal(data.total);
      setModalOpened(false);
    });
    console.log(total, "total");
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
        title={t("individual_report_title")}
      >
        <section>
          <MDVMultiSelect
            data={people}
            label={t("donor")}
            value={ids}
            maxSelectedValues={5}
            searchable
            setValue={setIds}
            labelLookupRequired
          />
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
          <TextInput
            placeholder={t("custom_title")}
            label={t("custom_title")}
            value={customTitle}
            onChange={(event) => setCustomTitle(event.currentTarget.value)}
          />
        </section>
        <Button
          disabled={
            !(
              ids &&
              ids.length > 0 &&
              dates &&
              dates[0] !== null &&
              dates[1] !== null
            )
          }
          onClick={() => generateReport()}
        >
          {t("generate_report")}
        </Button>
      </Modal>
      {donationData && donationData.length > 0 ? (
        <div>
          <ReportsTemplate
            title={!!customTitle ? customTitle : title}
            data={donationData}
            total={total}
          />
          <PDFViewer className="pdf-viewer">
            <PDFTemplate
              title={!!customTitle ? customTitle : title}
              dates={dates}
              data={donationData}
              total={total}
              campus={"Manantial de Vida"}
            />
          </PDFViewer>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default IndividualReport;
