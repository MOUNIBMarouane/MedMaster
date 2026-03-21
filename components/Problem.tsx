"use client";

import { useScrollReveal } from "@/lib/hooks";

const problems = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    text: "Des sites web qui buguent sur téléphone, pas de vraie app mobile",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    text: "Un filtrage trop large par chapitre — impossible de cibler un sujet précis",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a4.5 4.5 0 000-6.364" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6" />
      </svg>
    ),
    text: "Aucun mode hors-ligne — pas de réseau, pas de révision",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    text: "Jongler entre 3 sites différents pour trouver les bonnes annales",
  },
];

export default function Problem() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="section-container">
        <div
          className={`mx-auto max-w-3xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="text-center">
            <span className="inline-block rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-600">
              Le problème
            </span>
            <h2 className="mt-5 font-display text-display-lg text-surface-900">
              Réviser les QCM au Maroc,
              <br className="hidden sm:block" />
              c'est encore le chaos
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {problems.map((problem, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 rounded-2xl border border-surface-200 bg-surface-50 p-5 transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: `${150 + i * 100}ms` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500">
                  {problem.icon}
                </div>
                <p className="text-[15px] leading-relaxed text-surface-800">
                  {problem.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
