// Import Dependencies
import { ApexOptions } from "apexcharts";
import { useApexCharts } from "@/hooks/useApexCharts";

// ----------------------------------------------------------------------

const options: ApexOptions = {
  colors: ["#a855f7"],
  chart: {
    dropShadow: {
      enabled: true,
      color: "#1E202C",
      top: 18,
      left: 6,
      blur: 8,
      opacity: 0.1,
    },
  },
  stroke: {
    width: 8,
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "1/11/2000",
      "2/11/2000",
      "3/11/2000",
      "4/11/2000",
      "5/11/2000",
      "6/11/2000",
      "7/11/2000",
    ],
    tickAmount: 10,
    labels: {
      formatter: function (_value, timestamp, opts) {
        return timestamp ? opts.dateFormatter(new Date(timestamp), "dd MMM") : "";
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#86efac"],
      shadeIntensity: 1,
      type: "horizontal",
      opacityFrom: 1,
      opacityTo: 0.95,
      stops: [0, 100, 0, 100],
    },
  },
  yaxis: {
    min: -10,
    max: 40,
  },
};

export function Line() {
  const series = [
    {
      name: "Sales",
      data: [14, 13, 10, 9, 19, 22, 25],
    },
  ];

  return (
    <div className="max-w-lg">
      <Chart series={series} type="line" height="350" options={options} />
    </div>
  );
}
