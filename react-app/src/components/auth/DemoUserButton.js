import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const DemoUserButton = () => {
  const dispatch = useDispatch();

  const handleDemoLogin = async (e) => {
    e.preventDefault();

    const demoEmail = 'demo@aa.io';
    const demoPW = 'password';

    await dispatch(login(demoEmail, demoPW));
  };

  return (
    <button onClick={handleDemoLogin}>
      Demo User
    </button>
  );
}

export default DemoUserButton;
