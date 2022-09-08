import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SpendingsBreakdown from "../SpendingPlan/SpendingsBreakdown";

const Overviews = () => {
  const dispatch = useDispatch();
  const plansObj = useSelector(state => state.plans['user-plans']);
  const plans = plansObj ? Object.values(plansObj) : null;
  console.log('plans', plans);

  let overviews = plans?.map(plan => {
    const widgetMonth = `${plan.year}-${plan.month < 10 ? `0${plan.month}` : plan.month}`;

    return (
      <div className="widget-wrapper">
        <SpendingsBreakdown isWidget={true} widgetMonth={widgetMonth} />
      </div>
    );
  });

  return (
    <div className={`overviews-main-container ${plans?.length > 4 ? '' : 'no-plans'}`}>
      <div className="home-overview">
        {overviews}
      </div>
    </div>
  );
}

export default Overviews;
