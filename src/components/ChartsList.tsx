import useChartData from "../hooks/useChartData";
import ChartRenderer from "./ChartRenderer";

export default function ChartsList() {
  const { charts, loading } = useChartData();

  if (loading) return <p>Loading charts...</p>;

  return (
    <div className="p-8">
      {charts.map((chart, index) => (
        <ChartRenderer key={index} chart={chart} />
      ))}
    </div>
  );
}
