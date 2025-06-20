// Local Imports
import {
  Timeline,
  TimelineItem,
  type TimelineItemProps,
} from "@/components/ui";
import { randomId } from "@/utils/randomId";
import { ReactNode } from "react";

// ----------------------------------------------------------------------

type TimeLine = {
  id: string;
  title: TimelineItemProps["title"];
  time: TimelineItemProps["time"];
  content: ReactNode;
  color: TimelineItemProps["color"];
};

const timeline: TimeLine[] = [
  {
    id: randomId(),
    title: "User Photo Changed",
    time: new Date().setMinutes(new Date().getMinutes() - 12),
    content: "John Doe changed his avatar photo",
    color: "neutral",
  },
  {
    id: randomId(),
    title: "Video Added",
    time: new Date().setHours(new Date().getHours() - 2),
    content: "Mores Clarke added new video",
    color: "primary",
  },
  {
    id: randomId(),
    title: "Design Completed",
    time: new Date().setHours(new Date().getHours() - 3),
    content: "Robert Nolan completed the design of the CRM application",
    color: "success",
  },
  {
    id: randomId(),
    title: "ER Diagram",
    time: new Date().setDate(new Date().getDate() - 1),
    content: "Team completed the ER diagram app",
    color: "warning",
  },
  {
    id: randomId(),
    title: "Weekly Report",
    time: new Date().setDate(new Date().getDate() - 2),
    content: "The weekly report was uploaded",
    color: "error",
  },
];

export function Basic() {
  return (
    <div className="max-w-xl">
      <Timeline>
        {timeline.map((item) => (
          <TimelineItem
            key={item.id}
            title={item.title}
            time={item.time}
            color={item.color}
          >
            {item.content}
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
