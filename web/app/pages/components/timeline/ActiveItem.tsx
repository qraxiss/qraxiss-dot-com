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
  content: ReactNode;
  title: TimelineItemProps["title"];
  time: TimelineItemProps["time"];
  color: TimelineItemProps["color"];
  isActive: TimelineItemProps["isPing"];
};

const timeline: TimeLine[] = [
  {
    id: randomId(),
    title: "User Photo Changed",
    time: new Date().setMinutes(new Date().getMinutes() - 12),
    content: "John Doe changed his avatar photo",
    color: "neutral",
    isActive: undefined,
  },
  {
    id: randomId(),
    title: "Video Added",
    time: new Date().setHours(new Date().getHours() - 2),
    content: "Mores Clarke added new video",
    color: "primary",
    isActive: true,
  },
  {
    id: randomId(),
    title: "Design Completed",
    time: new Date().setHours(new Date().getHours() - 3),
    content: "Robert Nolan completed the design of the CRM application",
    color: "success",
    isActive: true,
  },
  {
    id: randomId(),
    title: "ER Diagram",
    time: new Date().setDate(new Date().getDate() - 1),
    content: "Team completed the ER diagram app",
    color: "warning",
    isActive: undefined,
  },
  {
    id: randomId(),
    title: "Weekly Report",
    time: new Date().setDate(new Date().getDate() - 2),
    content: "The weekly report was uploaded",
    color: "error",
    isActive: true,
  },
];

export function ActiveItem() {
  return (
    <div className="max-w-xl">
      <Timeline lineSpace="0.75rem">
        {timeline.map((item) => (
          <TimelineItem
            key={item.id}
            title={item.title}
            time={item.time}
            color={item.color}
            isPing={item.isActive}
          >
            {item.content}
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
