import React, { useEffect, useState } from "react";
import { Popover, Button, Text, Indicator } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useTranslation } from "react-i18next";
import { isToday } from "date-fns";

function FilterButton(props) {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const [dates, setDates] = useState(props.prevFilter.dates);
  const [disclaimerVisibility, setDisclaimerVisibility] = useState(false);

  useEffect(() => {
    setDates(props.prevFilter.dates);
  }, [props.prevFilter.dates]);

  const handleButtonClick = () => {
    props.changeFilter({ dates });
    setOpened(false);
    setDisclaimerVisibility(!!dates && !!dates[0]);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
      <Popover opened={opened} onChange={setOpened}>
        <Popover.Target>
          <Button onClick={() => setOpened((o) => !o)}>{t("filter")}</Button>
        </Popover.Target>

        <Popover.Dropdown>
          <Text>{t("filter_options")}</Text>
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

          <Button onClick={() => handleButtonClick()}>{t("apply")}</Button>
        </Popover.Dropdown>
      </Popover>
      {!!disclaimerVisibility && <Text>{t("filters_on")}</Text>}
    </div>
  );
}

export default FilterButton;
