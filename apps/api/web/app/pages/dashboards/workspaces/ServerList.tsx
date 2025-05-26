// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";
import { Fragment } from "react";

// Local Imports
import { CollapsibleSearch } from "@/components/shared/CollapsibleSearch";
import { ServerCard, ServerData } from "./ServerCard";
import { Button } from "@/components/ui";

// ----------------------------------------------------------------------

const servers: ServerData[] = [
  {
    id: "5988745",
    status: {
      isActive: true,
      time: "7 hours",
    },
    countries: [
      {
        uid: 1,
        name: "Unated States",
        flag: "/web/images/flags/svg/rounded/usa.svg",
        traffic: "4.5 GB",
        memory: "14 GB",
      },
      {
        uid: 2,
        name: "Russia",
        flag: "/web/images/flags/svg/rounded/russia.svg",
        traffic: "6.1 GB",
        memory: "12 GB",
      },
    ],
    uptime: "96.4%",
    response: "3.4s",
    memory: "14 GB",
    ipList: ["195.161.66.25", "215.122.127.155"],
  },
  {
    id: "6518869",
    status: {
      isActive: true,
      time: "2 hours",
    },
    countries: [
      {
        uid: 1,
        name: "Australia",
        flag: "/web/images/flags/svg/rounded/australia.svg",
        traffic: "3.76 GB",
        memory: "5 GB",
      },
      {
        uid: 2,
        name: "UK",
        flag: "/web/images/flags/svg/rounded/united-kingdom.svg",
        traffic: "6.65 GB",
        memory: "10 GB",
      },
    ],
    uptime: "98.2%",
    response: "4.2s",
    memory: "22 GB",
    ipList: ["195.161.66.25", "215.122.127.155"],
  },
  {
    id: "3591458",
    status: {
      isActive: false,
      time: "22 minutes",
    },
    countries: [
      {
        uid: 1,
        name: "Brazil",
        flag: "/web/images/flags/svg/rounded/brazil.svg",
        traffic: "6.1 GB",
        memory: "24 GB",
      },
      {
        uid: 2,
        name: "Spain",
        flag: "/web/images/flags/svg/rounded/spain.svg",
        traffic: "5.02 GB",
        memory: "10 GB",
      },
    ],
    uptime: "95.7%",
    response: "2.1s",
    memory: "13 GB",
    ipList: ["195.161.66.25", "215.122.127.155"],
  },
  {
    id: "9462157",
    status: {
      isActive: true,
      time: "48 hours",
    },
    countries: [
      {
        uid: 1,
        name: "India",
        flag: "/web/images/flags/svg/rounded/india.svg",
        traffic: "4.5 GB",
        memory: "12 GB",
      },
      {
        uid: 2,
        name: "Russia",
        flag: "/web/images/flags/svg/rounded/russia.svg",
        traffic: "6.2 GB",
        memory: "8 GB",
      },
    ],
    uptime: "98.7%",
    response: "1.7s",
    memory: "9 GB",
    ipList: ["195.161.66.25", "215.122.127.155"],
  },
  {
    id: "6517997",
    status: {
      isActive: false,
      time: "6 minutes",
    },
    countries: [
      {
        uid: 1,
        name: "China",
        flag: "/web/images/flags/svg/rounded/china.svg",
        traffic: "6.6 GB",
        memory: "10 GB",
      },
      {
        uid: 2,
        name: "United States",
        flag: "/web/images/flags/svg/rounded/usa.svg",
        traffic: "9.1 GB",
        memory: "16 GB",
      },
    ],
    uptime: "95.43%",
    response: "4.65s",
    memory: "16 GB",
    ipList: ["195.161.66.25", "215.122.127.155"],
  },
  {
    id: "7958652",
    status: {
      isActive: true,
      time: "2 hours",
    },
    countries: [
      {
        uid: 1,
        name: "Italy",
        flag: "/web/images/flags/svg/rounded/italy.svg",
        traffic: "16.1 GB",
        memory: "24 GB",
      },
      {
        uid: 2,
        name: "Switzerland",
        flag: "/web/images/flags/svg/rounded/switzerland.svg",
        traffic: "3.8 GB",
        memory: "18 GB",
      },
    ],
    uptime: "97.27%",
    response: "3.88s",
    memory: "10 GB",
    ipList: ["195.161.66.25", "215.122.127.155"],
  },
];

export function ServerList() {
  return (
    <div className="mt-4 sm:mt-5 lg:mt-6">
      <div className="flex min-w-0 items-center justify-between gap-2">
        <h2 className="dark:text-dark-100 truncate text-base font-medium tracking-wide text-gray-800">
          Monitoring Workspaces
        </h2>
        <div className="flex">
          <CollapsibleSearch placeholder="Search here..." />
          <ActionMenu />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {servers.map((server) => (
          <ServerCard key={server.id} {...server} />
        ))}
      </div>
    </div>
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
        <EllipsisVerticalIcon className="size-5" />
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
