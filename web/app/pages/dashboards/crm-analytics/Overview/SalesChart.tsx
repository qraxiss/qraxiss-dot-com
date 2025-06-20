// Import Dependencies
import { Props } from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useApexCharts } from "@/hooks";

// ----------------------------------------------------------------------

const chartConfig: ApexOptions = {
  colors: ["#4C4EE7", "#0EA5E9"],
  chart: {
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      barHeight: "90%",
      columnWidth: "35%",
    },
  },
  legend: {
    show: false,
  },
  xaxis: {
    labels: {
      hideOverlappingLabels: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: -10,
    },
  },
  yaxis: {
    show: false,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 850,
      options: {
        plotOptions: {
          bar: {
            columnWidth: "55%",
          },
        },
      },
    },
  ],
};

export function SalesChart({
  categories,
  series,
}: {
  categories: string[] | number[];
  series: Props["series"];
}) {
  const Chart = useApexCharts();


  const chartOptions = JSON.parse(JSON.stringify(chartConfig));
  chartOptions.xaxis.categories = categories;
  return (
    <div className="ax-transparent-gridline grid w-full grid-cols-1">
      <div>
        <Chart options={chartOptions} height="255" type="bar" series={series} />
      </div>
    </div>
  );
}
