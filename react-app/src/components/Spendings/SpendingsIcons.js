import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const SpendingIcons = ({ date, calendarDay, plan }) => {
  // console.log('SpendingIcons Date', date);

  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);

  const spendingsSelector = (useSelector(state => state.spendings));
  // console.log('spendingsSelector', spendingsSelector);
  const spendingsSelectorCopy = JSON.parse(JSON.stringify(spendingsSelector));
  // console.log('spendingsSelectorCopy', spendingsSelectorCopy);
  const spendingsArray = Object.values(spendingsSelectorCopy);
  // console.log('spendingsArray', spendingsArray);

  const spendings = spendingsArray?.map(spending => {
    // console.log('spending SpendingIcons', spending);
    const mmtDate = moment(spending.date);
    // console.log('mmtDate', mmtDate);
    const year = mmtDate.year();
    let month = mmtDate.month() + 1;
    let mmtDay = mmtDate.date() + 1;
    // console.log('year month mmtDay', year, month, mmtDay)
    const lastOfSelectedMonth = moment([year, 0, 31]).month(month).date();
    if (mmtDay > lastOfSelectedMonth) {
      month++;
      mmtDay = 1;
    };
    const mmtDateStr = `${year}-${month > 9 ? month : '0' + month}-${mmtDay > 9 ? mmtDay : '0' + mmtDay}`;
    spending.date = mmtDateStr;
    return spending;
  })
  // console.log('spendings', spendings);

  useEffect(() => {}, [plan]);

  const icon = spending => {
    const amount = Number(spending.amount);

    if (amount > 100) return <>$$$</>;
    else if (amount > 10) return <>$$</>;
    else return <>$</>;
  }

  return (
    <div className="icons-container">
      <div className="days" key='calendar-day'>
        {calendarDay}
      </div>
      {spendings?.filter(spending => spending.date === `${year}-${month}-${day}`).slice(0,8).map((spending, idx) => (
        <div
          className={`spending n-${idx}`}
          key={spending.id}
        >
          {icon(spending)}
        </div>
      ))}
    </div>
  );
}

export default SpendingIcons;
