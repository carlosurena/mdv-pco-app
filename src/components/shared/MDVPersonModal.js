import React, { useEffect, useState } from "react";
import { Modal, Button, Group, TextInput, Chip, Select } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { createPerson, getAllMembershipTypes } from "../../pco/requests";
import { getCookie } from "../../utils/cookieUtils";

function MDVPersonModal(props) {
  const { t } = useTranslation();
  const [first, setFirst] = useState(props.person);
  const [last, setLast] = useState("");
  const [gender, setGender] = useState("");
  const [membership, setMembership] = useState("");
  const [membershipTypes, setMembershipTypes] = useState([]);

  useEffect(() => {
    setFirst(props.person);
    getAllMembershipTypes().then((res) => {
      setMembershipTypes(res);
    });
  }, [props.person]);

  const handleSubmit = () => {
    let data = {
      first_name: first,
      last_name: last,
      gender,
      campus_code: getCookie("campus_code"),
      membership,
      jwt: getCookie("jwt"),
    };
    createPerson(data).then((res) => {
      props.setOpened(false);
      clearValues();
    });
  };

  const clearValues = () => {
    setFirst("");
    setLast("");
    setGender("");
  };
  return (
    <>
      <Modal
        opened={props.opened}
        onClose={() => props.setOpened(false)}
        title={t("add_a_person")}
      >
        <section>
          <Group>
            <TextInput
              placeholder={t("first_name")}
              label={t("first_name")}
              value={first}
              required
              onChange={(event) => setFirst(event.currentTarget.value)}
            />
            <TextInput
              placeholder={t("last_name")}
              label={t("last_name")}
              value={last}
              required
              onChange={(event) => setLast(event.currentTarget.value)}
            />
          </Group>
        </section>
        <section>
          <Group>
            <Chip.Group multiple={false} value={gender} onChange={setGender}>
              <Chip value={"M"}>{t("male")}</Chip>
              <Chip value={"F"}>{t("female")}</Chip>
            </Chip.Group>
            <Select
              data={membershipTypes}
              onChange={(q) => setMembership(q)}
              searchable
              value={membership}
              label={t("membership_type")}
            />
          </Group>
        </section>

        <Group>
          <Button
            onClick={() => handleSubmit()}
            disabled={!(first && last && gender)}
          >
            {t("submit")}
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default MDVPersonModal;
