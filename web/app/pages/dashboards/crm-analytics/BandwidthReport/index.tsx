// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";
import { useApexCharts } from "@/hooks";
import { ApexOptions } from "apexcharts";

// Local Imports
import { Button, Card, Progress } from "@/components/ui";

// ----------------------------------------------------------------------

const series = [
  {
    name: "Traffic",
    data: [
      8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85,
      8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9, 8496.25,
      8600.65, 8881.1, 9340.85,
    ],
  },
];

const chartConfig: ApexOptions = {
  colors: ["#4467EF"],
  chart: {
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
      top: -28,
      bottom: -15,
    },
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

export function BandwidthReport() {
  const Chart = useApexCharts()


  return (
    <Card className="flex flex-col">
      <div className="flex h-14 min-w-0 items-center justify-between px-4 py-3 sm:px-5">
        <h2 className="dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Bandwidth Report
        </h2>
        <ActionMenu />
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 sm:gap-5 sm:px-5 lg:grid-cols-2">
        <div className="border-gray-150 dark:border-dark-600 rounded-lg border p-4">
          <div className="flex justify-between">
            <div>
              <span className="dark:text-dark-100 text-2xl font-medium text-gray-800">
                393
              </span>
              <span className="text-xs">Mb</span>
            </div>
            <p className="text-xs-plus">HTTP Traffic</p>
          </div>

          <Progress
            color="success"
            isActive
            value={68}
            classNames={{ root: "mt-3 h-1.5" }}
          />
          <div className="dark:text-dark-300 mt-2 flex justify-between text-xs text-gray-400">
            <p>Monthly target</p>
            <p>68%</p>
          </div>
        </div>

        <div className="border-gray-150 dark:border-dark-600 rounded-lg border p-4">
          <div className="flex justify-between">
            <div>
              <span className="dark:text-dark-100 text-2xl font-medium text-gray-800">
                293
              </span>
              <span className="text-xs">Mb</span>
            </div>
            <p className="text-xs-plus">SMTP Traffic</p>
          </div>

          <Progress
            color="warning"
            value={55}
            classNames={{ root: "mt-3 h-1.5" }}
          />
          <div className="dark:text-dark-300 mt-2 flex justify-between text-xs text-gray-400">
            <p>Monthly target</p>
            <p>55%</p>
          </div>
        </div>

        <div className="border-gray-150 dark:border-dark-600 rounded-lg border p-4">
          <div className="flex justify-between">
            <div>
              <span className="dark:text-dark-100 text-2xl font-medium text-gray-800">
                36.6
              </span>
              <span className="text-xs">Gb</span>
            </div>
            <p className="text-xs-plus">FTP Traffic</p>
          </div>

          <Progress
            color="secondary"
            value={39}
            classNames={{ root: "mt-3 h-1.5" }}
          />
          <div className="dark:text-dark-300 mt-2 flex justify-between text-xs text-gray-400">
            <p>Monthly target</p>
            <p>39%</p>
          </div>
        </div>

        <div className="border-gray-150 dark:border-dark-600 rounded-lg border p-4">
          <div className="flex justify-between">
            <div>
              <span className="dark:text-dark-100 text-2xl font-medium text-gray-800">
                96
              </span>
              <span className="text-xs">Mb</span>
            </div>
            <p className="text-xs-plus">POP3 Traffic</p>
          </div>

          <Progress
            color="neutral"
            isActive
            value={89}
            classNames={{ root: "mt-3 h-1.5" }}
          />
          <div className="dark:text-dark-300 mt-2 flex justify-between text-xs text-gray-400">
            <p>Monthly target</p>
            <p>89%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grow px-4 sm:px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs-plus">Performance</p>
            <p className="dark:text-dark-100 text-gray-800">3.2%</p>
            <ArrowUpIcon className="this:success text-this dark:text-this-lighter size-4" />
          </div>
          <a
            href="##"
            className="text-xs-plus text-primary-600 hover:text-primary-600/70 focus:text-primary-600/70 dark:text-primary-400 dark:hover:text-primary-400/70 dark:focus:text-primary-400/70 border-b border-dotted border-current pb-0.5 font-medium outline-hidden transition-colors duration-300"
          >
            Download Report
          </a>
        </div>
      </div>

      <div className="ax-transparent-gridline ax-rounded-b-lg">
        <Chart type="area" height={320} series={series} options={chartConfig} />
      </div>
    </Card>
  );
}

function ActionMenu() {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left ltr:-mr-1.5 rtl:-ml-1.5"
    >
      <MenuButton
        as={Button}
        variant="flat"
        isIcon
        className="size-8 rounded-full"
      >
        <EllipsisHorizontalIcon className="size-5" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <MenuItems className="dark:border-dark-500 dark:bg-dark-700 absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden ltr:right-0 rtl:left-0 dark:shadow-none">
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Action</span>
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Another action</span>
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Other action</span>
              </button>
            )}
          </MenuItem>

          <hr className="border-gray-150 dark:border-dark-500 mx-3 my-1.5 h-px" />

          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Separated action</span>
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
