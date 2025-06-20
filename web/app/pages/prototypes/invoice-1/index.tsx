// Import Dependencies
import { Cog8ToothIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

// Local Imports
import { Page } from "@/components/shared/Page";
import { Button, Card } from "@/components/ui";
import { ItemsTable } from "./ItemsTable";

// Lazy import for SSR compatibility
let useReactToPrint: any;
if (typeof window !== 'undefined') {
  useReactToPrint = (await import('react-to-print')).useReactToPrint;
}

// ----------------------------------------------------------------------

export default function Invoice1() {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint ? useReactToPrint({
    contentRef: invoiceRef,
  }) : () => { };

  return (
    <Page title="Invoice V1">
      <div
        className="transition-content grid w-full px-(--margin-x) pb-8"
        style={{ gridTemplateRows: "auto 1fr" }}
      >
        <div className="flex items-center justify-between py-5 lg:py-6">
          <h2 className="dark:text-dark-50 truncate text-xl font-medium text-gray-700 lg:text-2xl">
            Invoice
          </h2>

          <div className="flex">
            <Button
              onClick={() => handlePrint()}
              className="size-8 rounded-full"
              variant="flat"
              isIcon
            >
              <PrinterIcon className="size-5" />
            </Button>
            <Button className="size-8 rounded-full" variant="flat" isIcon>
              <Cog8ToothIcon className="size-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1">
          <Card
            className="flex h-full flex-col px-5 py-12 sm:px-12"
            ref={invoiceRef}
          >
            <div className="flex flex-col justify-between sm:flex-row">
              <div className="text-center sm:text-left">
                <h2 className="text-primary-600 dark:text-primary-400 text-2xl font-semibold uppercase">
                  qraxiss
                </h2>
                <div className="space-y-1 pt-2">
                  <p>Sparksuite, Inc.</p>
                  <p>12345 Sunny Road</p>
                  <p>Sunnyville, CA 12345</p>
                </div>
              </div>
              <div className="mt-4 text-center sm:m-0 sm:text-right">
                <h2 className="text-primary-600 dark:text-primary-400 text-2xl font-semibold uppercase">
                  invoice
                </h2>
                <div className="space-y-1 pt-2">
                  <p>
                    Invoice #: <span className="font-semibold">123</span>
                  </p>
                  <p>
                    Created:{" "}
                    <span className="font-semibold">June 23, 2021</span>
                  </p>
                  <p>
                    Due: <span className="font-semibold"> July 23, 2021</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="dark:bg-dark-500 my-7 h-px bg-gray-200"></div>

            <div className="flex flex-col justify-between sm:flex-row">
              <div className="text-center sm:text-left">
                <p className="dark:text-dark-100 text-lg font-medium text-gray-600">
                  Invoiced To:
                </p>
                <div className="space-y-1 pt-2">
                  <p className="font-semibold">John Doe</p>
                  <p>johndoe@example.com</p>
                  <p>260 W. Storm Street New York, NY 10025.</p>
                </div>
              </div>
              <div className="mt-4 text-center sm:m-0 sm:text-right">
                <p className="dark:text-dark-100 text-lg font-medium text-gray-600">
                  Payment Method:
                </p>
                <div className="space-y-1 pt-2">
                  <p className="font-medium">Visa **** **** 1234</p>
                </div>
              </div>
            </div>

            <div className="dark:bg-dark-500 my-7 h-px bg-gray-200"></div>

            <ItemsTable />

            <div className="dark:bg-dark-500 my-7 h-px bg-gray-200"></div>

            <div className="grow"></div>

            <div className="flex flex-col justify-end sm:flex-row">
              <div className="mt-4 text-center sm:m-0 sm:text-right">
                <p className="text-primary-600 dark:text-primary-400 text-lg font-medium">
                  Total:
                </p>
                <div className="space-y-1 pt-2">
                  <p>
                    Summary : <span className="font-medium">$7320</span>
                  </p>
                  <p>
                    Discount : <span className="font-medium">$20</span>
                  </p>
                  <p>
                    Tax : <span className="font-medium">20%</span>
                  </p>
                  <p className="text-primary-600 dark:text-primary-400 text-lg">
                    Total: <span className="font-medium">$8780</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
