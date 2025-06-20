import { type Demo, DemoLayout } from "@/components/docs/demo/DemoLayout";
import { type BreadcrumbItem } from "@/components/shared/Breadcrumbs";
import { Usage } from "./Usage";
import { returns } from "./returns";
import { params } from "./params";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Docs", path: "/docs" },
  { title: "Hooks", path: "/docs/hooks" },
  { title: "detectDeviceType" },
];

const markdownPath = "docs/utils/detectDeviceType";

const demos: Demo[] = [
  {
    title: "Usage",
    description:
      "Detects the type of device based on the user agent string. Check out code for detail of usage.",
    Component: Usage,
    markdownName: "Usage",
  },
];

export default function DetectDeviceType() {
  return (
    <DemoLayout
      title="detectDeviceType"
      breadcrumbs={breadcrumbs}
      demos={demos}
      markdownPath={markdownPath}
      hasPadding={false}
      params={params}
      returns={returns}
    />
  );
}
