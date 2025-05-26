export interface Post {
  uid: string;
  cover: string;
  category: string;
  created_at: string;
  title: string;
  description: string;
  likes: number;
}

export const posts: Post[] = [
  {
    uid: "1",
    cover: "/web/images/objects/object-2.jpg",
    category: "Frameworks",
    created_at: "a hour ago",
    title: "Food: A Simple Definition",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi necessitatibus repellat voluptatibus?",
    likes: 32,
  },
  {
    uid: "2",
    cover: "/web/images/objects/object-1.jpg",
    category: "Frameworks",
    created_at: "12 min ago",
    title: "Tailwind CSS Card Example",
    description:
      "Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor on the sit.",
    likes: 65,
  },
  {
    uid: "3",
    cover: "/web/images/objects/object-3.jpg",
    category: "Music",
    created_at: "a day ago",
    title: "What is PHP?",
    description:
      "How Did We Get Here? The History of Music Told Through Tweets",
    likes: 126,
  },
  {
    uid: "4",
    cover: "/web/images/objects/object-4.jpg",
    category: "UI/UX Design",
    created_at: "2 days ago",
    title: "Top Design Systems",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda.",
    likes: 658,
  },
  {
    uid: "5",
    cover: "/web/images/objects/object-5.jpg",
    category: "UI/UX Design",
    created_at: "2 days ago",
    title: "Top Design Systems",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda.",
    likes: 268,
  },
  {
    uid: "6",
    cover: "/web/images/objects/object-6.jpg",
    category: "Music",
    created_at: "5 days ago",
    title: "How Did We Get Here? The History of Music Told Through Tweets",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    likes: 38,
  },
  {
    uid: "7",
    cover: "/web/images/objects/object-7.jpg",
    category: "Programming",
    created_at: "11 days ago",
    title: "NodeJS Design Patterns",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    likes: 79,
  },
  {
    uid: "8",
    cover: "/web/images/objects/object-8.jpg",
    category: "UI/UX Design",
    created_at: "14 days ago",
    title: "313 Pattern and Color ideas",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    likes: 126,
  },
  {
    uid: "9",
    cover: "/web/images/objects/object-9.jpg",
    category: "Home",
    created_at: "22 days ago",
    title: "25 Surprising Facts About Chair",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    likes: 215,
  },
  {
    uid: "10",
    cover: "/web/images/objects/object-10.jpg",
    category: "Music",
    created_at: "25 days ago",
    title: "What is PHP?",
    description:
      "How Did We Get Here? The History of Music Told Through Tweets",
    likes: 127,
  },
  {
    uid: "11",
    cover: "/web/images/objects/object-11.jpg",
    category: "Frameworks",
    created_at: "a month ago",
    title: "Food: A Simple Definition",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi necessitatibus repellat voluptatibus?",
    likes: 32,
  },
  {
    uid: "12",
    cover: "/web/images/objects/object-12.jpg",
    category: "Frameworks",
    created_at: "12 month ago",
    title: "Tailwind CSS Card Example",
    description:
      "Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor on the sit.",
    likes: 65,
  },
];
