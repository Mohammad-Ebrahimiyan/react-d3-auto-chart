import { z } from "zod";

export const SingleSeriesDataPointSchema = z.tuple([
  z.number(),
  z.union([z.number(), z.null()]),
]);

export const MultiSeriesDataPointSchema = z.tuple([
  z.number(),
  z.array(z.union([z.number(), z.null()])).length(3), 
]);

export const SingleSeriesChartSchema = z.object({
  title: z.string(),
  data: z.array(SingleSeriesDataPointSchema),
});

export const MultiSeriesChartSchema = z.object({
  title: z.string(),
  data: z.array(MultiSeriesDataPointSchema),
});

export const ChartDataSchema = z.union([
  SingleSeriesChartSchema,
  MultiSeriesChartSchema,
]);

export const ChartDataArraySchema = z.array(ChartDataSchema);