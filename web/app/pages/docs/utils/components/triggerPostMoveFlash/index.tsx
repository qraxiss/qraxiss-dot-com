import { type Demo, DemoLayout } from "@/components/docs/demo/DemoLayout";
import { type BreadcrumbItem } from "@/components/shared/Breadcrumbs";
import { Usage } from "./Usage";
import { params } from "./params";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Docs", path: "/docs" },
  { title: "Hooks", path: "/docs/hooks" },
  { title: "triggerPostMoveFlash" },
];

const demos: Demo[] = [
  {
    title: "Usage",
    description: "Adding visual flourish to drag and drop experiences.",
    Component: Usage,
  },
];

export default function TriggerPostMoveFlash() {
  return (
    <DemoLayout
      title="triggerPostMoveFlash"
      breadcrumbs={breadcrumbs}
      demos={demos}
      hasPadding={false}
      params={params}
    />
  );
}
