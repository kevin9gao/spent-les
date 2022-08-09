import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const user = useSelector(state => state.session.user);

  return (
    <>
      <h1>Spent-Lès</h1>
      <NavLink to='/' exact>
        Home
      </NavLink>
      <NavLink to={`/users/${user.id}/plans`} exact>
        My Spending Plans
      </NavLink>
      <NavLink to={`/users/${user.id}/DMs`} exact>
        Messages
      </NavLink>
    </>
  );
}

export default Navigation;
