// Import Dependencies
import { PiPersonSimpleWalk } from "react-icons/pi";

// Local Imports
import { Card } from "@/components/ui";

// ----------------------------------------------------------------------

export function Walking() {
  return (
    <Card className="flex flex-1 flex-col p-4">
      <div className="flex grow flex-col items-center">
        <div className="bg-info flex h-16 w-12 items-center justify-center rounded-full">
          <PiPersonSimpleWalk className="size-6 text-white" />
        </div>
        <p className="mt-2 font-medium">Walking</p>
      </div>
      <div className="mt-3 text-center">
        <p className="dark:text-dark-100 text-3xl font-semibold text-gray-600">
          234
        </p>
        <p className="text-xs-plus">meter</p>
      </div>
    </Card>
  );
}
