// Local Imports
import { type Demo, DemoLayout } from "@/components/docs/demo/DemoLayout";
import { type BreadcrumbItem } from "@/components/shared/Breadcrumbs";
import { Horizontal } from "./Horizontal";
import { HorizontalWithoutText } from "./HorizontalWithoutText";
import { Vertical } from "./Vertical";
import { VerticalWithoutText } from "./VerticalWithoutText";

// ----------------------------------------------------------------------

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Components", path: "/components" },
  { title: "Divider" },
];

const markdownPath = "components/divider";

const demos: Demo[] = [
  {
    title: "Vertical Divider",
    Component: Vertical,
    markdownName: "Vertical",
  },
  {
    title: "Vertical Divider Without Text",
    Component: VerticalWithoutText,
    markdownName: "VerticalWithoutText",
  },
  {
    title: "Horizontal Divider",
    Component: Horizontal,
    markdownName: "Horizontal",
  },
  {
    title: "Horizontal Divider Without Text",
    Component: HorizontalWithoutText,
    markdownName: "HorizontalWithoutText",
  },
];

export default function Divider() {
  return (
    <DemoLayout
      title="Divider"
      breadcrumbs={breadcrumbs}
      markdownPath={markdownPath}
      demos={demos}
    />
  );
}
