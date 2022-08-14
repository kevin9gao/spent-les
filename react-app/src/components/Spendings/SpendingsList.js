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
    // console.log('month', month);
    // console.log('day', day);
    // console.log('mmtDateStr', mmtDateStr);
    // console.log('date', date);

    return mmtDateStr === date;
  });
  // console.log('dailySpendings', dailySpendings);

  return (
    <div className="spendings-list-container">
      <ul className="spendings-list">
        {dailySpendings && dailySpendings.map(spending => (
          <li className="spendings" key={spending.id}>
            <h4 className="spending-names">
              {spending.transaction_name}
            </h4>
            <p className="spending-notes">
              {spending.transaction_notes}
            </p>
            <p className="spending-amounts">
              {`Amount: $${spending.amount}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpendingsList;
