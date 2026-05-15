import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homeless Aid Finder",
  description:
    "A mobile-first resource finder for shelter, food, hygiene, public resources, and supplies.",
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "/icons/icon.svg", type: "image/svg+xml" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(function () {});
}
`,
          }}
        />
      </body>
    </html>
  );
}
