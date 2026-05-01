import type { Metadata } from "next";
import ConsoleBrand from "@/components/ConsoleBrand";
import EntryTransition from "@/components/EntryTransition";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masala Indian Restaurant | Authentic Indian Cuisine",
  description:
    "Experience authentic Indian flavours at Masala Indian Restaurant with tandoori dishes, curries, vegetarian choices and a full drinks menu.",
  authors: [{ name: "lowhp.studio", url: "https://lowhp.studio" }],
  creator: "lowhp.studio",
  publisher: "Masala Indian Restaurant",
  other: {
    "designed-by": "lowhp.studio — https://lowhp.studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="font-sans" data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{__html:`(function(){try{if(!sessionStorage.getItem('masala-entry-transition-complete')){var s=document.createElement('style');s.id='entry-block';s.textContent='body{visibility:hidden}';document.head.appendChild(s);}}catch(e){}})();`}} />
        <noscript><style>{`body{visibility:visible!important}`}</style></noscript>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Masala Indian Restaurant" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-page text-ink font-body antialiased">
        <div
          aria-hidden="true"
          style={{ display: "none" }}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              "<!--\n  ───────────────────────────────────────────────\n   Masala Indian Restaurant\n   Designed & built by lowhp.studio\n   → https://lowhp.studio\n  ───────────────────────────────────────────────\n-->",
          }}
        />
        <ConsoleBrand />
        <MotionProvider>
          <EntryTransition />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
