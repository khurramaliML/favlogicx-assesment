import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
export const metadata: Metadata = {
  title: "Platform Navigation",
  description:
    "Navigate through platform modules including messaging, analytics, and system management tools.",
  openGraph: {
    title: "Platform Navigation",
    description:
      "Quickly access your core modules and manage your workspace efficiently.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
