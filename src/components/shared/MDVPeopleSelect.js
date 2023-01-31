import React, { useState, useEffect } from "react";
import { Select } from "@mantine/core";
import { getPersonByID, searchPeopleByName } from "../../pco/requests";
import { useTranslation } from "react-i18next";

function MDVSelect(props) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const handleSearchChange = (val) => {
    searchPeopleByName(val).then((res) => {
      setData(res);
    });
    // changeValue(val)
  };
  const changeValue = (val) => {
    if (props.labelLookupRequired) {
      val
        ? getPersonByID(val)
            .then((person) => {
              // for Persons
              let name =
                (person.attributes.first_name
                  ? person.attributes.first_name
                  : "") +
                (person.attributes.middle_name
                  ? " " + person.attributes.middle_name
                  : "") +
                (person.attributes.last_name
                  ? " " + person.attributes.last_name
                  : "");
              props.updateLabelName(name);
            })
            .catch((err) => {
              props.updateLabelName("");
            })
        : props.updateLabelName("");
    }
    props.setValue(val);
  };

  return (
    <Select
      data={data}
      label={props.label}
      searchable
      creatable={!!props.createNewOption}
      getCreateLabel={(query) =>
        props.labelLookupRequired
          ? t("create_pco", { query })
          : t("create", { query })
      }
      onCreate={
        props.createNewOption
          ? (query) => props.createNewOption(query)
          : () => null
      }
      onChange={(query) => changeValue(query)}
      onSearchChange={(q) => handleSearchChange(q)}
      placeholder={props.name}
      value={props.value}
      maxDropdownHeight={160}
    />
  );
}

export default MDVSelect;
