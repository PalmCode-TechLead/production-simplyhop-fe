import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/core/utils/react_query";
import { GlobalProvider, UserProvider } from "@/core/modules/app/context";
import Head from "next/head";

const APP_NAME = "Simply Hop";
const APP_DEFAULT_TITLE = "Simply Hop";
const APP_TITLE_TEMPLATE = "%s - Simply Hop";
const APP_DESCRIPTION = "Mitfahrgelegenheiten in deiner Stadt";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
  themeColor: "#fff",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <Head>
          <meta property="og:title" content={APP_DEFAULT_TITLE} />
          <meta property="og:description" content={APP_DESCRIPTION} />
          <meta property="og:image" content="/logo/metea_logo.png" />

          <meta property="og:type" content="website" />
        </Head>
      </Head>
      <body className={`${inter.variable} antialiased`}>
        <ReactQueryProvider>
          <UserProvider>
            <GlobalProvider>{children}</GlobalProvider>
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
