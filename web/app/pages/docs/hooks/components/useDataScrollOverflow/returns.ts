import { ReturnItem } from "@/components/docs/demo/DemoLayout/Returns";

export const returns: ReturnItem[] = [
  {
    name: "ref",
    type: "RefObject",
    description:
      "A reference to the node that is being monitored for overflow.",
  },
  {
    name: "recalculate",
    type: "function",
    description:
      "A function that allows for manual recalculation of the overflow state.",
  },
];
