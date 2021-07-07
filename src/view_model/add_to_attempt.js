import code_length from "../model/code_length";
import attp_in_progress from "./attp_in_progress";

const add_to_attempt = (icon) => {
  if (attp_in_progress.length >= 4) {
    console.log("No more attempts!");
    return;
  }
  console.log("Adding " + icon + " to attempt!..");
  attp_in_progress.push(icon);
};

export default add_to_attempt;
