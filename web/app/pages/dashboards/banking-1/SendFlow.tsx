// Import Dependencies
import { register } from "swiper/element/bundle";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import clsx from "clsx";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Cleave from "cleave.js/react";

// Local Imports
import { Avatar, Button, Card, Input, Select } from "@/components/ui";
import { useLocaleContext } from "@/app/contexts/locale/context";

// ----------------------------------------------------------------------

register();

interface Contact {
  uid: string;
  name: string;
  avatar?: string;
}

const contacts: Contact[] = [
  {
    uid: "1",
    name: "John Doe",
    avatar: "/web/images/avatar/avatar-20.jpg",
  },
  {
    uid: "2",
    name: "Samantha Shelton",
    avatar: undefined,
  },
  {
    uid: "3",
    name: "Corey Evans",
    avatar: "/web/images/avatar/avatar-6.jpg",
  },
  {
    uid: "4",
    name: "Lance Tucker",
    avatar: undefined,
  },
];

export function SendFlow() {
  const { direction } = useLocaleContext();

  return (
    <div className="col-span-12 lg:order-last lg:col-span-4">
      {/* @ts-expect-error - Swiper web components */}
      <swiper-container
        class="mx-auto h-40 w-64"
        effect="cards"
        grabCursor="true"
        slides-per-view="1"
        dir={direction}
      >
        {/* @ts-expect-error - Swiper web components */}
        <swiper-slide>
          <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 p-5">
            <div className="grow">
              <img
                className="h-3"
                src="/web/images/payments/cc-visa-white.svg"
                alt="credit-card"
              />
            </div>
            <div className="text-white">
              <p className="text-lg font-semibold tracking-wide">$2,139.22</p>
              <p className="mt-1 text-xs font-medium">**** **** **** 8945</p>
            </div>
            <div className="absolute top-0 right-0 -m-3 size-24 rounded-full bg-white/20"></div>
          </div>
          {/* @ts-expect-error - Swiper web components */}
        </swiper-slide>

        {/* @ts-expect-error - Swiper web components */}
        <swiper-slide>
          <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-linear-to-br from-pink-500 to-rose-500 p-5">
            <div className="grow">
              <img
                className="h-3"
                src="/web/images/payments/cc-visa-white.svg"
                alt="credit-card"
              />
            </div>
            <div className="text-white">
              <p className="text-lg font-semibold tracking-wide">$2,139.22</p>
              <p className="mt-1 text-xs font-medium">**** **** **** 8945</p>
            </div>
            <div className="absolute right-0 bottom-0 -m-3 size-24 rounded-full bg-white/20"></div>
          </div>
          {/* @ts-expect-error - Swiper web components */}
        </swiper-slide>

        {/* @ts-expect-error - Swiper web components */}
        <swiper-slide>
          <div className="from-info to-info-darker relative flex h-full flex-col overflow-hidden rounded-xl bg-linear-to-br p-5">
            <div className="grow">
              <img
                className="h-3"
                src="/web/images/payments/cc-visa-white.svg"
                alt="credit-card"
              />
            </div>
            <div className="text-white">
              <p className="text-lg font-semibold tracking-wide">$2,139.22</p>
              <p className="mt-1 text-xs font-medium">**** **** **** 8945</p>
            </div>
            <div className="absolute top-0 right-0 -m-3 size-24 rounded-full bg-white/20"></div>
          </div>
          {/* @ts-expect-error - Swiper web components */}
        </swiper-slide>
        {/* @ts-expect-error - Swiper web components */}
      </swiper-container>

      <Card className="-mt-12 flex flex-col px-4 pb-5 sm:px-5">
        <div className="mt-12">
          <div className="flex items-center justify-between py-3">
            <h2 className="text-dark-700 font-medium tracking-wide dark:text-gray-100">
              Send Money
            </h2>
            <ActionMenu />
          </div>

          <div className="flex gap-2">
            {contacts.map((contact) => (
              <Avatar
                key={contact.uid}
                size={8}
                src={contact.avatar}
                name={contact.name}
                initialColor="auto"
                classNames={{
                  display: "text-xs-plus",
                }}
              />
            ))}
          </div>

          <a
            href="##"
            className="mt-3 inline-flex items-center gap-2 hover:opacity-80"
          >
            <p>View All Contacts</p>
            <ArrowRightIcon className="size-4" />
          </a>

          <div className="mt-4 space-y-4">
            <Input
              label="Pay to"
              component={Cleave}
              options={{ creditCard: true }}
              placeholder="**** **** **** ****"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="amount">Amount</label>
            <div className="mt-1.5 flex -space-x-px">
              <Select
                classNames={{
                  root: "relative hover:z-1 focus:z-1",
                  select: "ltr:rounded-r-none rtl:rounded-l-none",
                }}
              >
                <option>$</option>
                <option>€</option>
                <option>£</option>
              </Select>
              <Input
                id="amount"
                placeholder="Enter Amount"
                classNames={{
                  root: "relative flex-1 hover:z-1 focus:z-1",
                  input: "ltr:rounded-l-none rtl:rounded-r-none",
                }}
              />
            </div>
          </div>

          <div className="dark:text-dark-300 mt-7 flex justify-between text-gray-400">
            <p className="text-xs-plus">Commission:</p>
            <p>3$</p>
          </div>

          <div className="mt-2 flex justify-between">
            <p>Total:</p>
            <p className="dark:text-dark-100 font-medium text-gray-800">3$</p>
          </div>

          <Button color="primary" className="mt-4 h-10 w-full">
            Send Money
          </Button>
        </div>
      </Card>
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
