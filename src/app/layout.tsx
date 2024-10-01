import type { Metadata } from "next";
import "./globals.css";
import { FC } from "react";

export const metadata: Metadata = {
  title: "TicketMGMT",
  description: "Ticketing system",
};

import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
