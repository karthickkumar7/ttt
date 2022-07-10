import { useState, useEffect } from "react";
import * as d3 from "d3";

const Nothing = () => {
  const [xyPos, setxyPos] = useState([1000, 50]);

  useEffect(() => {
    const canvas = d3.select("#canvas");

    const y = d3.scaleLinear().domain([0, 2800]).range([0, 680]);

    canvas
      .selectAll("rect")
      .data(xyPos)
      .join("rect")
      .attr("x", (dt, i) => i * 40)
      .attr("width", "30px")
      .attr("height", (dt) => y(dt));
  }, [xyPos]);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setxyPos([e.clientX, e.clientY]);
    });
  });

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-blue-200">
      <div className="w-[100px] h-[700px] rounded bg-blue-100">
        <svg id="canvas" width="900px" height="700px"></svg>
      </div>
    </div>
  );
};

export default Nothing;
