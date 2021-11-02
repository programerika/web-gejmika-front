import React from "react";
import styles from "./SVGIndicator.module.css";

function createPie(cx, cy, r, colors) {
  const slices = colors.length;
  return colors.map((color,i)=>{
    const fromAngle = (i * 360) / slices;
    const toAngle = ((i + 1) * 360) / slices;
    const fromCoordX = cx + r * Math.cos((fromAngle * Math.PI) / 180);
    const fromCoordY = cy + r * Math.sin((fromAngle * Math.PI) / 180);
    const toCoordX = cx + r * Math.cos((toAngle * Math.PI) / 180);
    const toCoordY = cy + r * Math.sin((toAngle * Math.PI) / 180);
    const d = `M${cx},${cy} L${fromCoordX},${fromCoordY} A${r},${r} 0 0,1 ${toCoordX},${toCoordY}z`;
    return <path key={i} d={d} fill={color}/>;
  });
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
