import attp_in_progress from "./attp_in_progress";

const cancel_attp = () => {
  attp_in_progress.length = 0;
};

export default cancel_attp;
