import { type Demo, DemoLayout } from "@/components/docs/demo/DemoLayout";
import { type BreadcrumbItem } from "@/components/shared/Breadcrumbs";
import { Usage } from "./Usage";
import { returns } from "./returns";
import { params } from "./params";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Docs", path: "/docs" },
  { title: "Hooks", path: "/docs/hooks" },
  { title: "colorFromText" },
];

const markdownPath = "docs/utils/colorFromText";

const demos: Demo[] = [
  {
    title: "Usage",
    description:
      "Maps a text input to a color based on its first character. Check out code for detail of usage.",
    Component: Usage,
    markdownName: "Usage",
  },
];

export default function ColorFromText() {
  return (
    <DemoLayout
      title="colorFromText"
      breadcrumbs={breadcrumbs}
      demos={demos}
      markdownPath={markdownPath}
      hasPadding={false}
      params={params}
      returns={returns}
    />
  );
}
