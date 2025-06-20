import { type Demo, DemoLayout } from "@/components/docs/demo/DemoLayout";
import { Basic } from "./Basic";
import { params } from "./params";
import { returns } from "./returns";

import { BreadcrumbItem } from "@/components/shared/Breadcrumbs";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Docs", path: "/docs" },
  { title: "Hooks", path: "/docs/hooks" },
  { title: "useListState" },
];

const demos: Demo[] = [
  {
    title: "Basic",
    description:
      "<code>useListState</code> takes an array as a single argument and returns a list of values and handlers to change them in a tuple, similar to <code>useState</code> hook.",
    Component: Basic,
  },
];

export default function UseListState() {
  return (
    <DemoLayout
      title="useListState"
      breadcrumbs={breadcrumbs}
      demos={demos}
      hasPadding={false}
      params={params}
      returns={returns}
    />
  );
}
