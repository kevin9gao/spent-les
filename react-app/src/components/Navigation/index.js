import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h1>Spent-Lès</h1>
      <NavLink to='/' exact>
        Home
      </NavLink>
      <NavLink to='/' exact>
        My Spending Plans
      </NavLink>
      <NavLink to='/' exact>
        Messages
      </NavLink>
    </>
  );
}

export default Navigation;
