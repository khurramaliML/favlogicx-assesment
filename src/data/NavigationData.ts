
export interface NavigationEntry {
  title: string;
  iconKey: "inbox" | "contacts" | "ai" | "workflows" | "campaigns";
  route: string;
}

export interface NavigationConfig {
  brandLogo: string;
  items: NavigationEntry[];
  settingsAsset: string;
}

export const NavigationData: NavigationConfig = {
  brandLogo: "/BOXpad.png",

  items: [
    {
      title: "Inbox",
      iconKey: "inbox",
      route: "/dashboard/inbox",
    },
    {
      title: "Contact Us",
      iconKey: "contacts",
      route: "/dashboard/contacts",
    },
    {
      title: "AI",
      iconKey: "ai",
      route: "/dashboard/ai-employees",
    },
    {
      title: "Workflows",
      iconKey: "workflows",
      route: "/dashboard/workflows",
    },
    {
      title: "Campaigns",
      iconKey: "campaigns",
      route: "/dashboard/campaigns",
    },
  ],

  settingsAsset: "/setting.svg",
};