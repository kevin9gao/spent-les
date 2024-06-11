import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import EditSpendingModal from "./EditSpendingModal";
import DeleteSpendingModal from "./DeleteSpendingModal";

const SpendingsList = ({ date }) => {
  const spendings = Object.values(useSelector(state => state.spendings));
  // console.log('spendings', spendings);
  // console.log('SpendingsList date', date);
  const user = useSelector(state => state.session.user);

  const dailySpendings = spendings.filter(spending => {
    const mmtDate = moment(spending.date);
    const year = mmtDate.year();
    let month = mmtDate.month() + 1;
    let day = mmtDate.date() + 1;
    const lastOfSelectedMonth = moment([year, 0, 31]).month(month).date();
    if (day > lastOfSelectedMonth) {
      month++;
      day = 1;
    };
    const mmtDateStr = `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`;
    // console.log('mmtDate', mmtDate);
    // console.log('month', month);
    // console.log('day', day);
    // console.log('mmtDateStr', mmtDateStr);
    // console.log('date', date);

    return mmtDateStr === date;
  });
  // console.log('dailySpendings', dailySpendings);

  return (
    <div className="spendings-list-container">
      <div className="spendings-list">
        {dailySpendings && dailySpendings.map(spending => (
          <div className="spendings" key={spending.id}>
            <div className="spendings info">
              <h4 className="spending-names">
                {spending.transaction_name}
              </h4>
              <p className="spending-notes">
                {spending.transaction_notes}
              </p>
              <p className="spending-amounts">
                {`Amount: $${spending.amount}`}
              </p>
            </div>
            {user.id === spending.userid && (
              <div className="spending-edit-delete">
                <EditSpendingModal spending={spending} />
                <DeleteSpendingModal spending={spending} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpendingsList;
