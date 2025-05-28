// Import Dependencies
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Highlight } from "@/components/shared/Highlight";
import { Avatar, Box, Card } from "@/components/ui";
import { type Post } from "./data";

// ----------------------------------------------------------------------

export function PostCard({
  cover,
  created_at,
  title,
  description,
  author,
  query,
}: Post & { query: string }) {
  return (
    <Box className="flex flex-col">
      <img
        className="h-44 w-full rounded-2xl object-cover object-center"
        src={cover}
        alt={title}
      />
      <Card
        skin="shadow"
        className="-mt-8 flex min-w-0 grow flex-col rounded-2xl p-4"
      >
        <div className="truncate">
          <a
            href="##"
            className="text-sm-plus font-medium text-gray-700 hover:text-primary-600 focus:text-primary-600 dark:text-dark-100 dark:hover:text-primary-400 dark:focus:text-primary-400"
          >
            <Highlight query={query}>{title}</Highlight>
          </a>
        </div>
        <p className="mt-2 line-clamp-3 grow">{description}</p>
        <div className="mt-4 flex items-center justify-between gap-1.5">
          <a
            href="##"
            className="flex min-w-0 items-center space-x-2 text-xs hover:text-gray-800 dark:hover:text-dark-100"
          >
            <Avatar
              size={6}
              name={author.name}
              src={author.avatar}
              classNames={{ display: "text-xs" }}
              initialColor="auto"
            />
            <span className="truncate">
              <Highlight query={query}>{author.name}</Highlight>
            </span>
          </a>
          <div className="flex shrink-0 items-center space-x-1.5 text-xs text-gray-400 dark:text-dark-300">
            <CalendarDaysIcon className="size-4" />
            <span>{created_at}</span>
          </div>
        </div>
      </Card>
    </Box>
  );
}
