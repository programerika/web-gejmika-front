import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const SVGIndicator = ({ colors, indID }) => {
  const reference = useRef(indID);

  function createPie(cx, cy, r) {
    const slices = colors.length;
    var fromAngle, toAngle, fromCoordX, fromCoordY, toCoordX, toCoordY, path, d;
    for (var i = 0; i < slices; i++) {
      path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      fromAngle = (i * 360) / slices;
      toAngle = ((i + 1) * 360) / slices;
      fromCoordX = cx + r * Math.cos((fromAngle * Math.PI) / 180);
      fromCoordY = cy + r * Math.sin((fromAngle * Math.PI) / 180);
      toCoordX = cx + r * Math.cos((toAngle * Math.PI) / 180);
      toCoordY = cy + r * Math.sin((toAngle * Math.PI) / 180);

      d =
        "M" +
        cx +
        "," +
        cy +
        " L" +
        fromCoordX +
        "," +
        fromCoordY +
        " A" +
        r +
        "," +
        r +
        " 0 0,1 " +
        toCoordX +
        "," +
        toCoordY +
        "z";
      path.setAttributeNS(null, "d", d);
      path.setAttributeNS(null, "fill", colors[i]);
      reference.current.appendChild(path);
    }
  }

  useEffect(() => {
    createPie(55, 55, 50);
  });

  return (
    <div className="indicator">
      <svg viewBox="-5 -5 120 120" ref={reference}></svg>
    </div>
  );
};

SVGIndicator.defaultProps = {
  colors: ["lightgrey", "lightgrey", "lightgrey", "lightgrey"],
};
export default SVGIndicator;
