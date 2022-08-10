import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTips } from "../../store/tips";

const TipSection = ({ plan, newTipMade, setNewTipMade }) => {
  const dispatch = useDispatch();
  const tips = useSelector(state => state.tips);
  let tipsArr;
  if (tips) {
    tipsArr = Object.values(tips);
  }
  console.log('tipsArr', tipsArr)

  useEffect(() => {
    dispatch(loadTips(plan?.id));
    setNewTipMade(false);
  }, [plan, newTipMade])


  return (
    <div className="tip-section-container">
      <h2>Tips</h2>
      <div id="tip-section">
        {tipsArr.map(tip => (
          <div
            className="tips"
            key={tip.id}
          >
            {tip.user && `${tip.user.username}: ${tip.tip_body}`}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TipSection;
