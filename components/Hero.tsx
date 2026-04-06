"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [signupCount, setSignupCount] = useState<number | null>(null);

  useEffect(() => {
    setLoaded(true);
    fetch("/api/count")
      .then((res) => res.json())
      .then((data) => setSignupCount(data.count))
      .catch(() => {});
  }, []);

  return (
    <section className="hero-gradient noise-overlay relative min-h-[100svh] overflow-hidden">
      <div className="hero-grid absolute inset-0" />

      {/* Floating ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -left-20 bottom-40 h-56 w-56 rounded-full bg-brand-400/8 blur-3xl" />
      </div>

      <div className="section-container relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 pt-20">
        <div className="mx-auto max-w-4xl text-center">

          {/* Live social proof badge */}
          <div
            className={`mb-8 transition-all duration-700 ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {signupCount && signupCount > 0 ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
                </span>
                {signupCount.toLocaleString("fr-FR")} étudiants déjà inscrits · Accès anticipé ouvert
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
                </span>
                Lancement imminent · Accès anticipé ouvert
              </span>
            )}
          </div>

          {/* Headline */}
          <h1
            className={`font-display text-display-xl text-white transition-all delay-100 duration-700 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            50 000 QCMs. 11 ans d'annales.
            <br />
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-300 bg-clip-text text-transparent">
              Une seule app. Enfin.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60 transition-all delay-200 duration-700 sm:text-xl ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            Filtre par sujet précis, révise hors-ligne, suis ta progression —
            tout sur ton téléphone.{" "}
            <span className="text-white/80">
              La première vraie app de révision médicale au Maroc.
            </span>
          </p>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-col items-center gap-4 transition-all delay-300 duration-700 sm:flex-row sm:justify-center ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            <a href="#inscription" className="btn-primary w-full sm:w-auto">
              Réserver mon accès anticipé
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            <a
              href="#comment-ca-marche"
              className="text-sm font-medium text-white/50 underline-offset-4 hover:text-white/80 hover:underline transition-colors"
            >
              Voir comment ça marche →
            </a>
          </div>

          {/* Trust line */}
          <p
            className={`mt-4 text-sm text-white/30 transition-all delay-400 duration-700 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            Gratuit · Aucun engagement · Aucune carte requise
          </p>

          {/* Phone mockup */}
          <div
            className={`mt-16 transition-all delay-500 duration-1000 sm:mt-20 ${loaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            <div className="relative mx-auto w-[260px] sm:w-[280px]">
              {/* Glow */}
              <div className="absolute -inset-8 rounded-[3rem] bg-brand-500/15 blur-2xl" />

              {/* Phone frame */}
              <div className="phone-glow relative overflow-hidden rounded-[2.5rem] border-2 border-white/10 bg-surface-950 p-2">
                <div className="overflow-hidden rounded-[2rem] bg-gradient-to-b from-surface-800 to-surface-900">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pb-1 pt-3">
                    <span className="text-xs font-medium text-white/50">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="h-2.5 w-4 rounded-sm border border-white/50">
                        <div className="m-0.5 h-1.5 w-2 rounded-sm bg-brand-400" />
                      </div>
                    </div>
                  </div>

                  {/* App UI mockup */}
                  <div className="px-5 pb-8 pt-4">
                    {/* App header */}
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/40">Bonjour, Youssef</p>
                        <p className="text-sm font-semibold text-white">
                          3ème année · Module 14
                        </p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20">
                        <span className="text-xs font-bold text-brand-400">YA</span>
                      </div>
                    </div>

                    {/* Mode toggle */}
                    <div className="mb-4 flex gap-2 rounded-xl bg-white/5 p-1">
                      <div className="flex-1 rounded-lg bg-brand-600 py-2 text-center text-xs font-semibold text-white">
                        Mode Sujet
                      </div>
                      <div className="flex-1 rounded-lg py-2 text-center text-xs font-medium text-white/40">
                        Mode Examen
                      </div>
                    </div>

                    {/* Topic cards */}
                    <div className="space-y-2.5">
                      <div className="rounded-xl border border-white/8 bg-white/5 p-3.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-white">Anatomie du cœur</p>
                            <p className="mt-0.5 text-[10px] text-white/40">127 questions · 11 annales</p>
                          </div>
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/20">
                            <svg className="h-3.5 w-3.5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/8 bg-white/5 p-3.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-white">Système nerveux central</p>
                            <p className="mt-0.5 text-[10px] text-white/40">93 questions · 8 annales</p>
                          </div>
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/20">
                            <svg className="h-3.5 w-3.5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/8 bg-white/5 p-3.5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-white">Physiologie rénale</p>
                            <p className="mt-0.5 text-[10px] text-white/40">78 questions · 9 annales</p>
                          </div>
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/20">
                            <svg className="h-3.5 w-3.5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-0 to-transparent" />
    </section>
  );
}
