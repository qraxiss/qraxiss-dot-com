// Import Dependencies
import { ApexOptions } from "apexcharts";
import { useApexCharts } from "@/hooks";

// ----------------------------------------------------------------------

const options: ApexOptions = {
  fill: {
    opacity: 1,
  },
  stroke: {
    width: 1,
    colors: undefined,
  },
  yaxis: {
    show: false,
  },
  legend: {
    position: "bottom",
    horizontalAlign: "center",
  },
  plotOptions: {
    polarArea: {
      rings: {
        strokeWidth: 0,
      },
      spokes: {
        strokeWidth: 0,
      },
    },
  },
  theme: {
    monochrome: {
      color: "#F000B9",
      enabled: true,
      shadeTo: "light",
      shadeIntensity: 0.6,
    },
  },
};

export function PolarArea() {
  const series = [42, 47, 52, 58, 65];

  const chartOptions = {
    ...options,
    labels: ["Rose A", "Rose B", "Rose C", "Rose D", "Rose E"],
  };

  const Chart = useApexCharts()


  return (
    <div className="max-w-lg">
      <Chart
        series={series}
        type="polarArea"
        height="280"
        options={chartOptions}
      />
    </div>
  );
}
