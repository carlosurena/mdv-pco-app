import React, { useState, useEffect } from "react";
import DonationEntry from "./DonationEntry";
import { getAllPeopleReshaped } from "../../pco/requests";
import { Button, Loader, Table } from "@mantine/core";
import { deleteDonation } from "../../firebase/donationRequests";
import firebase from "../../firebase/firebase";
import DonationTableEditableRow from "./DonationTableEditableRow";
import { useTranslation } from "react-i18next";
import { getCookie } from "../../utils/cookieUtils";
import { MAX_ITEMS_PER_CALL } from "../../utils/constants";
import FilterButton from "../shared/FilterButton";

const db = firebase.firestore();

function DonationsPage(props) {
  const { t } = useTranslation();
  const [donationData, setDonationData] = useState([]);
  const [people, setPeople] = useState([]);
  const [sources, setSources] = useState([]);
  const [donationTypes, setDonationTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchDonations = (loadMore = false, filterObj) => {
    filterObj = filterObj ?? filters;
    const lastVisible = donationData && donationData[donationData.length - 1];
    !!loadMore ? setIsLoadingMore(true) : setIsLoading(true);

    let ref = db.collection("donations");

    if (filterObj.dates?.[0] != null) {
      ref = ref.where("date", ">=", filterObj.dates[0]);
    }
    if (filterObj.dates?.[1] != null) {
      ref = ref.where("date", "<=", filterObj.dates[1]);
    }
    ref = ref
      .where("campus_code", "==", getCookie("campus_code"))
      .orderBy("date", "desc")
      .orderBy("donor_name")
      .orderBy("createdOn", "desc");
    if (lastVisible && loadMore) {
      ref = ref.startAfter(
        lastVisible?.date,
        lastVisible?.donor_name,
        lastVisible?.createdOn
      );
    }
    ref.limit(MAX_ITEMS_PER_CALL).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setHasMoreData(data.length >= MAX_ITEMS_PER_CALL);
      setDonationData(loadMore ? donationData.concat(data) : data);
      setIsLoading(false);
      setIsLoadingMore(false);
    });
  };

  const handleFilterChange = (filterObj = {}) => {
    setFilters(filterObj);
    setIsLoading(true);
    fetchDonations(false, filterObj);
  };

  const _deleteDonation = async (id) => {
    await deleteDonation(id).then((t) => {
      console.log("deleted donation", t);
      fetchDonations();
    });
  };

  const tableRows = donationData.map((donation) => {
    return (
      <DonationTableEditableRow
        donation={donation}
        key={donation.id}
        deleteDonation={_deleteDonation}
        user={props.auth.user.data}
        people={people}
        donationTypes={donationTypes}
        sources={sources}
      />
    );
  });

  useEffect(() => {
    const fetchPeople = async () => {
      setPeople(await getAllPeopleReshaped());
    };
    fetchDonations(true);

    const unsubscribeDT = db.collection("donation_types").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      data.forEach((dt) => {
        dt.value = dt.name;
        dt.label = dt.name;
      });
      setDonationTypes(data);
    });
    const unsubscribeSources = db
      .collection("donation_sources")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => doc.data());
        data.forEach((source) => {
          source.value = source.name;
          source.label = source.name;
        });
        setSources(data);
      });

    fetchPeople().catch((err) => console.error(err));
    return () => {
      unsubscribeDT();
      unsubscribeSources();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <DonationEntry
        fetchDonations={fetchDonations}
        people={people}
        donationTypes={donationTypes}
        user={props.auth.user.data}
        sources={sources}
      />
      <section>
        <FilterButton prevFilter={filters} changeFilter={handleFilterChange} />
      </section>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>{t("date")}</th>
            <th>{t("name")}</th>
            <th>{t("donation_type")}</th>
            <th>{t("source")}</th>
            <th>{t("amount")}</th>
            <th></th>
          </tr>
        </thead>
        {isLoading ? <Loader /> : <tbody>{tableRows}</tbody>}
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
            <Button
              onClick={() => fetchDonations(true)}
              disabled={isLoadingMore}
            >
              Load More
            </Button>
          )
        )}
      </div>
    </div>
  );
}
export default DonationsPage;
