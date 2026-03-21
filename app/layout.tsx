import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedMaster — Toutes les annales de médecine sur ton téléphone",
  description:
    "La première vraie app mobile pour réviser les QCM de médecine au Maroc. 50 000 questions, 11 ans d'annales (2015–2025), filtrage par sujet précis, mode hors-ligne. Rejoins la liste d'attente.",
  keywords: [
    "QCM médecine Maroc",
    "annales médecine Casablanca",
    "FMPC QCM",
    "révision médecine",
    "app QCM médecine",
    "MedMaster",
    "externat médecine Maroc",
  ],
  authors: [{ name: "MindOn Tech" }],
  openGraph: {
    title: "MedMaster — Toutes les annales de médecine sur ton téléphone",
    description:
      "50 000 questions. 11 ans d'annales. La première vraie app mobile pour les étudiants en médecine au Maroc.",
    url: "https://medmaster.ma",
    siteName: "MedMaster",
    locale: "fr_MA",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MedMaster — App mobile QCM médecine Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MedMaster — Toutes les annales de médecine sur ton téléphone",
    description:
      "50 000 questions. 11 ans d'annales. La première vraie app mobile pour les étudiants en médecine au Maroc.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#059669" />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
