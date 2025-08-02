import { useEffect, useState } from "react";
import type { ChartData } from "../types/chart";
import chartData from "../data/data.json";


export default function useChartData() {
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCharts(chartData as ChartData[]);
      setLoading(false);
    }, 300); 

    return () => clearTimeout(timeout);
  }, []);

  return { charts, loading };
}