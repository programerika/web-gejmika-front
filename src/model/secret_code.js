const comb_arr = ["K", "H", "P", "T", "L", "S"];
const secret_code = () => {
  let code = [];
  for (let index = 0; index <= 3; index++) {
    let rand = Math.floor(Math.random() * comb_arr.length);
    code[index] = comb_arr[rand];
  }
  return code;
};

export default secret_code;
