// Import Dependencies
import { COLORS, ColorType } from "@/constants/app";
import {
  FaMicroscope,
  FaCheckDouble,
  FaRegClock,
  FaSpinner,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

// ----------------------------------------------------------------------

export interface Member {
  uid: string;
  name: string;
  avatar?: string;
}

export interface Label {
  id: string;
  text: string;
  color: ColorType;
}

export interface Task {
  id: string;
  title: string;
  slug: string;
  description?: string;
  cover?: string;
  status?: string;
  color?: ColorType;
  labels?: Label[];
  members?: Member[];
  attachmentsCount?: number;
  commentsCount?: number;
  dueDate?: Date;
}

export interface Column {
  id: string;
  name: string;
  slug: string;
  color: ColorType;
  Icon?: IconType;
  tasks: string[];
}

export interface Board {
  id: string;
  name: string;
  slug: string;
  isPrivate: boolean;
  columns: Column[];
  tasks: Task[];
}

// ----------------------------------------------------------------------

const year = new Date().getFullYear();

export const fakeBoards: Board[] = [
  {
    id: "1",
    name: "Ecommerce App",
    slug: "ecommerce-app",
    isPrivate: true,
    columns: [
      {
        id: "1",
        name: "In Progress",
        slug: "in-progress",
        color: "info",
        Icon: FaSpinner,
        tasks: ["task-1", "task-2", "task-3", "task-4"],
      },
      {
        id: "2",
        name: "Pending",
        slug: "pending",
        color: "warning",
        Icon: FaRegClock,
        tasks: ["task-5", "task-6", "task-7", "task-8", "task-9"],
      },
      {
        id: "3",
        name: "In Review",
        slug: "in-review",
        color: "secondary",
        Icon: FaMicroscope,
        tasks: [
          "task-10",
          "task-11",
          "task-12",
          "task-13",
          "task-14",
          "task-15",
          "task-16",
        ],
      },
      {
        id: "4",
        name: "Done",
        slug: "done",
        color: "success",
        Icon: FaCheckDouble,
        tasks: ["task-17", "task-18"],
      },
    ],
    tasks: [
      {
        id: "task-1",
        title: "Update Design",
        slug: "update-design",
        description: "Update Ecommerce Application Design",
        cover: "/web/images/objects/object-11.jpg",
        status: "in-progress",
        color: "neutral",
        labels: [
          {
            id: "1",
            text: "Update",
            color: "secondary",
          },
        ],
        members: [
          {
            uid: "1",
            name: "John Doe",
            avatar: undefined,
          },
          {
            uid: "2",
            name: "Emilia Clarke",
            avatar: "/web/images/avatar/avatar-11.jpg",
          },
          {
            uid: "3",
            name: "Majid Yahyaei",
            avatar: "/web/images/avatar/avatar-20.jpg",
          },
        ],
        attachmentsCount: 1,
        commentsCount: 3,
        dueDate: new Date(year, 5, 6),
      },
      {
        id: "task-2",
        title: "Sync With Google Analytics",
        slug: "sync-with-google-analytics",
        description: "Sync With Google Analytics",
        cover: undefined,
        status: "in-progress",
        color: "neutral",
        labels: [
          {
            id: "9",
            text: "Daily",
            color: "info",
          },
        ],
        members: [
          {
            uid: "4",
            name: "Travis Fuller",
            avatar: undefined,
          },
        ],
        commentsCount: 4,
        attachmentsCount: 0,
        dueDate: new Date(year, 5, 12),
      },
      {
        id: "task-3",
        title: "Add New Product",
        slug: "add-new-product",
        description: "Add New Product In System",
        cover: "/web/images/objects/object-5.jpg",
        status: "in-progress",
        color: "neutral",
        labels: [
          {
            id: "2",
            text: "Create",
            color: "primary",
          },
          {
            id: "3",
            text: "Improve",
            color: "success",
          },
        ],
        members: [
          {
            uid: "5",
            name: "Alfredo Elliott",
            avatar: "/web/images/avatar/avatar-4.jpg",
          },
          {
            uid: "6",
            name: "Henry Curtis",
            avatar: undefined,
          },
          {
            uid: "10",
            name: "Lance Tucker",
            avatar: "/web/images/avatar/avatar-18.jpg",
          },
        ],
        commentsCount: 3,
        attachmentsCount: 1,
        dueDate: new Date(year, 4, 23),
      },
      {
        id: "task-4",
        title: "Improve animation loader",
        slug: "improve-nimation-loader",
        description: "Improve animation loader for improve performance",
        cover: "/web/images/technology/dashboard.jpg",
        status: "in-progress",
        color: "success",
        labels: [
          {
            id: "6",
            text: "Performance",
            color: "error",
          },
        ],
        members: [
          {
            uid: "10",
            name: "Lance Tucker",
            avatar: "/web/images/avatar/avatar-18.jpg",
          },
        ],
        commentsCount: 0,
        attachmentsCount: 1,
        dueDate: new Date(year, 4, 17),
      },
      {
        id: "task-5",
        title: "Create Inventory Module",
        slug: "create-inventory-module",
        description: "Create inventrory module for ecommerce application",
        cover: undefined,
        status: "pending",
        color: "neutral",
        labels: [
          {
            id: "2",
            text: "Create",
            color: "primary",
          },
        ],
        members: [
          {
            uid: "11",
            name: "Katrina West",
            avatar: "/web/images/avatar/avatar-11.jpg",
          },
        ],
        commentsCount: 0,
        attachmentsCount: 2,
        dueDate: new Date(year, 5, 23),
      },
      {
        id: "task-6",
        title: "Pay App Wages",
        slug: "pay-apps-wage",
        description: "Pay apps wage for ecommerce application",
        cover: undefined,
        status: "pending",
        color: "warning",
        labels: [
          {
            id: "6",
            text: "Performance",
            color: "error",
          },
        ],
        members: [
          {
            uid: "1",
            name: "John Doe",
            avatar: undefined,
          },
          {
            uid: "2",
            name: "Emilia Clarke",
            avatar: "/web/images/avatar/avatar-11.jpg",
          },
          {
            uid: "3",
            name: "Majid Yahyaei",
            avatar: "/web/images/avatar/avatar-20.jpg",
          },
        ],
        commentsCount: 2,
        attachmentsCount: 1,
        dueDate: new Date(year, 7, 11),
      },
      {
        id: "task-7",
        title: "Testing New Features Application",
        slug: "testing-new-features-application",
        description: "Please test new feautures application",
        cover: "/web/images/technology/testing-sm.jpg",
        status: "pending",
        color: "neutral",
        labels: [
          {
            id: "4",
            text: "Feature",
            color: "warning",
          },
        ],
        members: [
          {
            uid: "1",
            name: "John Doe",
            avatar: undefined,
          },
          {
            uid: "2",
            name: "Emilia Clarke",
            avatar: "/web/images/avatar/avatar-11.jpg",
          },
          {
            uid: "3",
            name: "Majid Yahyaei",
            avatar: "/web/images/avatar/avatar-20.jpg",
          },
        ],
        commentsCount: 3,
        attachmentsCount: 2,
        dueDate: new Date(year, 6, 19),
      },
      {
        id: "task-8",
        title: "Daily New Post",
        slug: "daily-new-post",
        description: "Add new post to blog",
        cover: undefined,
        status: "pending",
        color: "neutral",
        labels: [
          {
            id: "7",
            text: "Blog",
            color: "info",
          },
          {
            id: "9",
            text: "Daily",
            color: "info",
          },
        ],
        members: [
          {
            uid: "12",
            name: "Samantha Shelton",
            avatar: "/web/images/avatar/avatar-11.jpg",
          },
        ],
        commentsCount: 0,
        attachmentsCount: 2,
        dueDate: new Date(year, 5, 23),
      },
      {
        id: "task-9",
        title: "Invite New Users",
        slug: "invite-new-users",
        description: "Invite new users to chatroom",
        cover: undefined,
        status: "pending",
        color: "neutral",
        labels: [
          {
            id: "1",
            color: "primary",
            text: "Daily",
          },
        ],
        members: [
          {
            uid: "13",
            name: "Corey Evans",
            avatar: "/web/images/avatar/avatar-1.jpg",
          },
          {
            uid: "5",
            name: "Alfredo Elliott",
            avatar: "/web/images/avatar/avatar-4.jpg",
          },
          {
            uid: "14",
            name: "Joe Perkins",
            avatar: "/web/images/avatar/avatar-5.jpg",
          },
        ],
        commentsCount: 6,
        attachmentsCount: 0,
        dueDate: new Date(year, 5, 23),
      },
      {
        id: "task-10",
        title: "Join To Discussion",
        slug: "join-to-discussion",
        description: "Join to weekend discussion",
        cover: undefined,
        status: "in-review",
        color: "info",
        labels: [
          {
            id: "1",
            color: "primary",
            text: "Support",
          },
        ],
        members: [
          {
            uid: "13",
            name: "Corey Evans",
            avatar: "/web/images/avatar/avatar-1.jpg",
          },
          {
            uid: "15",
            name: "Henry Cavil",
            avatar: undefined,
          },
          {
            uid: "14",
            name: "Joe Perkins",
            avatar: "/web/images/avatar/avatar-5.jpg",
          },
        ],
        commentsCount: 4,
        attachmentsCount: 0,
        dueDate: new Date(year, 5, 27),
      },
      {
        id: "task-11",
        title: "Convert Figma To React",
        slug: "convert-figma-to-react",
        description:
          "Convert the provided figma file to react & tailwind css project",
        cover: undefined,
        status: "in-review",
        color: "neutral",
        labels: [
          {
            id: "1",
            color: "info",
            text: "Create",
          },
        ],
        members: [
          {
            uid: "1",
            name: "John Doe",
            avatar: undefined,
          },
        ],
        commentsCount: 1,
        attachmentsCount: 2,
        dueDate: new Date(year, 5, 20),
      },
      {
        id: "task-12",
        title: "Build UI For Search",
        slug: "build-ui-for-search",
        description: "Create the UI of search module",
        cover: undefined,
        status: "in-review",
        color: "neutral",
        labels: [
          {
            id: "1",
            color: "info",
            text: "Create",
          },
        ],
        members: [
          {
            uid: "6",
            name: "Henry Curtis",
            avatar: undefined,
          },
        ],
        commentsCount: 2,
        attachmentsCount: 1,
        dueDate: new Date(year, 5, 22),
      },
      {
        id: "task-13",
        title: "Refactor Auth Endpoints",
        slug: "refactor-auth-endpoints",
        description: "Refactor Auth endpoints",
        cover: undefined,
        status: "in-review",
        color: "neutral",
        labels: [
          {
            id: "1",
            color: "success",
            text: "Update",
          },
        ],
        members: [
          {
            uid: "4",
            name: "Travis Fuller",
            avatar: undefined,
          },
        ],
        commentsCount: 1,
        attachmentsCount: 2,
        dueDate: new Date(year, 5, 13),
      },
      {
        id: "task-14",
        title: "Create Wireframe Prototype",
        slug: "create-wireframe-prototype",
        description: "Create Wireframe Prototype",
        cover: "/web/images/technology/hand-write-laptop.jpg",
        status: "in-review",
        color: "neutral",
        labels: [
          {
            id: "1",
            color: "info",
            text: "Create",
          },
        ],
        members: [
          {
            uid: "5",
            name: "Alfredo Elliott",
            avatar: "/web/images/avatar/avatar-4.jpg",
          },
        ],
        commentsCount: 2,
        attachmentsCount: 5,
        dueDate: new Date(year, 7, 3),
      },
      {
        id: "task-15",
        title: "Market Discovery",
        slug: "market-discovery",
        description: "Market Discovery",
        cover: "/web/images/technology/sales-presentation-sm.jpg",
        status: "in-review",
        color: "neutral",
        labels: [
          {
            id: "1",
            color: "warning",
            text: "Weekly",
          },
        ],
        members: [
          {
            uid: "2",
            name: "Emilia Clarke",
            avatar: "/web/images/avatar/avatar-11.jpg",
          },
          {
            uid: "3",
            name: "Majid Yahyaei",
            avatar: "/web/images/avatar/avatar-20.jpg",
          },
        ],
        commentsCount: 1,
        attachmentsCount: 0,
        dueDate: new Date(year, 7, 3),
      },
      {
        id: "task-16",
        title: "Design Setting Page",
        slug: "design-setting-page",
        description: "Design Setting Page",
        cover: undefined,
        status: "in-review",
        color: "neutral",
        labels: [
          {
            id: "1",
            color: "warning",
            text: "Weekly",
          },
        ],
        members: [
          {
            uid: "10",
            name: "Lance Tucker",
            avatar: "/web/images/avatar/avatar-18.jpg",
          },
        ],
        commentsCount: 2,
        attachmentsCount: 2,
        dueDate: new Date(year, 6, 2),
      },
      {
        id: "task-17",
        title: "Backup System",
        slug: "backup-system",
        description: "Backup Chats, videos and all datas",
        cover: undefined,
        status: "done",
        color: "error",
        labels: [
          {
            id: "1",
            color: "error",
            text: "Daily",
          },
        ],
        members: [
          {
            uid: "5",
            name: "Alfredo Elliott",
            avatar: "/web/images/avatar/avatar-4.jpg",
          },
        ],
        commentsCount: 1,
        attachmentsCount: 1,
        dueDate: new Date(year, 6, 8),
      },
      {
        id: "task-18",
        title: "Tracking Bugs",
        slug: "traking-bugs",
        description: "Traking app bugs",
        cover: undefined,
        status: "done",
        color: "neutral",
        labels: [],
        members: [
          {
            uid: "6",
            name: "Henry Curtis",
            avatar: undefined,
          },
        ],
        commentsCount: 3,
        attachmentsCount: 3,
        dueDate: new Date(year, 5, 9),
      },
    ],
  },
  {
    id: "2",
    name: "Banking App",
    slug: "banking-app",
    isPrivate: true,
    columns: [
      {
        id: "1",
        name: "In Progress",
        slug: "in-progress",
        color: "info",
        Icon: FaSpinner,
        tasks: ["task-1", "task-2"],
      },
      {
        id: "2",
        name: "Pending",
        slug: "pending",
        color: "warning",
        Icon: FaRegClock,
        tasks: ["task-3"],
      },
    ],
    tasks: [
      {
        id: "task-1",
        title: "Launch version 1.0",
        slug: "launch-version-1-0",
        description: "Launch initial app version",
        cover: undefined,
        status: "in-progress",
        color: "neutral",
        labels: [
          {
            id: "1",
            color: "secondary",
            text: "Launch",
          },
        ],
        members: [
          {
            uid: "1",
            name: "John Doe",
            avatar: undefined,
          },
          {
            uid: "2",
            name: "Emilia Clarke",
            avatar: "/web/images/avatar/avatar-11.jpg",
          },
          {
            uid: "3",
            name: "Majid Yahyaei",
            avatar: "/web/images/avatar/avatar-20.jpg",
          },
        ],
        commentsCount: 3,
        attachmentsCount: 1,
        dueDate: new Date(year, 5, 6),
      },
      {
        id: "task-2",
        title: "Review Users Feedback",
        slug: "review-users-feedback",
        description: "Review Users Feedback",
        cover: undefined,
        status: "in-progress",
        color: "info",
        labels: [
          {
            id: "1",
            color: "info",
            text: "Review",
          },
        ],
        members: [
          {
            uid: "2",
            name: "Emilia Clarke",
            avatar: "/web/images/avatar/avatar-11.jpg",
          },
        ],
        commentsCount: 1,
        attachmentsCount: 0,
        dueDate: new Date(year, 7, 11),
      },
      {
        id: "task-3",
        title: "Share Services In Instagram",
        slug: "share-services-in-instagram",
        description: "Share new services in instagram",
        cover: undefined,
        status: "pending",
        color: "neutral",
        labels: [
          {
            id: "1",
            color: "warning",
            text: "share",
          },
        ],
        members: [
          {
            uid: "4",
            name: "Travis Fuller",
            avatar: undefined,
          },
        ],
        commentsCount: 1,
        attachmentsCount: 0,
        dueDate: new Date(year, 6, 5),
      },
    ],
  },
  {
    id: "3",
    name: "LMS App",
    slug: "lms-app",
    isPrivate: false,
    columns: [
      {
        id: "1",
        name: "In Progress",
        slug: "in-progress",
        color: "info",
        Icon: FaSpinner,
        tasks: ["1"],
      },
      {
        id: "2",
        name: "Pending",
        slug: "pending",
        color: "warning",
        Icon: FaRegClock,
        tasks: ["2"],
      },
    ],
    tasks: [
      {
        id: "1",
        title: "Softlaunch Beta Version of application In Vercel Platform",
        slug: "softlaunch-beta-version-of-application-in-vercel-platform",
        description:
          "Softlaunch beta version of application in vercel platform for testing",
        cover: undefined,
        status: "in-progress",
        color: "neutral",
        labels: [
          {
            id: "1",
            color: "secondary",
            text: "Launch",
          },
        ],
        members: [
          {
            uid: "1",
            name: "John Doe",
            avatar: undefined,
          },
          {
            uid: "2",
            name: "Emilia Clarke",
            avatar: "/web/images/avatar/avatar-11.jpg",
          },
          {
            uid: "3",
            name: "Majid Yahyaei",
            avatar: "/web/images/avatar/avatar-20.jpg",
          },
        ],
        commentsCount: 1,
        attachmentsCount: 0,
        dueDate: new Date(year, 5, 11),
      },
      {
        id: "2",
        title: "Add Datatables",
        slug: "add-datatables",
        description: "Add datatables for control contents",
        cover: undefined,
        status: "pending",
        color: "neutral",
        labels: [],
        members: [
          {
            uid: "4",
            name: "Travis Fuller",
            avatar: undefined,
          },
        ],
        commentsCount: 1,
        attachmentsCount: 1,
        dueDate: new Date(year, 5, 10),
      },
    ],
  },
];

export const allMembers: Member[] = [
  {
    uid: "1",
    name: "John Doe",
    avatar: undefined,
  },
  {
    uid: "2",
    name: "Emilia Clarke",
    avatar: "/web/images/avatar/avatar-11.jpg",
  },
  {
    uid: "3",
    name: "Majid Yahyaei",
    avatar: "/web/images/avatar/avatar-20.jpg",
  },
  {
    uid: "4",
    name: "Travis Fuller",
    avatar: undefined,
  },
  {
    uid: "5",
    name: "Alfredo Elliott",
    avatar: "/web/images/avatar/avatar-4.jpg",
  },
  {
    uid: "6",
    name: "Henry Curtis",
    avatar: undefined,
  },
  {
    uid: "10",
    name: "Lance Tucker",
    avatar: "/web/images/avatar/avatar-18.jpg",
  },
  {
    uid: "11",
    name: "Katrina West",
    avatar: "/web/images/avatar/avatar-11.jpg",
  },
  {
    uid: "12",
    name: "Samantha Shelton",
    avatar: "/web/images/avatar/avatar-11.jpg",
  },
  {
    uid: "13",
    name: "Corey Evans",
    avatar: "/web/images/avatar/avatar-1.jpg",
  },
  {
    uid: "14",
    name: "Joe Perkins",
    avatar: "/web/images/avatar/avatar-5.jpg",
  },
  {
    uid: "15",
    name: "Henry Cavil",
    avatar: undefined,
  },
];

export const labels: Label[] = [
  {
    id: "1",
    color: "secondary",
    text: "Update",
  },
  {
    id: "2",
    color: "primary",
    text: "Create",
  },
  {
    id: "3",
    color: "success",
    text: "Improve",
  },
  {
    id: "4",
    text: "Feature",
    color: "warning",
  },
  {
    id: "5",
    color: "primary",
    text: "Support",
  },
  {
    id: "6",
    color: "error",
    text: "Performance",
  },
  {
    id: "7",
    color: "info",
    text: "Blog",
  },
  {
    id: "8",
    color: "warning",
    text: "Weekly",
  },
  {
    id: "9",
    color: "info",
    text: "Daily",
  },
];

export const colors = COLORS;
