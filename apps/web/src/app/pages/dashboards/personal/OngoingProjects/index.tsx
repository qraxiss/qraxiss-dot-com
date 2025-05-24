// Local Imports
import { ProjectCard, type Project } from "./ProjectCard";

// ----------------------------------------------------------------------

const projects: Project[] = [
  {
    uid: 1,
    name: "LMS App Design",
    image: "/web/images/technology/design-sm.jpg",
    updated_at: "Updated at 7 Sep",
    deadline: "25.08.2020",
    isActive: true,
    progress: 24,
    color: "primary",
  },
  {
    uid: 2,
    name: "Store Dashboard",
    image: "/web/images/technology/dashboard.jpg",
    updated_at: "Updated a hour ago",
    deadline: "21.08.2020",
    isActive: false,
    progress: 56,
    color: "secondary",
  },
  {
    uid: 3,
    name: "Chat Mobile App",
    image: "/web/images/technology/mobile-social.jpg",
    updated_at: "Updated 3 days ago",
    deadline: "16.09.2020",
    isActive: false,
    progress: 64,
    color: "warning",
  },
  {
    uid: 4,
    name: "NFT Marketplace App",
    image: "/web/images/technology/ai-technology-brain.jpg",
    updated_at: "Updated a week ago",
    deadline: "26.11.2020",
    isActive: false,
    progress: 14,
    color: "info",
  },
];

export function OngoingProjects() {
  return (
    <div>
      <div className="flex min-w-0 items-center justify-between">
        <h2 className="text-sm-plus dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Ongoing Projects
        </h2>
        <a
          href="##"
          className="text-xs-plus text-primary-600 hover:text-primary-600/70 focus:text-primary-600/70 dark:text-primary-400 dark:hover:text-primary-400/70 dark:focus:text-primary-400/70 border-b border-dotted border-current pb-0.5 font-medium outline-hidden transition-colors duration-300"
        >
          View All
        </a>
      </div>
      <div className="mt-3 space-y-3.5">
        {projects.map((project) => (
          <ProjectCard key={project.uid} {...project} />
        ))}
      </div>
    </div>
  );
}
