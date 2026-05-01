import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/locales";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <ViewTransition
      enter={{
        "masala-forward": "masala-forward",
        "masala-back": "masala-back",
        default: "none",
      }}
      exit={{
        "masala-forward": "masala-forward",
        "masala-back": "masala-back",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
