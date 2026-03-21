"use client";

import { useScrollReveal } from "@/lib/hooks";

const pillars = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: "Vraie app mobile",
    subtitle: "Pas un site web.",
    description:
      "Une app native conçue pour ton téléphone. Rapide, fluide, belle. Et surtout : elle fonctionne même sans connexion internet.",
    accent: "from-brand-400 to-emerald-500",
    bgAccent: "bg-brand-50",
    iconBg: "bg-brand-100 text-brand-700",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
      </svg>
    ),
    title: "Mode Sujet unique",
    subtitle: "Pas juste par chapitre.",
    description:
      "Filtre par sujet précis à travers 11 ans d'examens. Sélectionne « Anatomie du cœur » et travaille les 127 questions qui existent sur ce thème.",
    accent: "from-violet-400 to-purple-500",
    bgAccent: "bg-violet-50",
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "11 ans d'annales vérifiées",
    subtitle: "2015 — 2025. Complet.",
    description:
      "Chaque question, chaque correction, chaque explication. Vérifié par des étudiants qui sont passés par là. 50 000 questions, zéro improvisation.",
    accent: "from-amber-400 to-orange-500",
    bgAccent: "bg-amber-50",
    iconBg: "bg-amber-100 text-amber-700",
  },
];

export default function Pillars() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-brand-50/30 to-surface-0" />

      <div className="section-container relative">
        <div
          className={`text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            Pourquoi MedMaster
          </span>
          <h2 className="mt-5 font-display text-display-lg text-surface-900">
            Tout ce qui manque,
            <br className="hidden sm:block" />
            dans une seule app
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3 sm:gap-5 lg:gap-8">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-surface-200 bg-white p-7 transition-all duration-500 hover:border-surface-200/50 hover:shadow-xl hover:shadow-surface-900/5 sm:p-8 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              {/* Top accent line */}
              <div
                className={`mb-6 h-1 w-12 rounded-full bg-gradient-to-r ${pillar.accent}`}
              />

              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${pillar.iconBg}`}
              >
                {pillar.icon}
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-surface-900">
                {pillar.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand-600">
                {pillar.subtitle}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-surface-800/70">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
