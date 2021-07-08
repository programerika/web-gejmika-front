const outcome_to_color = (outcome) => {
  let colors = [];
  let out = [...outcome];
  out.sort().reverse();

  console.log("Sorted array: " + out);
  for (let index = 0; index < out.length; index++) {
    switch (out[index]) {
      case 2:
        colors[index] = "green";
        break;
      case 1:
        colors[index] = "red";
        break;
      case 0:
        colors[index] = "gray";
        break;
      default:
        break;
    }
  }
  console.log("Colors: " + colors);
  return colors;
};

export default outcome_to_color;
