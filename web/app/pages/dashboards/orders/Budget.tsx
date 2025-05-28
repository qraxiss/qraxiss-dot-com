// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useApexCharts } from "@/hooks";
import { Fragment } from "react";
import { ApexOptions } from "apexcharts";

// Local Imports
import { Button, Card } from "@/components/ui";

// ----------------------------------------------------------------------

const series = [
  {
    name: "Start",
    data: [44, 55, 41, 25, 22, 56],
  },
  {
    name: "End",
    data: [13, 23, 20, 60, 13, 16],
  },
];

const chartConfig: ApexOptions = {
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 10,
      bottom: -12,
      top: 0,
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
  xaxis: {
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
  chart: {
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
    stacked: true,
    stackType: "100%",
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    colors: ["#0EA5E9", "#e2e8f0"],
  },
  plotOptions: {
    bar: {
      borderRadius: 2,
      horizontal: false,
      columnWidth: 30,
    },
  },
  legend: {
    show: false,
  },
};

export function Budget() {
  const Chart = useApexCharts()


  return (
    <Card className="col-span-2 px-4 pb-5 sm:px-5">
      <div className="flex min-w-0 items-center justify-between py-3">
        <h2 className="dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Budget
        </h2>
        <ActionMenu />
      </div>
      <div className="flex grow gap-5">
        <div className="flex w-1/2 flex-col">
          <div className="grow">
            <p className="dark:text-dark-100 text-2xl font-semibold text-gray-800">
              $67.4k
            </p>
            <a
              href="##"
              className="text-tiny text-primary-600 hover:text-primary-600/70 focus:text-primary-600/70 dark:text-primary-400 dark:hover:text-primary-400 dark:focus:text-primary-400/70 border-b border-dotted border-current pb-0.5 font-medium uppercase outline-hidden transition-colors duration-300"
            >
              Yearly Budget
            </a>
          </div>
          <p className="mt-2 line-clamp-3 text-xs leading-normal">
            You have spent about 25% of your annual budget.
          </p>
        </div>
        <div className="ax-transparent-gridline flex w-1/2 items-end">
          <div className="min-w-0">
            <Chart
              type="bar"
              height="120"
              options={chartConfig}
              series={series}
            />
          </div>
        </div>
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
