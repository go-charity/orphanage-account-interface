import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import icon from "@/app/favicon.ico";
import Header from "@/components/Header";
import ReduxStoreComponent from "@/components/ReduxStoreComponent";
import PortalComponent from "@/components/PortalComponent";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "GO.Charity",
  description: "The account dashboard interface for the GO.Charity platform",
  icons: { icon: icon.src },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          {...{ crossorigin: "anonymous" }}
          {...{ referrerpolicy: "no-referrer" }}
        />
      </head>
      <body className={poppins.className}>
        <Header />
        <main>
          <div id="portal_dest"></div>
          <ReduxStoreComponent>
            <PortalComponent />
            {children}
          </ReduxStoreComponent>
        </main>
      </body>
    </html>
  );
}
