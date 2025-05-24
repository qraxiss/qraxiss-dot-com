// Import Dependencies
import clsx from "clsx";
import { NavLink, useRouteLoaderData } from "react-router";
import { useTranslation } from "../../../../../../../node_modules/react-i18next";
import invariant from "tiny-invariant";

// Local Imports
import { Badge } from "@/components/ui";
import { useBreakpointsContext } from "@/app/contexts/breakpoint/context";
import { useSidebarContext } from "@/app/contexts/sidebar/context";
import { type NavigationTree } from "@/@types/navigation";
import { navigationIcons } from "@/app/navigation/icons";

// ----------------------------------------------------------------------

export function MenuItem({ data }: { data: NavigationTree }) {
  const { icon, path, id, transKey, title } = data;
  const { lgAndDown } = useBreakpointsContext();
  const { close } = useSidebarContext();
  const { t } = useTranslation();

  invariant(
    icon && navigationIcons[icon],
    `[MenuItem] Icon ${icon} not found in navigationIcons`,
  );

  invariant(path, "[MenuItem] path is required but not found");

  const Icon = navigationIcons[icon];

  const label = transKey ? t(transKey) : title;

  const info = useRouteLoaderData("root")?.[id]?.info;

  const handleMenuItemClick = () => lgAndDown && close();

  return (
    <div className="relative flex px-3">
      <NavLink
        to={path}
        onClick={handleMenuItemClick}
        className={({ isActive }) =>
          clsx(
            "group min-w-0 flex-1 rounded-md px-3 py-2 font-medium outline-hidden transition-colors ease-in-out",
            isActive
              ? "text-primary-600 dark:text-primary-400"
              : "text-gray-800 hover:bg-gray-100 hover:text-gray-950 focus:bg-gray-100 focus:text-gray-950 dark:text-dark-200 dark:hover:bg-dark-300/10 dark:hover:text-dark-50 dark:focus:bg-dark-300/10",
          )
        }
      >
        {({ isActive }) => (
          <>
            <div
              data-menu-active={isActive}
              className="flex min-w-0 items-center justify-between gap-2 text-xs-plus tracking-wide"
            >
              <div className="flex min-w-0 items-center gap-3">
                {Icon && (
                  <Icon
                    className={clsx(
                      "size-5 shrink-0 stroke-[1.5]",
                      !isActive && "opacity-80 group-hover:opacity-100",
                    )}
                  />
                )}
                <span className="truncate">{label}</span>
              </div>
              {info && info.val && (
                <Badge
                  color={info.color}
                  variant="soft"
                  className="h-4.5 min-w-[1rem] shrink-0 p-[5px] text-tiny-plus"
                >
                  {info.val}
                </Badge>
              )}
            </div>
            {isActive && (
              <div className="absolute bottom-1 top-1 w-1 bg-primary-600 dark:bg-primary-400 ltr:left-0 ltr:rounded-r-full rtl:right-0 rtl:rounded-l-lg" />
            )}
          </>
        )}
      </NavLink>
    </div>
  );
}
