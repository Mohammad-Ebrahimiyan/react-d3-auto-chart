export type XYPoint = [number, number];
export type XYSeries = XYPoint[];

export type SingleSeriesDataPoint = [number, number | null]; 

export type MultiSeriesDataPoint = [number, number | null, number | null, number | null];
export type MultiSeriesInputRow = [number, (number | null)[]]; 

export interface ChartBase {
  title: string;
}

export interface SingleSeriesChart extends ChartBase {
  data: SingleSeriesDataPoint[];
}

export interface MultiSeriesChart extends ChartBase {
  data: MultiSeriesInputRow [];
}

export type ChartData = SingleSeriesChart | MultiSeriesChart;


