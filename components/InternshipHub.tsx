"use client";

import { useState, useEffect, useCallback } from "react";
import { useScrollReveal } from "@/lib/hooks";

const SPECIALTIES = [
  {
    id: "cardio",
    name: "Cardiologie",
    icon: "🫀",
    tips: 47,
    qcms: 120,
    waiting: 127,
    doctor: "Dr. Alaoui",
    color: "from-red-400 to-rose-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    activeRing: "ring-red-400",
    guideTips: [
      "Toujours ausculter les 4 foyers cardiaques en début de visite",
      "Savoir interpréter un ECG 12 dérivations en < 2 min",
      "Connaître les critères de Framingham pour l'insuffisance cardiaque",
      "Maîtriser les posologies des anti-hypertenseurs de première ligne",
    ],
    sampleQuestion: "Quel est le signe ECG pathognomonique d'un infarctus du myocarde en phase aiguë ?",
    sampleOptions: [
      "Onde T inversée",
      "Sus-décalage du segment ST",
      "Bloc de branche droit",
      "Extrasystoles ventriculaires",
    ],
    correctAnswer: 1,
    readiness: 68,
  },
  {
    id: "neuro",
    name: "Neurologie",
    icon: "🧠",
    tips: 38,
    qcms: 95,
    waiting: 98,
    doctor: "Dr. Benani",
    color: "from-violet-400 to-purple-500",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    activeRing: "ring-violet-400",
    guideTips: [
      "Examen neurologique systématique : conscience, paires crâniennes, motricité, sensibilité",
      "Connaître les scores de Glasgow et de NIHSS par cœur",
      "Savoir différencier AVC ischémique et hémorragique à l'imagerie",
      "Maîtriser les indications de la ponction lombaire",
    ],
    sampleQuestion: "Un patient présente une hémiparésie droite et une aphasie. Quelle artère est probablement atteinte ?",
    sampleOptions: [
      "Artère cérébrale postérieure gauche",
      "Artère cérébrale moyenne gauche",
      "Artère cérébrale antérieure droite",
      "Artère basilaire",
    ],
    correctAnswer: 1,
    readiness: 74,
  },
  {
    id: "chirurgie",
    name: "Chirurgie",
    icon: "🔪",
    tips: 52,
    qcms: 140,
    waiting: 156,
    doctor: "Pr. El Fassi",
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    activeRing: "ring-blue-400",
    guideTips: [
      "Connaître les temps opératoires d'une appendicectomie par cœur",
      "Savoir reconnaître les signes de péritonite à l'examen clinique",
      "Maîtriser la classification ASA pour l'évaluation pré-opératoire",
      "Apprendre les nœuds chirurgicaux de base dès la première semaine",
    ],
    sampleQuestion: "Quel est le signe clinique le plus spécifique d'une appendicite aiguë ?",
    sampleOptions: [
      "Douleur à la fosse iliaque droite",
      "Signe de McBurney",
      "Défense abdominale généralisée",
      "Nausées et vomissements",
    ],
    correctAnswer: 1,
    readiness: 71,
  },
  {
    id: "pediatrie",
    name: "Pédiatrie",
    icon: "👶",
    tips: 41,
    qcms: 110,
    waiting: 89,
    doctor: "Dr. Chraibi",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    activeRing: "ring-amber-400",
    guideTips: [
      "Connaître le calendrier vaccinal marocain sur le bout des doigts",
      "Savoir calculer la dose pédiatrique selon le poids (règle de Young)",
      "Reconnaître les signes de déshydratation chez le nourrisson",
      "Maîtriser les courbes de croissance et les signaux d'alerte",
    ],
    sampleQuestion: "À quel âge un nourrisson devrait-il doubler son poids de naissance ?",
    sampleOptions: ["3 mois", "5 mois", "8 mois", "12 mois"],
    correctAnswer: 1,
    readiness: 65,
  },
  {
    id: "gyneco",
    name: "Gynécologie",
    icon: "🤰",
    tips: 44,
    qcms: 105,
    waiting: 112,
    doctor: "Dr. Idrissi",
    color: "from-pink-400 to-fuchsia-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    activeRing: "ring-pink-400",
    guideTips: [
      "Maîtriser le suivi de grossesse normale mois par mois",
      "Connaître les indications de la césarienne en urgence",
      "Savoir interpréter un monitoring fœtal (CTG)",
      "Reconnaître les signes de pré-éclampsie sévère",
    ],
    sampleQuestion: "À partir de quelle valeur de tension artérielle parle-t-on d'hypertension chez la femme enceinte ?",
    sampleOptions: ["130/80 mmHg", "140/90 mmHg", "150/100 mmHg", "160/110 mmHg"],
    correctAnswer: 1,
    readiness: 70,
  },
  {
    id: "urgences",
    name: "Urgences",
    icon: "🚨",
    tips: 55,
    qcms: 130,
    waiting: 143,
    doctor: "Dr. Tazi",
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    activeRing: "ring-emerald-400",
    guideTips: [
      "Apprendre le protocole ABCDE dès le premier jour",
      "Savoir trier les patients selon l'échelle de triage (CIMU)",
      "Maîtriser les gestes d'urgence : intubation, VVP, drainage",
      "Connaître les antidotes des intoxications les plus fréquentes",
    ],
    sampleQuestion: "Dans la prise en charge initiale d'un polytraumatisé, quelle est la première étape selon le protocole ABCDE ?",
    sampleOptions: [
      "Breathing — ventilation",
      "Airway — libération des voies aériennes",
      "Circulation — contrôle hémorragique",
      "Disability — examen neurologique",
    ],
    correctAnswer: 1,
    readiness: 78,
  },
  {
    id: "medint",
    name: "Médecine interne",
    icon: "🩺",
    tips: 49,
    qcms: 135,
    waiting: 104,
    doctor: "Pr. Zouaki",
    color: "from-indigo-400 to-blue-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    activeRing: "ring-indigo-400",
    guideTips: [
      "Savoir rédiger une observation médicale complète et structurée",
      "Maîtriser les bilans d'auto-immunité (ANA, anti-DNA, etc.)",
      "Connaître les critères diagnostiques du lupus et de la polyarthrite",
      "Interpréter une électrophorèse des protéines sériques",
    ],
    sampleQuestion: "Quels anticorps sont les plus spécifiques du lupus érythémateux systémique ?",
    sampleOptions: [
      "Anticorps anti-nucléaires (ANA)",
      "Anticorps anti-ADN natif (anti-dsDNA)",
      "Facteur rhumatoïde (FR)",
      "Anticorps anti-CCP",
    ],
    correctAnswer: 1,
    readiness: 73,
  },
  {
    id: "pneumo",
    name: "Pneumologie",
    icon: "🫁",
    tips: 35,
    qcms: 90,
    waiting: 76,
    doctor: "Dr. Filali",
    color: "from-sky-400 to-blue-500",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    activeRing: "ring-sky-400",
    guideTips: [
      "Savoir interpréter une radiographie thoracique face + profil",
      "Connaître les stades GOLD de la BPCO",
      "Maîtriser les critères d'exacerbation de l'asthme",
      "Interpréter les gaz du sang artériel en contexte d'urgence",
    ],
    sampleQuestion: "Quel est le critère principal pour diagnostiquer un trouble ventilatoire obstructif aux EFR ?",
    sampleOptions: [
      "CVF < 80%",
      "VEMS/CVF < 70%",
      "VEMS < 80%",
      "DEP < 50%",
    ],
    correctAnswer: 1,
    readiness: 66,
  },
  {
    id: "dermato",
    name: "Dermatologie",
    icon: "🔬",
    tips: 33,
    qcms: 85,
    waiting: 61,
    doctor: "Dr. Ouazzani",
    color: "from-yellow-400 to-amber-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    activeRing: "ring-yellow-400",
    guideTips: [
      "Décrire toute lésion dermatologique avec la sémiologie exacte",
      "Connaître les dermatoses les plus fréquentes au Maroc",
      "Savoir différencier les lésions élémentaires (macule, papule, vésicule…)",
      "Maîtriser les indications de la biopsie cutanée",
    ],
    sampleQuestion: "Quelle est la lésion élémentaire caractéristique du lichen plan ?",
    sampleOptions: [
      "Vésicule",
      "Papule violacée polygonale",
      "Pustule",
      "Nodule sous-cutané",
    ],
    correctAnswer: 1,
    readiness: 72,
  },
  {
    id: "orl",
    name: "ORL",
    icon: "👂",
    tips: 30,
    qcms: 80,
    waiting: 54,
    doctor: "Dr. Hassani",
    color: "from-teal-400 to-emerald-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    activeRing: "ring-teal-400",
    guideTips: [
      "Maîtriser l'examen otoscopique et l'acoumétrie (Weber + Rinne)",
      "Connaître les causes de surdité de transmission vs. perception",
      "Savoir reconnaître une otite moyenne aiguë chez l'enfant",
      "Maîtriser la prise en charge d'une épistaxis antérieure",
    ],
    sampleQuestion: "Dans l'épreuve de Weber, la latéralisation du son vers l'oreille malade évoque :",
    sampleOptions: [
      "Une surdité de perception",
      "Une surdité de transmission",
      "Une surdité mixte",
      "Un résultat normal",
    ],
    correctAnswer: 1,
    readiness: 69,
  },
  {
    id: "ophtalmo",
    name: "Ophtalmologie",
    icon: "👁️",
    tips: 28,
    qcms: 75,
    waiting: 47,
    doctor: "Dr. Cherkaoui",
    color: "from-cyan-400 to-sky-500",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    activeRing: "ring-cyan-400",
    guideTips: [
      "Maîtriser l'examen de l'acuité visuelle et le fond d'œil",
      "Reconnaître un glaucome aigu par fermeture de l'angle",
      "Connaître les critères de gravité d'un œil rouge douloureux",
      "Savoir différencier conjonctivite, kératite et uvéite",
    ],
    sampleQuestion: "Quel est le signe clinique cardinal du glaucome aigu par fermeture de l'angle ?",
    sampleOptions: [
      "Œil blanc et indolore",
      "Œil rouge, douloureux avec semi-mydriase aréactive",
      "Sécrétions purulentes abondantes",
      "Baisse progressive de l'acuité visuelle",
    ],
    correctAnswer: 1,
    readiness: 64,
  },
];

