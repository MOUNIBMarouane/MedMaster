"use client";

import { useState } from "react";
import { useScrollReveal } from "@/lib/hooks";

const faqs = [
  {
    q: "C'est gratuit ?",
    a: "Oui, entièrement. L'inscription sur la liste d'attente est gratuite, sans engagement. Les premiers inscrits bénéficieront d'un accès anticipé à l'app dès le lancement.",
  },
  {
    q: "Quand sort l'app ?",
    a: "On travaille activement sur le lancement. Plutôt que de donner une date et ne pas la tenir, on préfère te prévenir dès que c'est prêt — les inscrits sont les premiers informés.",
  },
  {
    q: "Disponible sur iPhone et Android ?",
    a: "Oui. MedMaster sera disponible sur iOS et Android dès le lancement. Une vraie app native — pas un site web déguisé.",
  },
  {
    q: "Pour quelle faculté ?",
    a: "MedMaster couvre les annales des principales facultés de médecine du Maroc : FMPC, FMPR, FMPM, FMPT, UM6SS et d'autres. Si ta faculté n'est pas listée, inscris-toi quand même — on l'ajoutera.",
  },
  {
    q: "C'est quoi le Stage Hub ?",
    a: "Le Stage Hub est une fonctionnalité dédiée aux internes et étudiants en rotation clinique. Pour chaque spécialité, tu accèdes à un guide de survie vérifié par un médecin spécialiste, et à des QCMs ciblés pour savoir si tu es prêt(e) avant de commencer.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Oui. On ne partage jamais tes informations avec des tiers. Ton email sert uniquement à te prévenir du lancement — rien d'autre. Tu peux te désinscrire à tout moment.",
  },
];

export default function FAQ() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="section-container">
        <div
          className={`text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            Questions fréquentes
          </span>
          <h2 className="mt-5 font-display text-display-lg text-surface-900">
            Tu as des questions.
            <br className="hidden sm:block" />
            On a les réponses.
          </h2>
        </div>

        <div
          className={`mx-auto mt-12 max-w-2xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="divide-y divide-surface-200 rounded-2xl border border-surface-200 bg-white shadow-sm">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-50/60"
                >
                  <span className="text-[15px] font-semibold text-surface-900">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-surface-200 text-surface-800/50 transition-all duration-200 ${openIndex === i ? "rotate-45 border-brand-200 bg-brand-50 text-brand-600" : ""}`}
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-48" : "max-h-0"}`}
                >
                  <p className="px-6 pb-5 text-[15px] leading-relaxed text-surface-800/65">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-surface-800/45">
            Une autre question ?{" "}
            <a
              href="mailto:contact@medmaster.ma"
              className="font-medium text-brand-600 hover:underline"
            >
              Écris-nous
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
