import "./App.css";
import { HelloComponent } from "./lib";
import secret_code from "./model/secret_code";
import compare_code from "./model/compare_code";
import { useEffect, useState } from "react";

function App() {
  const userAttp = ["K", "P", "H", "P"];

  const [res, setRes] = useState();

  useEffect(() => {
    setRes(JSON.stringify(compare_code(secret_code(), secret_code())));
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
