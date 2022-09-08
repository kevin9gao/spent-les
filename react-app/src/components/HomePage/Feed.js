import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsersSpendings } from "../../store/spendings";

const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOtherUsersSpendings(4));
  }, []);

  return (
    <h1>Feed</h1>
  );
}

export default Feed;
