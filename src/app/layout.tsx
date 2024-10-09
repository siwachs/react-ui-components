import type { Metadata } from "next";
import "@/assets/globals.css";

export const metadata: Metadata = {
  title: "React UI Components",
  description: "A repo to upskill in react ui development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
