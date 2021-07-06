import "./App.css";
import { HelloComponent } from "./lib";
import { useEffect, useState } from "react";
import new_game from "./model/new_game";
import is_target_reached from "./model/is_target_reached";
import make_attempt from "./model/make_attempt";
import next_attempt_id from "./model/next_attempt_id";
import score from "./model/score";
import test_gen from "./model/test_gen";

function App() {
  const userAttp = ["K", "P", "K", "P"];

  const [res, setRes] = useState();

  useEffect(() => {
    new_game();
    while (!is_target_reached()) {
      console.log("------ ATTEMPT -------");
      make_attempt(next_attempt_id(), test_gen());
    }
    console.log("Your score is: " + score());

    //setRes(JSON.stringify(compare_code(secret_code(), secret_code())));
  }, []);

  return (
    <div>
      <HelloComponent />
      {/* <h1>Usert attempt : {userAttp}</h1> */}
      {/* <h1>Secret Code : {}</h1> */}
      {/* {console.log(compare_code(userAttp, secret_code()))} */}
      {/* {console.log(compare_code(secret_code(), secret_code()))} */}
      <h1>Result: {res}</h1>
    </div>
  );
}

export default App;
