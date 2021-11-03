import React from "react";
import { useSelector } from "react-redux";
import AttemptPanel from "./AttemptPanel";
import SVGIndicator from "./SVGIndicator";
import styles from "./AttemptPanel.module.css";

const GamePanel = () => {
  const preparedAttempts = useSelector((state) => state.view.preparedAttempts);
  return (
    <>
      {preparedAttempts.map((attempt, i) => {
        return (
          <div key={i} className={styles.flexCont}>
            <AttemptPanel comb={attempt.comb}></AttemptPanel>
            <SVGIndicator colors={attempt.colors} angleShift={attempt.angleShift}></SVGIndicator>
          </div>
        );
      })}
    </>
  );
};

export default GamePanel;
