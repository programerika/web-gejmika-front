import combination from "./combination";
const comb_arr = ["K", "H", "P", "T", "L", "S"];
const secret_code = () => {
  for (let index = 0; index <= 3; index++) {
    let rand = Math.floor(Math.random() * comb_arr.length);
    combination[index] = comb_arr[rand];
  }
};

export default secret_code;
