import React from "react";
import styles from "./SVGIndicator.module.css";

function createPie(cx, cy, r, colors) {
  const slices = colors.length;
  var fromAngle, toAngle, fromCoordX, fromCoordY, toCoordX, toCoordY, d;
  var paths = [];
  for (var i = 0; i < slices; i++) {      
    fromAngle = (i * 360) / slices;
    toAngle = ((i + 1) * 360) / slices;
    fromCoordX = cx + r * Math.cos((fromAngle * Math.PI) / 180);
    fromCoordY = cy + r * Math.sin((fromAngle * Math.PI) / 180);
    toCoordX = cx + r * Math.cos((toAngle * Math.PI) / 180);
    toCoordY = cy + r * Math.sin((toAngle * Math.PI) / 180);

    d = `M${cx},${cy} L${fromCoordX},${fromCoordY} A${r},${r} 0 0,1 ${toCoordX},${toCoordY}z`;

    paths.push(<path key={i} d={d} fill={colors[i]}/>);
  }
  return paths;
}

const SVGIndicator = ({ colors }) => {
  return (
    <div className={styles.indicator}>
      <svg viewBox="-5 -5 120 120" >
        {createPie(55, 55, 50, colors)}        
      </svg>
    </div>
  );
};

SVGIndicator.defaultProps = {
  colors: ["lightgrey", "lightgrey", "lightgrey", "lightgrey"],
};

export default SVGIndicator;
