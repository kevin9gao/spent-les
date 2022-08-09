import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const SpendingsList = ({ date }) => {
  const spendings = Object.values(useSelector(state => state.spendings));
  // console.log('spendings', spendings);

  const dailySpendings = spendings.filter(spending => {
    const mmtDate = moment(spending.date);
    const year = mmtDate.year();
    const month = mmtDate.month() + 1;
    const day = mmtDate.date() + 1;
    const mmtDateStr = `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`;
    // console.log('mmtDateStr', mmtDateStr);

    return mmtDateStr === date;
  });
  // console.log('dailySpendings', dailySpendings);

  return (
    <div className="spendings-list-container">
      <ul className="spendings-list">
        {dailySpendings && dailySpendings.map(spending => (
          <li className="spendings" key={spending.id}>
            <h3 className="spending-names">
              {spending.transaction_name}
            </h3>
            <p className="spending-notes">
              {spending.transaction_notes}
            </p>
            <h4 className="spending-amounts">
              {`Amount: ${spending.amount}`}
            </h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpendingsList;
