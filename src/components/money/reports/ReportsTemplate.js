import React from "react";
import { format } from "date-fns";
import { Table } from "@mantine/core";
import { CaretUp, CaretDown } from "tabler-icons-react";
import { useTranslation } from "react-i18next";

function ReportsTemplate(props) {
  const { t } = useTranslation();
  const rows = props.data.map((element, idx) => (
    <tr key={idx}>
      {element.date && <td>{format(element.date.toDate(), "MM/dd/yyyy")}</td>}
      {element.dayOfWeek && <td>{element.dayOfWeek}</td>}
      {element.donor_name && <td>{element.donor_name}</td>}
      {element.expense_type && <td>{element.expense_type}</td>}
      {element.method && <td>{element.method}</td>}
      {element.donation_type && <td>{element.donation_type}</td>}
      {element.source && <td>{element.source}</td>}
      {element.amount && (
        <td>
          {parseFloat(element.amount).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </td>
      )}
      {props.isDistrictReport &&
        (element.income ? (
          <td>
            {parseFloat(element.income).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </td>
        ) : (
          <td>$0.00</td>
        ))}
      {props.isDistrictReport &&
        (element.expenses ? (
          <td>
            {parseFloat(element.expenses).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </td>
        ) : (
          <td>$0.00</td>
        ))}
      {props.isDistrictReport &&
        (element.income ? (
          <td>
            {(parseFloat(element.income) * 0.1).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </td>
        ) : (
          <td>$0.00</td>
        ))}
    </tr>
  ));

  const totals = (
    <tfoot>
      <tr>
        {props.data && props.data.length > 0 && props.data[0].date && <th></th>}
        {props.data && props.data.length > 0 && props.data[0].dayOfWeek && (
          <th></th>
        )}
        {props.data && props.data.length > 0 && props.data[0].donor_name && (
          <th></th>
        )}
        {props.data && props.data.length > 0 && props.data[0].expense_type && (
          <th></th>
        )}
        {props.data && props.data.length > 0 && props.data[0].method && (
          <th></th>
        )}
        {props.data && props.data.length > 0 && props.data[0].donation_type && (
          <th></th>
        )}
        {props.data && props.data.length > 0 && props.data[0].source && (
          <th></th>
        )}
        {!props.isDistrictReport && (
          <th>${parseFloat(props.total).toFixed(2)}</th>
        )}
        {props.isDistrictReport && (
          <th>${parseFloat(props.totalDonations).toFixed(2)} </th>
        )}
        {props.isDistrictReport && (
          <th>${parseFloat(props.totalExpenses).toFixed(2)} </th>
        )}
        {props.isDistrictReport && (
          <th>${(parseFloat(props.totalDonations) * 0.1).toFixed(2)} </th>
        )}
      </tr>
    </tfoot>
  );

  let renderSorting = (
    <span>
      <CaretUp />
      <CaretDown />
    </span>
  );

  return (
    <div>
      {props.data && props.data.length > 0 ? (
        <div>
          <div>
            <h2>{props.title}</h2>
          </div>
          <Table>
            <thead>
              <tr>
                {props.data[0].date && (
                  <th>
                    {t("date")} {renderSorting}
                  </th>
                )}
                {props.data[0].dayOfWeek && (
                  <th>
                    {t("day")} {renderSorting}
                  </th>
                )}
                {props.data[0].donor_name && (
                  <th>
                    {t("donor")} {renderSorting}
                  </th>
                )}
                {props.data[0].expense_type && (
                  <th>
                    {t("type")} {renderSorting}
                  </th>
                )}
                {props.data[0].method && (
                  <th>
                    {t("method")} {renderSorting}
                  </th>
                )}
                {props.data[0].donation_type && (
                  <th>
                    {t("type")} {renderSorting}
                  </th>
                )}
                {props.data[0].source && (
                  <th>
                    {t("source")} {renderSorting}
                  </th>
                )}
                {props.isDistrictReport ? (
                  <th>
                    {t("income")} {renderSorting}
                  </th>
                ) : (
                  props.data[0].amount && (
                    <th>
                      {t("amount")} {renderSorting}
                    </th>
                  )
                )}
                {props.isDistrictReport && (
                  <th>
                    {t("expense")} {renderSorting}
                  </th>
                )}
                {props.isDistrictReport && (
                  <th>
                    {t("tithes")} {renderSorting}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
            {totals}
          </Table>
        </div>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}
export default ReportsTemplate;
