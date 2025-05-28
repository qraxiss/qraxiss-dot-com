// Import Dependencies
import clsx from "clsx";
import React, { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";

// Local Imports
import { randomId } from "@/utils/randomId";
import { Collapse } from "@/components/ui";
import { useLocaleContext } from "@/app/contexts/locale/context";

// ----------------------------------------------------------------------

// TypeScript Interfaces
interface TreeItem {
  id: string;
  isRoot?: boolean;
  title: string;
  children?: TreeItem[];
}

interface TreeShowState {
  [key: string]: boolean;
}

const tree: TreeItem[] = [
  {
    id: randomId(),
    isRoot: true,
    title: "Application",
    children: [
      { id: randomId(), title: "Chrome" },
      { id: randomId(), title: "VS Code" },
      { id: randomId(), title: "Mail App" },
      { id: randomId(), title: "Firefox" },
    ],
  },
  {
    id: randomId(),
    isRoot: true,
    title: "Document",
    children: [
      {
        id: randomId(),
        title: "React App",
        children: [
          {
            id: randomId(),
            title: "src",
            children: [
              {
                id: randomId(),
                title: "Component",
                children: [
                  { id: randomId(), title: "Button.js" },
                  { id: randomId(), title: "Treeview.js" },
                  { id: randomId(), title: "Menu.js" },
                  { id: randomId(), title: "Avatar.js" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

function Tree({ tree }: { tree: TreeItem[] }): React.ReactElement {
  const [show, setshow] = useState<TreeShowState>({});
  const { isRtl } = useLocaleContext();

  const toggle = (name: string): void => {
    setshow({ ...show, [name]: !show[name] });
  };

  const Icon = isRtl ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <>
      {tree.map((parent) => (
        <div
          key={parent.id}
          className={clsx(!parent.isRoot && "ltr:pl-4 rtl:pr-4")}
        >
          <button
            onClick={() => toggle(parent.id)}
            className={clsx(
              "flex w-full cursor-pointer items-center space-x-1.5 rounded-sm px-2 py-1 tracking-wide outline-hidden transition-all hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 dark:hover:bg-dark-600 dark:hover:text-dark-100 dark:focus:bg-dark-600 dark:focus:text-dark-100 rtl:space-x-reverse",
              show[parent.id] && "text-gray-800 dark:text-dark-100",
            )}
          >
            {parent.children ? (
              <Icon
                className={clsx(
                  "size-4.5 transition-transform",
                  show[parent.id] && "rotate-90 rtl:-rotate-90",
                )}
              />
            ) : (
              <div className="w-4" />
            )}
            <span> {parent.title}</span>
          </button>
          <Collapse in={show[parent.id]}>
            {parent.children && <Tree tree={parent.children} />}
          </Collapse>
        </div>
      ))}
    </>
  );
}

export function Basic() {
  return (
    <div className="max-w-xs">
      <Tree tree={tree} />
    </div>
  );
}
