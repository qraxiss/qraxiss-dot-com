import { type Demo, DemoLayout } from "@/components/docs/demo/DemoLayout";
import { Basic } from "./Basic";

import { BreadcrumbItem } from "@/components/shared/Breadcrumbs";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Docs", path: "/docs" },
  { title: "Hooks", path: "/docs/hooks" },
  { title: "useEventCallback" },
];

const demos: Demo[] = [
  {
    title: "Basic",
    description:
      "The <code>useEventCallback</code> ensures that the latest version of a callback function is used while preserving the same function identity across renders. You should use this hook when need stable references for callbacks in performance-critical applications.",
    Component: Basic,
  },
];

export default function UseEventCallback() {
  return (
    <DemoLayout
      title="useEventCallback"
      breadcrumbs={breadcrumbs}
      demos={demos}
      hasPadding={false}
    />
  );
}
