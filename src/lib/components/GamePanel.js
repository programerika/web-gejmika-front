import React from "react";
import { useSelector } from "react-redux";
import AttemptPanel from "./AttemptPanel";
import SVGIndicator from "./SVGIndicator";
import styles from "./AttemptPanel.module.css";

const GamePanel = () => {
  const preparedAttempts = useSelector((state) => state.view.preparedAttempts);
  const outcomeIndicatorRef = useSelector(
    (state) => state.view.refs.outcomeIndicatorRef
  );

  return (
    <>
      {preparedAttempts.map((attempt, i) => {
        return (
          <div key={i} className={styles.flexCont}>
            <AttemptPanel comb={attempt.comb}></AttemptPanel>
            <div ref={i === 0 ? outcomeIndicatorRef : undefined} data-tip>
              <SVGIndicator
                colors={attempt.colors}
                angleShift={attempt.angleShift}
                order={i}
              ></SVGIndicator>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default GamePanel;
