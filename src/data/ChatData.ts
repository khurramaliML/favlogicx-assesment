
export interface Message {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}
// Header Icons
export interface HeaderButton {
  icon: string;
}

export const headerButtons: HeaderButton[] = [
  {
    icon: "/qlementine-icons_menu-dots-16.png",
  },
  {
    icon: "/Frame 134.svg",
  },
  {
    icon: "/icons/inbox.png",
  },
];
