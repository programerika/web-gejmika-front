const comb_to_icon = (comb) => {
  var icons = [];
  for (let index = 0; index < comb.length; index++) {
    switch (comb[index]) {
      case "K":
        icons[index] = "/icons/diamond.png";
        break;
      case "H":
        icons[index] = "/icons/heart.png";
        break;
      case "P":
        icons[index] = "/icons/symbol-of-spades.png";
        break;
      case "T":
        icons[index] = "/icons/clubs.png";
        break;
      case "L":
        icons[index] = "/icons/star.png";
        break;
      case "S":
        icons[index] = "/icons/traffic-light.png";
        break;
      default:
        icons[index] = "/icons/circle.png";
        break;
    }
  }
  return icons;
};

export default comb_to_icon;
