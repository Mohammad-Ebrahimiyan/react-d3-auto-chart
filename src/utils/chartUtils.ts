import {
  SingleSeriesChartSchema,
  MultiSeriesChartSchema,
} from "./chartSchemas";

import type {
  SingleSeriesDataPoint,
  MultiSeriesDataPoint,
  MultiSeriesInputRow,
} from "../types/chart";

export function normalizeData(
  chart: unknown
): SingleSeriesDataPoint[] | MultiSeriesDataPoint[] | [] {
  if (MultiSeriesChartSchema.safeParse(chart).success) {
    const typed = chart as { data: MultiSeriesInputRow[] };
    return typed.data.map(([timestamp, values]) => [
      timestamp,
      values[0] ?? null,
      values[1] ?? null,
      values[2] ?? null,
    ]) as MultiSeriesDataPoint[];
  }

  if (SingleSeriesChartSchema.safeParse(chart).success) {
    const typed = chart as { data: SingleSeriesDataPoint[] };
    return typed.data;
  }

  return [];
}
export function isSingleSeries(
  data: SingleSeriesDataPoint[] | MultiSeriesDataPoint[] | []
): data is SingleSeriesDataPoint[] {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    Array.isArray(data[0]) &&
    data[0].length === 2
  );
}

export function isMultiSeries(
  data: SingleSeriesDataPoint[] | MultiSeriesDataPoint[] | []
): data is MultiSeriesDataPoint[] {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    Array.isArray(data[0]) &&
    data[0].length === 4
  );
}
