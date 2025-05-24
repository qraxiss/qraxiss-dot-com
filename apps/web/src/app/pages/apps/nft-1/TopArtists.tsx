// Local Imports
import { Avatar, Button, Card } from "@/components/ui";

// ----------------------------------------------------------------------

interface Artist {
  uid: string;
  name: string;
  avatar?: string;
  itemsCount: string;
}

const artists: Artist[] = [
  {
    uid: "1",
    name: "Travis Fuller",
    avatar: "/web/images/avatar/avatar-20.jpg",
    itemsCount: "1649",
  },
  {
    uid: "2",
    name: "Katrina West",
    avatar: "/web/images/avatar/avatar-11.jpg",
    itemsCount: "691",
  },
  {
    uid: "3",
    name: "Henry Curtis",
    avatar: "/web/images/avatar/avatar-19.jpg",
    itemsCount: "329",
  },
  {
    uid: "4",
    name: "Lance Tucker",
    avatar: undefined,
    itemsCount: "762",
  },
  {
    uid: "5",
    name: "Mores Clarke",
    avatar: "/web/images/avatar/avatar-5.jpg",
    itemsCount: "695",
  },
];

export function TopArtists() {
  return (
    <Card className="px-4 pb-4">
      <div className="flex h-14 min-w-0 items-center justify-between py-3">
        <h2 className="dark:text-dark-100 font-medium tracking-wide text-gray-800">
          Top Artists
        </h2>
        <a
          href="##"
          className="text-xs-plus text-primary-600 hover:text-primary-600/70 focus:text-primary-600/70 dark:text-primary-400 dark:hover:text-primary-400/70 dark:focus:text-primary-400/70 border-b border-dotted border-current pb-0.5 font-medium outline-hidden transition-colors duration-300"
        >
          View All
        </a>
      </div>
      <div className="space-y-4">
        {artists.map((artist) => (
          <div
            key={artist.uid}
            className="flex min-w-0 items-center justify-between gap-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <Avatar
                size={10}
                src={artist.avatar}
                name={artist.name}
                initialColor="auto"
              />
              <div className="flex min-w-0 flex-col">
                <span className="dark:text-dark-100 truncate text-sm font-medium text-gray-800">
                  {artist.name}
                </span>
                <span className="dark:text-dark-300 mt-0.5 truncate text-xs text-gray-400">
                  {artist.itemsCount} items
                </span>
              </div>
            </div>
            <Button color="primary" className="h-7 rounded-full px-2.5 text-xs">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
