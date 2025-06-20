// Import Dependencies
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { RocketLaunchIcon } from "@heroicons/react/20/solid";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

// Local Imports
import { useThemeContext } from "@/app/contexts/theme/context";
import { SidebarToggleBtn } from "@/components/shared/SidebarToggleBtn";
import { LanguageSelector } from "@/components/template/LanguageSelector";
import { Button } from "@/components/ui";
import { randomId } from "@/utils/randomId";

// ----------------------------------------------------------------------

interface Engine {
  id: string;
  name: string;
}

const engines: Engine[] = [
  { id: randomId(), name: "ChatGPT o3" },
  { id: randomId(), name: "ChatGPT 4o" },
  { id: randomId(), name: "ChatGPT 4o Pro" },
  { id: randomId(), name: "Copilot Pro" },
];

export function Header() {
  const { cardSkin } = useThemeContext();

  return (
    <header
      className={clsx(
        cardSkin === "bordered" ? "dark:bg-dark-900" : "dark:bg-dark-750",
        "transition-content border-gray-150 dark:border-dark-600 relative z-10 flex h-[65px] w-full shrink-0 items-center justify-between border-b bg-white px-[calc(var(--margin-x)-.5rem)] shadow-xs",
      )}
    >
      <div className="flex min-w-0 items-center gap-1">
        <div className="size-7 ltr:ml-1 rtl:mr-1">
          <SidebarToggleBtn />
        </div>
        <EngineSelector />
      </div>
      <div className="flex gap-2">
        <LanguageSelector />
        <Button
          unstyled
          className="text-xs-plus gap-2 rounded-lg bg-linear-to-r from-green-400 to-blue-600 px-5 py-2 text-white duration-100 ease-out [contain:paint] hover:opacity-[.85] focus:opacity-[.85] active:translate-y-px"
        >
          <RocketLaunchIcon className="size-4" />
          <span className="max-sm:hidden">Try AI Pro</span>
        </Button>
      </div>
    </header>
  );
}

function EngineSelector() {
  return (
    <Listbox as="div" defaultValue={engines[0]}>
      {({ open, value }) => (
        <div className="relative">
          <ListboxButton as={Button} variant="flat" className="gap-2">
            <span className="truncate">{value.name}</span>
            <ChevronDownIcon
              className={clsx(
                "dark:text-dark-300 size-5 text-gray-400 transition-transform",
                open && "rotate-180",
              )}
              aria-hidden="true"
            />
          </ListboxButton>
          <Transition
            as={ListboxOptions}
            enter="transition ease-out"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
            className="dark:border-dark-500 dark:bg-dark-750 absolute z-10 mt-1 max-h-60 w-max overflow-auto rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden dark:shadow-none"
          >
            {engines.map((engine) => (
              <ListboxOption
                key={engine.id}
                className={({ selected, focus }) =>
                  clsx(
                    "relative w-full cursor-pointer py-2 pr-4 pl-10 transition-colors select-none rtl:pr-10 rtl:pl-4",
                    focus && !selected && "dark:bg-dark-600 bg-gray-100",
                    selected
                      ? "bg-primary-600 dark:bg-primary-500 text-white"
                      : "dark:text-dark-100 text-gray-800",
                  )
                }
                value={engine}
              >
                {({ focus }) => (
                  <>
                    <span className="block">{engine.name}</span>
                    {focus ? (
                      <span className="absolute inset-y-0 flex items-center ltr:left-0 ltr:pl-3 rtl:right-0 rtl:pr-3">
                        <CheckIcon className="size-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ListboxOption>
            ))}
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
