import { type Demo, DemoLayout } from "@/components/docs/demo/DemoLayout";
import { type BreadcrumbItem } from "@/components/shared/Breadcrumbs";
import { Usage } from "./Usage";
import { returns } from "./returns";
import { params } from "./params";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Docs", path: "/docs" },
  { title: "Hooks", path: "/docs/hooks" },
  { title: "getMultipleRandom" },
];

const demos: Demo[] = [
  {
    title: "Usage",
    description: "Returns a random subset of elements from the input array.",
    Component: Usage,
  },
];

export default function GetMultipleRandom() {
  return (
    <DemoLayout
      title="getMultipleRandom"
      breadcrumbs={breadcrumbs}
      demos={demos}
      hasPadding={false}
      params={params}
      returns={returns}
    />
  );
}
