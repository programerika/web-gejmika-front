const comb_arr = ["K", "H", "P", "T", "L", "S"];
const test_gen = () => {
  let arr = [];
  for (let index = 0; index <= 3; index++) {
    let rand = Math.floor(Math.random() * comb_arr.length);
    arr[index] = comb_arr[rand];
  }
  return arr;
};

export default test_gen;
