import SingleSeriesChart from "./SingleSeriesChart";
import MultiSeriesChart from "./MultiSeriesChart";
import {
  isSingleSeries,
  isMultiSeries,
  normalizeData,
} from "../utils/chartUtils";
import type { ChartData } from "../types/chart";

interface Props {
  chart: ChartData;
}

export default function ChartRenderer({ chart }: Props) {
  const normalizedData = normalizeData(chart);

  if (!Array.isArray(normalizedData)) {
    return <p className="text-red-500"> Invalid chart data format</p>;
  }

  if (isMultiSeries(normalizedData)) {
    return (
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">{chart.title}</h2>
        <MultiSeriesChart data={normalizedData} />
      </div>
    );
  }

  if (isSingleSeries(normalizedData)) {
    return (
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">{chart.title}</h2>
        <SingleSeriesChart data={normalizedData} />
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-4">{chart.title}</h2>
      <p className="text-orange-500"> Unsupported or malformed chart data</p>
      <pre className="text-sm text-gray-500 mt-2 whitespace-pre-wrap">
        {JSON.stringify(chart.data, null, 2)}
      </pre>
    </div>
  );
}
