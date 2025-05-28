// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";

// Local Imports
import { Button, Card } from "@/components/ui";
import { formatNumber } from "@/utils/formatNumber";

// ----------------------------------------------------------------------

type Channel = {
  uid: string;
  logo: string;
  name: string;
  views: number;
  impression: number;
};

const channels: Channel[] = [
  {
    uid: "1",
    logo: "/web/images/logos/instagram-round.svg",
    name: "Instagram",
    views: 34358,
    impression: 2,
  },
  {
    uid: "2",
    logo: "/web/images/logos/facebook-round.svg",
    name: "Facebook",
    views: 24616,
    impression: 3,
  },
  {
    uid: "3",
    logo: "/web/images/logos/tik_tok-round.svg",
    name: "Tik Tok",
    views: 17363,
    impression: -1,
  },
  {
    uid: "4",
    logo: "/web/images/logos/twitter-round.svg",
    views: 49318,
    name: "Twitter",
    impression: 5,
  },
  {
    uid: "5",
    logo: "/web/images/logos/pinterest-round.svg",
    name: "Pinterest",
    views: 6917,
    impression: 1,
  },
  {
    uid: "6",
    logo: "/web/images/logos/discord-round.svg",
    name: "Discord",
    views: 639,
    impression: -3,
  },
  {
    uid: "7",
    logo: "/web/images/logos/youtube-round.svg",
    name: "Youtube",
    views: 5391,
    impression: 1,
  },
  {
    uid: "8",
    logo: "/web/images/logos/tumblr-round.svg",
    name: "Tumblr",
    views: 144,
    impression: 1,
  },
];

export function SocialTraffic() {
  return (
    <Card className="px-4 pb-5 sm:px-5">
      <div className="flex h-14 min-w-0 items-center justify-between py-3">
        <h2 className="dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Social Traffic
        </h2>
        <ActionMenu />
      </div>
      <div>
        <p>
          <span className="dark:text-dark-100 text-2xl text-gray-800">
            135K
          </span>
          <span className="text-success dark:text-success-lighter text-xs">
            +3.1%
          </span>
        </p>
        <p className="text-xs-plus">View in this month</p>
      </div>
      <div className="mt-5 space-y-4">
        {channels.map((channel) => (
          <div
            key={channel.uid}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <img className="size-6" src={channel.logo} alt={channel.name} />
              <a
                href="##"
                className="truncate transition-opacity hover:opacity-80"
              >
                {channel.name}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm-plus dark:text-dark-100 text-gray-800">
                {formatNumber(channel.views, 2)}
              </p>
              {channel.impression > 0 ? (
                <ArrowUpIcon className="this:success text-this dark:text-this-lighter size-4" />
              ) : (
                <ArrowDownIcon className="this:error text-this dark:text-this-lighter size-4" />
              )}
            </div>
          </div>
        ))}
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
