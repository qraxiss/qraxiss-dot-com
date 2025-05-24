// Import Dependencies
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment } from "react";
import { Column } from "@tanstack/react-table";

// Local Imports
import { Button, Checkbox, Input } from "@/components/ui";
import { DatePicker } from "../form/Datepicker";

// ----------------------------------------------------------------------

export function ColumnFilter({ column }: { column: Column<any> }) {
  const columnFilterValue = column.getFilterValue() as any;

  if (column.columnDef.filterColumn === "dateRange") {
    return (
      <div className="[&_.suffix]:w-5">
        <DatePicker
          hasCalenderIcon={false}
          value={columnFilterValue ?? ""}
          readOnly
          onChange={(date) => {
            if (date.length === 0) {
              column.setFilterValue([null, null]);
            }
            if (date.length === 2) {
              column.setFilterValue([date[0].getTime(), date[1].getTime()]);
            }
          }}
          options={{
            maxDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            mode: "range",
            dateFormat: "m.d",
          }}
          suffix={
            columnFilterValue ? (
              <Button
                onClick={() => column.setFilterValue([null, null])}
                className="pointer-events-auto size-5 rounded-full"
                isIcon
                variant="flat"
              >
                <XMarkIcon className="size-4" />
              </Button>
            ) : undefined
          }
          className="text-xs-plus min-w-[8rem] rounded-none border-0 border-b px-0 pb-1.5 ltr:pr-5! rtl:pl-5!"
          placeholder="Date Range"
        />
      </div>
    );
  }

  if (column.columnDef.filterColumn === "numberRange") {
    return (
      <div className="flex gap-2">
        <Input
          type="number"
          value={columnFilterValue?.[0] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old: any) => [e.target.value, old?.[1]])
          }
          placeholder="Min"
          classNames={{
            root: "mt-0.5",
            input:
              "text-xs-plus min-w-[4rem] rounded-none border-0 border-b px-0 pb-1.5",
          }}
        />
        <Input
          type="number"
          value={columnFilterValue?.[1] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old: any) => [old?.[0], e.target.value])
          }
          placeholder="Max"
          classNames={{
            root: "mt-0.5",
            input:
              "text-xs-plus min-w-[4rem] rounded-none border-0 border-b px-0 pb-1.5",
          }}
        />
      </div>
    );
  }

  if (column.columnDef.filterColumn === "select") {
    return (
      <Listbox
        as="div"
        value={column.columnDef?.options?.filter(({ value }) =>
          columnFilterValue?.includes(value),
        )}
        onChange={(list) => {
          column.setFilterValue(list.map((item) => item.value));
        }}
        multiple
      >
        {({ open }) => (
          <>
            <div className="relative mt-0.5">
              <ListboxButton
                className={clsx(
                  "text-xs-plus focus-visible:border-primary-600 dark:focus-visible:border-primary-500 relative w-40 cursor-pointer rounded-none border-b pt-2 pb-1.5 text-start outline-hidden transition-colors focus:outline-hidden ltr:pr-6 rtl:pl-6",
                  open
                    ? "border-primary-600 dark:border-primary-500"
                    : "dark:border-dark-450 dark:hover:border-dark-400 border-gray-300 hover:border-gray-400",
                )}
              >
                {columnFilterValue && columnFilterValue.length > 0 ? (
                  <span className="block truncate capitalize">
                    {columnFilterValue.map((val: any) => val).join(", ")}
                  </span>
                ) : (
                  <span className="dark:text-dark-200 font-light text-gray-600">
                    Select Value
                  </span>
                )}

                <span className="pointer-events-none absolute inset-y-0 flex items-center ltr:right-0 rtl:left-0">
                  <ChevronDownIcon
                    className={clsx(
                      "dark:text-dark-300 size-4.5 text-gray-400 transition-transform",
                      open && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>
              <Transition
                as={Fragment}
                enter="transition ease-out"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                <ListboxOptions className="text-xs-plus shadow-soft dark:border-dark-500 dark:bg-dark-750 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white py-1 capitalize outline-hidden focus-visible:outline-hidden dark:shadow-none">
                  {column?.columnDef?.options?.map((item) => (
                    <ListboxOption
                      key={item.value}
                      className={({ focus }) =>
                        clsx(
                          "dark:text-dark-100 relative flex cursor-pointer items-center justify-between space-x-2 px-3 py-2 text-gray-800 outline-hidden transition-colors select-none",
                          focus && "dark:bg-dark-600 bg-gray-100",
                        )
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <div className="flex items-center justify-between gap-2">
                          <Checkbox checked={selected} readOnly />
                          {item.icon && (
                            <item.icon className="size-4.5 stroke-1" />
                          )}
                          <span className="block truncate">{item.label}</span>
                        </div>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    );
  }
  return (
    <Input
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Search..."
      classNames={{
        root: "mt-0.5",
        input:
          "text-xs-plus min-w-[4rem] rounded-none border-0 border-b px-0 pb-1.5",
      }}
    />
  );
}
