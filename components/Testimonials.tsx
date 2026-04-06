"use client";

import { useScrollReveal } from "@/lib/hooks";

const testimonials = [
  {
    quote:
      "Je passais mes soirées à jongler entre trois sites différents juste pour trouver les bonnes annales. C'est épuisant. J'attends MedMaster depuis trop longtemps.",
    name: "Karim A.",
    year: "4ème année",
    faculty: "FMPC · Casablanca",
    avatar: "KA",
    avatarColor: "bg-brand-100 text-brand-700",
  },
  {
    quote:
      "Dans le bus, à la clinique, chez moi — j'ai besoin de réviser partout. Le mode hors-ligne c'est exactement ce qui manque sur tous les sites actuels.",
    name: "Salma B.",
    year: "3ème année",
    faculty: "FMPM · Marrakech",
    avatar: "SB",
    avatarColor: "bg-violet-100 text-violet-700",
  },
  {
    quote:
      "En tant qu'interne, j'arrive en stage sans savoir ce qu'on attend vraiment de moi. Le Stage Hub c'est l'idée que j'aurais voulu avoir dès ma première rotation.",
    name: "Mehdi R.",
    year: "Interne",
    faculty: "FMPR · Rabat",
    avatar: "MR",
    avatarColor: "bg-emerald-100 text-emerald-700",
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-50/60 to-surface-0" />

      <div className="section-container relative">
        <div
          className={`text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <span className="inline-block rounded-full bg-surface-100 px-4 py-1.5 text-sm font-semibold text-surface-800">
            Ce que disent les étudiants
          </span>
          <h2 className="mt-5 font-display text-display-lg text-surface-900">
            Tu n'es pas seul(e)
            <br className="hidden sm:block" />
            à galérer avec ça.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl border border-surface-200 bg-white p-7 shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-surface-900/5 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: `${150 + i * 120}ms` }}
            >
              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {[...Array(5)].map((_, s) => (
                  <svg
                    key={s}
                    className="h-4 w-4 text-amber-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="flex-1 text-[15px] leading-relaxed text-surface-800/75">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${t.avatarColor}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-surface-900">{t.name}</p>
                  <p className="text-xs text-surface-800/50">
                    {t.year} · {t.faculty}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
