import { type Demo, DemoLayout } from "@/components/docs/demo/DemoLayout";
import { Basic } from "./Basic";
import { returns } from "./returns";
import { params } from "./params";

import { BreadcrumbItem } from "@/components/shared/Breadcrumbs";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Docs", path: "/docs" },
  { title: "Hooks", path: "/docs/hooks" },
  { title: "useUncontrolled" },
];

const demos: Demo[] = [
  {
    title: "Basic",
    description:
      "<code>useUncontrolled</code> manages state for both controlled and uncontrolled components.",
    Component: Basic,
  },
];

export default function UseUncontrolled() {
  return (
    <DemoLayout
      title="useUncontrolled"
      breadcrumbs={breadcrumbs}
      demos={demos}
      hasPadding={false}
      returns={returns}
      params={params}
    />
  );
}
