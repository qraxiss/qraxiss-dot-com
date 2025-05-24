// Import Dependencies
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Getter, Row } from "@tanstack/react-table";

// Local Imports
import { formatNumber } from "@/utils/formatNumber";
import { Product } from "./fakeData";

// ----------------------------------------------------------------------

function checkStock(stock: number) {
  const text =
    stock === 0
      ? "Not available"
      : stock < 100
        ? "Limited Supply"
        : "Available";
  const style =
    stock === 0
      ? "text-error dark:text-error-light"
      : stock < 100
        ? "text-warning dark:text-warning-lighter"
        : "text-success dark:text-success-lighter";
  return { text, style };
}

export function NameCell({ row }: { row: Row<Product> }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="size-9">
        <img
          className="h-full w-full rounded-lg object-cover object-center"
          src={row.original.image}
          alt={row.original.name}
        />
      </div>
      <div>
        <p className="dark:text-dark-100 font-medium text-gray-800">
          {row.original.name}
        </p>
        <p className="dark:text-dark-300 mt-0.5 text-xs text-gray-400">
          {row.original.sku}
        </p>
      </div>
    </div>
  );
}

export function BrandCell({ row }: { row: Row<Product> }) {
  return (
    <div className="size-9">
      <img
        data-tooltip
        data-tooltip-content={row.original.brand}
        src={row.original.brand_image}
        alt={row.original.brand}
      />
    </div>
  );
}

export function PriceCell({ getValue }: { getValue: Getter<any> }) {
  return <span className="font-semibold">{getValue()}</span>;
}

export function StockCell({ getValue }: { getValue: Getter<any> }) {
  const val = getValue();
  const availability = checkStock(val);
  return (
    <>
      <span className={clsx("font-medium", availability.style)}>
        {availability.text}
      </span>
      <p className="dark:text-dark-300 text-xs text-gray-400">
        {formatNumber(getValue())} stock
      </p>
    </>
  );
}

export function ViewCell({
  row,
  getValue,
}: {
  row: Row<Product>;
  getValue: Getter<any>;
}) {
  return (
    <>
      <p className="font-semibold">{formatNumber(getValue())}</p>
      <div
        className={clsx(
          "flex items-center space-x-0.5 text-xs leading-normal",
          row.original.view_impressions > 0
            ? "text-success dark:text-success-lighter"
            : "text-error dark:text-error-light",
        )}
      >
        <ArrowUpIcon
          className={clsx(
            "size-3.5",
            row.original.view_impressions < 0 && "rotate-180",
          )}
        />
        <span>
          {(Math.abs(row.original.view_impressions) * 100).toFixed(2)}%
        </span>
      </div>
    </>
  );
}
