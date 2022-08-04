import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SpendingPlanMain = () => {
  const user = useSelector(state => state.session.user);

  if (!user) return null;

  return (
    <div className="spending-plan-main-container">
      <div className="spending-plan-main-header">
        <div id="spending-plan-main-user-avatar">
          <img
            src=""
            alt='avatar'
          />
        </div>
        <div id="spending-plan-main-header-text">
          <div id="spending-plan-main-header-title">
            My Monthly Spending Plans
          </div>
          <div id="spending-plan-main-header-categories">
            <NavLink to={`/users/${user.id}/breakdown`}>
              Spendings Breakdown
            </NavLink>
            <NavLink to={`/users/${user.id}/calendar`}>
              Calendar
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpendingPlanMain;