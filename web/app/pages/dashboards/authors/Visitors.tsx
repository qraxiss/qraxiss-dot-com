// Import Dependencies
import { useApexCharts } from "@/hooks";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { ApexOptions } from "apexcharts";

// Local Imports
import { Badge, Card } from "@/components/ui";

// ----------------------------------------------------------------------

const chartConfig: ApexOptions = {
  colors: ["#10b981"],
  chart: {
    stacked: false,
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
      top: -20,
      bottom: -8,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.35,
      opacityTo: 0.05,
      stops: [20, 100, 100, 100],
    },
  },
  stroke: {
    width: 2,
  },
  tooltip: {
    shared: true,
  },
  legend: {
    show: false,
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
};

const series = [
  {
    name: "Visitors",
    data: [35, 20, 45, 30, 55, 27, 45],
  },
];



export function Visitors() {
  const Chart = useApexCharts()
  return (
    <Card>
      <div className="mt-3.5 flex grow items-baseline justify-between px-4 sm:px-5">
        <div>
          <p className="font-medium">Visitors</p>
          <p className="dark:text-dark-100 text-2xl font-semibold text-gray-800">
            45k
          </p>
        </div>
        <Badge
          variant="soft"
          color="success"
          className="space-x-1 rounded-full"
        >
          <ArrowTrendingUpIcon className="size-3.5" />
          <span>46%</span>
        </Badge>{" "}
      </div>

      <div className="ax-transparent-gridline">
        <Chart type="area" height="150" options={chartConfig} series={series} />
      </div>
    </Card>
  );
}
