import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AttemptPanel from "./AttemptPanel";
import comb_to_icon from "./view_model/comb_to_icon";
import outcome_to_color from "./view_model/outcome_to_color";
import InputPanel from "./InputPanel";
import all_actions from "./redux/actions";
import SVGIndicator from "./SVGIndicator";
import { SHA256 } from "crypto-js";
import { HmacSHA512 } from "crypto-js";
import Base64 from "crypto-js/enc-base64";
import CryptoJS from "crypto-js";

import Score from "./Score";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(all_actions.input_actions.start_game());
    const message = "naca";
    // const hashDigest = SHA256(message);
    // console.log(hashDigest);
    // const hmacDigest = Base64.stringify(HmacSHA512(hashDigest, "hgfrjjj"));
    // console.log(hmacDigest);
    const cipherText = CryptoJS.AES.encrypt(message, "ghkconv").toString();
    console.log(cipherText);
    const bytes = CryptoJS.AES.decrypt(cipherText, "ghkconv");
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText);
  }, []);

  const attp_in_prog = useSelector(
    (state) => state.input_reducers.attp_in_progress
  );
  const attps = useSelector((state) => state.input_reducers.attempts);
  const id = useSelector((state) => state.input_reducers.attp_id);
  const score = useSelector((state) => state.input_reducers.score);

  return (
    <>
      {score != -1 && <Score score={score}></Score>}
      <div className="wrapper">
        <div className="container">
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 === 0
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 1
                  ? comb_to_icon(attps[0].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>

            {/* <Indicator
              color={
             
              }
            ></Indicator> */}
            <SVGIndicator
              colors={
                id + 1 === 0
                  ? ["grey", "grey", "grey", "grey"]
                  : attps.length >= 1
                  ? outcome_to_color(attps[0].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="prvi"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 === 1
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 2
                  ? comb_to_icon(attps[1].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            {/* <Indicator
              color={
                id + 1 == 1
                  ? "gray"
                  : attps.length >= 2
                  ? outcome_to_color(attps[1].attempt_outcome)
                  : "gray"
              }
            ></Indicator> */}
            <SVGIndicator
              colors={
                id + 1 === 1
                  ? ["grey", "grey", "grey", "grey"]
                  : attps.length >= 2
                  ? outcome_to_color(attps[1].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="drugi"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 === 2
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 3
                  ? comb_to_icon(attps[2].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            {/* <Indicator
              color={
                id + 1 == 2
                  ? "gray"
                  : attps.length >= 3
                  ? outcome_to_color(attps[2].attempt_outcome)
                  : "gray"
              }
            ></Indicator> */}
            <SVGIndicator
              colors={
                id + 1 === 2
                  ? ["grey", "grey", "grey", "grey"]
                  : attps.length >= 3
                  ? outcome_to_color(attps[2].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="treci"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 === 3
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 4
                  ? comb_to_icon(attps[3].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            {/* <Indicator
              color={
                id + 1 == 3
                  ? "gray"
                  : attps.length >= 4
                  ? outcome_to_color(attps[3].attempt_outcome)
                  : "gray"
              }
            ></Indicator> */}
            <SVGIndicator
              colors={
                id + 1 === 3
                  ? ["grey", "grey", "grey", "grey"]
                  : attps.length >= 4
                  ? outcome_to_color(attps[3].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="cetvrti"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 === 4
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 5
                  ? comb_to_icon(attps[4].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            {/* <Indicator
              color={
                id + 1 == 4
                  ? "gray"
                  : attps.length >= 5
                  ? outcome_to_color(attps[4].attempt_outcome)
                  : "gray"
              }
            ></Indicator> */}
            <SVGIndicator
              colors={
                id + 1 === 4
                  ? ["grey", "grey", "grey", "grey"]
                  : attps.length >= 5
                  ? outcome_to_color(attps[4].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="peti"
            ></SVGIndicator>
          </div>
          <InputPanel></InputPanel>
        </div>
      </div>
    </>
  );
}

export default App;
