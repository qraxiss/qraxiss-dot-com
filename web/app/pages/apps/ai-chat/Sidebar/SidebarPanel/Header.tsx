// Import Dependencies
import { RiRobot2Line } from "react-icons/ri";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

// Local Imports
import { useSidebarContext } from "@/app/contexts/sidebar/context";
import { Avatar, Button } from "@/components/ui";

// ----------------------------------------------------------------------

export function Header() {
  const { close: closeSidebar } = useSidebarContext();

  return (
    <div className="relative flex h-18 w-full shrink-0 items-center justify-between pr-1 pl-4 rtl:pr-4 rtl:pl-1">
      <div className="flex items-center gap-3">
        <Avatar size={9} initialColor="info" initialVariant="soft">
          <RiRobot2Line className="size-4.5" />
        </Avatar>
        <p className="dark:text-dark-100 truncate text-base tracking-wider text-gray-800">
          Ai Chat
        </p>
      </div>
      <Button
        onClick={closeSidebar}
        isIcon
        variant="flat"
        className="size-7 rounded-full xl:hidden"
      >
        <ChevronLeftIcon className="size-6 rtl:rotate-180" />
      </Button>
    </div>
  );
}
