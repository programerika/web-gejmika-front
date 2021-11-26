import React from "react";
import styles from "./SVGIndicator.module.css";
import {useSelector} from 'react-redux';

function createPie(cx, cy, r, colors, angleShift) {
  const slices = colors.length;
  return colors.map((color,i)=>{
    const fromAngle = angleShift + (i * 360) / slices;
    const toAngle = angleShift + ((i + 1) * 360) / slices;
    const fromCoordX = cx + r * Math.sin((fromAngle * Math.PI) / 180);
    const fromCoordY = cy - r * Math.cos((fromAngle * Math.PI) / 180);
    const toCoordX = cx + r * Math.sin((toAngle * Math.PI) / 180);
    const toCoordY = cy - r * Math.cos((toAngle * Math.PI) / 180);
    const d = `M${cx},${cy} L${fromCoordX},${fromCoordY} A${r},${r} 0 0,1 ${toCoordX},${toCoordY}z`;
    return <path key={i} d={d} fill={color}/>;
  });
}

const SVGIndicator = ({ colors, angleShift = 0, order }) => {
  const outcomeIndicatorRef = useSelector((state)=>state.view.outcomeIndicatorRef);
  return (
    <div ref={order == 0 ? outcomeIndicatorRef : undefined} data-tip className={styles.indicator}>
      <svg viewBox="-5 -5 120 120" >
        {createPie(55, 55, 50, colors, angleShift)}        
      </svg>
    </div>
  );
};

SVGIndicator.defaultProps = {
  colors: ["lightgrey", "lightgrey", "lightgrey", "lightgrey"],
};

export default SVGIndicator;
