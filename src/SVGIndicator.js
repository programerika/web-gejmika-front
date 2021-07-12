import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { forEach } from "async";
import { useState } from "react";
import { useRef } from "react";

const SVGIndicator = (props) => {
  const reference = useRef(props.indID);
  var fromAngle, toAngle, fromCoordX, fromCoordY, toCoordX, toCoordY, path, d;
  function createPie(cx, cy, r, slices) {
    console.log(props.indID);
    let c = [2, 3, 0, 1];
    for (var i = 0; i < slices; i++) {
      path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      fromAngle = (i * 360) / slices;
      toAngle = ((i + 1) * 360) / slices;
      console.log(fromAngle + " " + toAngle);
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
      //console.log(d);
      path.setAttributeNS(null, "d", d);
      path.setAttributeNS(null, "fill", props.colors[c[i]]);
      reference.current.appendChild(path);
    }
  }

  useEffect(() => {
    createPie(55, 55, 50, 4);
  });

  return (
    <div className="indicator">
      <svg viewBox="-5 -5 120 120" ref={reference}></svg>
    </div>
  );
};

SVGIndicator.defaultProps = {
  colors: ["grey", "grey", "grey", "grey"],
};
export default SVGIndicator;
