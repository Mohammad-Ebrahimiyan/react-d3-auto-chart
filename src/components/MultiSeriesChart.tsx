import { useRef, useEffect } from "react";
import * as d3 from "d3";
import type { MultiSeriesDataPoint, XYPoint, XYSeries } from "../types/chart";

interface Props {
  data: MultiSeriesDataPoint[];
}

export default function MultiSeriesChart({ data }: Props) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

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

    const timestamps = data.map((d) => d[0]);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(timestamps) as XYPoint)
      .range([0, width]);

    const allValues: number[] = [];
    data.forEach((d) => {
      for (let i = 1; i < d.length; i++) {
        if (typeof d[i] === "number") {
          allValues.push(d[i] as number);
        }
      }
    });

    const y = d3
      .scaleLinear()
      .domain(d3.extent(allValues) as XYPoint)
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));

    const colors = ["blue", "green", "red"];
    const numberOfSeries = Math.max(...data.map((d) => d.length)) - 1;

    for (let i = 0; i <= numberOfSeries; i++) {
      const seriesData: XYSeries = data
        .map((d) => {
          const timestamp = d[0];
          const value = d[i];
          return typeof value === "number" ? [timestamp, value] : null;
        })
        .filter((d): d is XYPoint => d !== null);

      console.log(`Series ${i}:`, seriesData.length);

      if (seriesData.length === 0) continue;

      const line = d3
        .line<XYPoint>()
        .x((d) => x(d[0]))
        .y((d) => y(d[1]));

      svg
        .append("path")
        .datum(seriesData)
        .attr("fill", "none")
        .attr("stroke", colors[i - 1])
        .attr("stroke-width", 2)
        .attr("d", line(seriesData) || "");
    }
  }, [data]);

  return <svg ref={ref}  />;
}
