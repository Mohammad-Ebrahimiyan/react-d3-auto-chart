import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { SingleSeriesDataPoint, XYPoint, XYSeries } from "../types/chart";

interface Props {
  data: SingleSeriesDataPoint[];
}

export default function SingleSeriesChart({ data }: Props) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const validData = data.filter((d) => d[1] !== null) as XYSeries;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 1200 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(validData, (d) => d[0]) as XYPoint)
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(validData, (d) => d[1]) as XYPoint)
      .range([height, 0]);

    const line = d3
      .line<XYPoint>()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    svg
      .append("path")
      .datum(validData)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={ref} />;
}