export default function InternshipHub() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [activeSpecialty, setActiveSpecialty] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [displayedSpecialty, setDisplayedSpecialty] = useState(0);

  const spec = SPECIALTIES[displayedSpecialty];

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleSpecialtyChange = useCallback((idx: number) => {
    if (idx === activeSpecialty) return;
    setTransitioning(true);
    setActiveSpecialty(idx);
    // After fade-out, swap content and fade-in
    setTimeout(() => {
      setDisplayedSpecialty(idx);
      setSelectedAnswer(null);
      setShowResult(false);
      setTransitioning(false);
    }, 250);
  }, [activeSpecialty]);

  const readinessScore = spec.readiness;

  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-surface-50 to-surface-0" />

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-brand-500/5 blur-3xl" />
        <div className="absolute -left-40 bottom-20 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="section-container relative">
        {/* Section header */}
        <div
          className={`text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-50 to-emerald-50 px-5 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-200/60">
            <span className="text-base">🏥</span>
            Nouveau — Stage Hub
          </span>
          <h2 className="mt-6 font-display text-display-lg text-surface-900">
            Transforme tes connaissances
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-brand-600 to-emerald-600 bg-clip-text text-transparent">
              en réflexes cliniques
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-surface-800/60 sm:text-lg">
            Pour chaque rotation, un guide de survie vérifié par un médecin
            spécialiste et des QCMs ciblés — pour arriver en stage prêt, pas largué.{" "}
            <span className="font-medium text-surface-800/80">
              Bientôt dans MedMaster.
            </span>
          </p>
        </div>

        {/* Specialty picker — scrollable row */}
        <div
          className={`mt-12 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
            <div className="flex gap-2.5 sm:flex-wrap sm:justify-center">
              {SPECIALTIES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => handleSpecialtyChange(i)}
                  className={`group/btn flex shrink-0 flex-col items-center gap-1 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    activeSpecialty === i
                      ? `bg-brand-600 text-white shadow-lg shadow-brand-600/25`
                      : "bg-white text-surface-800/70 ring-1 ring-surface-200 hover:bg-surface-50 hover:text-surface-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{s.icon}</span>
                    <span className="whitespace-nowrap">{s.name}</span>
                  </div>
                  <span className={`text-[10px] font-normal ${
                    activeSpecialty === i ? "text-brand-100" : "text-surface-800/35"
                  }`}>
                    {s.waiting} attendent
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview panels */}
        <div
          className={`mt-10 grid gap-6 lg:grid-cols-2 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${transitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}`}
          style={{ transitionDelay: transitioning ? "0ms" : "300ms", transition: "opacity 0.25s ease, transform 0.25s ease" }}
        >
          {/* Left — Guide de Stage */}
          <div className="group relative overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-lg shadow-surface-900/5">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-surface-100 px-6 py-4 bg-brand-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-emerald-500 text-white text-lg">
                📖
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-surface-900">
                  Guide de Stage
                </h3>
                <p className="text-xs text-surface-800/50">
                  {spec.tips} tips · Vérifié par {spec.doctor}
                </p>
              </div>
              <div className="ml-auto">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-200/50">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vérifié
                </span>
              </div>
            </div>

            {/* Tips list */}
            <div className="relative px-6 py-5">
              <ul className="space-y-3.5">
                {spec.guideTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-emerald-500 text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[14px] leading-relaxed text-surface-800/80">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>

              {/* "Et X autres" locked teaser */}
              <div className="relative mt-5">
                <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-white to-transparent" />
                <div className="flex items-center justify-between rounded-xl border border-dashed border-surface-200 bg-surface-50/80 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-surface-800/50">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    et {spec.tips - 4} autres conseils...
                  </div>
                  <span className="text-xs font-medium text-brand-600">
                    Bientôt disponible
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Test de Compétences */}
          <div className="group relative overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-lg shadow-surface-900/5">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-surface-100 px-6 py-4 bg-brand-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-emerald-500 text-white text-lg">
                🧪
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-surface-900">
                  Test de Compétences
                </h3>
                <p className="text-xs text-surface-800/50">
                  {spec.qcms} QCMs · {spec.name}
                </p>
              </div>
            </div>

            <div className="px-6 py-5">
              {/* Readiness score gauge */}
              <div className="mb-5 rounded-xl border border-surface-100 bg-surface-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-surface-800/50">
                      Score moyen avant le guide
                    </p>
                    <p className="mt-0.5 font-display text-2xl font-bold text-surface-900">
                      {readinessScore}
                      <span className="text-sm font-medium text-surface-800/40">
                        /100
                      </span>
                    </p>
                  </div>
                  <div className="relative h-14 w-14">
                    <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-surface-200"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={`${(readinessScore / 100) * 150.8} 150.8`}
                        strokeLinecap="round"
                        className="text-brand-500 transition-all duration-1000"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-brand-600">
                      {readinessScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Sample QCM question */}
              <div>
                <p className="mb-3 text-[13px] font-semibold text-surface-800/70">
                  Exemple de question :
                </p>
                <p className="mb-4 text-[14px] font-medium leading-relaxed text-surface-900">
                  {spec.sampleQuestion}
                </p>

                <div className="space-y-2">
                  {spec.sampleOptions.map((opt, i) => {
                    let optClasses =
                      "flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-[13px] leading-snug transition-all duration-200 cursor-pointer";

                    if (showResult) {
                      if (i === spec.correctAnswer) {
                        optClasses +=
                          " border-emerald-400 bg-emerald-50 text-emerald-800";
                      } else if (i === selectedAnswer) {
                        optClasses +=
                          " border-red-300 bg-red-50 text-red-700";
                      } else {
                        optClasses +=
                          " border-surface-100 bg-surface-50/50 text-surface-800/40";
                      }
                    } else {
                      optClasses +=
                        " border-surface-200 bg-white text-surface-800 hover:border-brand-300 hover:bg-brand-50/50";
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className={optClasses}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${
                            showResult && i === spec.correctAnswer
                              ? "bg-emerald-500 text-white"
                              : showResult && i === selectedAnswer
                                ? "bg-red-400 text-white"
                                : "bg-surface-100 text-surface-800/60"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                        {showResult && i === spec.correctAnswer && (
                          <svg
                            className="ml-auto h-4 w-4 shrink-0 text-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        {showResult &&
                          i === selectedAnswer &&
                          i !== spec.correctAnswer && (
                            <svg
                              className="ml-auto h-4 w-4 shrink-0 text-red-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                      </button>
                    );
                  })}
                </div>

                {/* Post-answer explanation */}
                {showResult && (
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <p className="text-[13px] font-medium text-emerald-800">
                        ✅ La bonne réponse est : {spec.sampleOptions[spec.correctAnswer]}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-emerald-700/70">
                        L'app complète te donnera l'explication détaillée et te
                        renverra vers la section correspondante du Guide de Stage.
                      </p>
                    </div>
                    {/* Second CTA — highest engagement moment */}
                    <a
                      href="#inscription"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      Débloquer les {spec.qcms} QCMs de {spec.name}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                    <button
                      onClick={resetQuiz}
                      className="mx-auto block text-[12px] font-semibold text-surface-800/40 hover:text-brand-600 transition-colors"
                    >
                      ↻ Réessayer une autre spécialité
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust badge + CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          style={{ transitionDelay: "450ms" }}
        >
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-sm text-surface-800/50">
              <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Guides vérifiés par des médecins
            </div>
            <div className="flex items-center gap-2 text-sm text-surface-800/50">
              <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
              </svg>
              11 spécialités couvertes
            </div>
            <div className="flex items-center gap-2 text-sm text-surface-800/50">
              <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              Accès prioritaire aux inscrits
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <a href="#inscription" className="btn-primary">
              Rejoindre la liste d'attente pour y accéder en premier
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
            <p className="mt-3 text-sm text-surface-800/40">
              Gratuit · Accès anticipé garanti
            </p>
          </div>
        </div>

        {/* Mini phone mockup — Stage Hub UI */}
        <div
          className={`mt-16 flex justify-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="relative mx-auto w-[240px] sm:w-[260px]">
            {/* Glow */}
            <div className="absolute -inset-8 rounded-[3rem] bg-brand-500/10 blur-2xl" />

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

                {/* Stage Hub Mini UI */}
                <div className="px-4 pb-6 pt-3">
                  {/* Header */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm">🏥</span>
                    <p className="text-xs font-bold text-white">Stage Hub</p>
                  </div>

                  {/* Specialty chips */}
                  <div className="mb-3 flex gap-1.5 overflow-hidden">
                    <div className="rounded-full bg-brand-500 px-2.5 py-1 text-[9px] font-semibold text-white">🫀 Cardio</div>
                    <div className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] text-white/50">🧠 Neuro</div>
                    <div className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] text-white/50">🔪 Chir.</div>
                  </div>

                  {/* Guide card */}
                  <div className="mb-2 rounded-xl border border-white/8 bg-white/5 p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">📖</span>
                      <p className="text-[10px] font-semibold text-white">Guide de Stage</p>
                      <span className="ml-auto rounded-full bg-brand-500/20 px-1.5 py-0.5 text-[8px] font-bold text-brand-400">47 tips</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="h-1.5 w-full rounded-full bg-white/10">
                        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
                      </div>
                    </div>
                  </div>

                  {/* Test card */}
                  <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">🧪</span>
                      <p className="text-[10px] font-semibold text-white">Test de Compétences</p>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="relative h-8 w-8">
                        <svg className="h-8 w-8 -rotate-90" viewBox="0 0 32 32">
                          <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/10" />
                          <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="54.3 75.4" strokeLinecap="round" className="text-brand-400" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-brand-400">72%</span>
                      </div>
                      <div>
                        <p className="text-[9px] font-medium text-white/40">Score</p>
                        <p className="text-[11px] font-bold text-white">72/100</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
