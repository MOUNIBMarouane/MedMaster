"use client";

import { useScrollReveal } from "@/lib/hooks";

const steps = [
  {
    number: "01",
    title: "Choisis ton année et ton module",
    description:
      "5 années d'études, 46 modules. Sélectionne exactement là où tu en es dans ton cursus.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Examen réel ou entraînement par sujet",
    description:
      "Mode Examen pour simuler les conditions réelles. Mode Sujet pour cibler tes points faibles avec précision.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Correction détaillée et suivi",
    description:
      "Chaque question a sa correction vérifiée. Suis ta progression module par module, sujet par sujet.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="comment-ca-marche" ref={ref} className="relative py-20 sm:py-28">
      <div className="section-container">
        <div
          className={`text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <span className="inline-block rounded-full bg-surface-100 px-4 py-1.5 text-sm font-semibold text-surface-800">
            Comment ça marche
          </span>
          <h2 className="mt-5 font-display text-display-lg text-surface-900">
            Simple. Efficace. Direct.
          </h2>
        </div>

        <div className="relative mx-auto mt-14 max-w-2xl">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-brand-200 via-brand-300 to-brand-200 sm:left-8 sm:block" />

          <div className="space-y-8 sm:space-y-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex items-start gap-5 sm:gap-7 transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                {/* Step number circle */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-200 bg-white text-brand-600 shadow-sm sm:h-16 sm:w-16">
                  <span className="font-display text-lg font-bold sm:text-xl">
                    {step.number}
                  </span>
                </div>

                <div className="pt-1 sm:pt-3">
                  <h3 className="font-display text-lg font-bold text-surface-900 sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-surface-800/65">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
