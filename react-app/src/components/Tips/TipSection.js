import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTips } from "../../store/tips";
import DeleteTipModal from "./DeleteTipModal";
import EditTipModal from "./EditTipModal";

const TipSection = ({ plan, tipChanged, setTipChanged }) => {
  const dispatch = useDispatch();
  const tips = useSelector(state => state.tips);
  let tipsArr;
  if (tips) {
    tipsArr = Object.values(tips);
  }
  console.log('tipsArr', tipsArr)

  useEffect(() => {
    dispatch(loadTips(plan?.id));
    setTipChanged(false);
  }, [plan, tipChanged])


  return (
    <div className="tip-section-container">
      <h2>Tips</h2>
      <div id="tip-section">
        {tipsArr.map(tip => (
          <div
            className="tips"
            key={tip.id}
          >
            <div className="tip-username">
              {tip.user && `${tip.user.username}:`}
            </div>
            <div className="tip-body">
              {tip.tip_body}
            </div>
            <div className="tip-edit-delete">
              <EditTipModal tip={tip} setTipChanged={setTipChanged} />
              <DeleteTipModal tip={tip} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TipSection;
