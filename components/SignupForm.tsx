"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useScrollReveal, useCountUp } from "@/lib/hooks";

const VILLES = [
  "Casablanca",
  "Rabat",
  "Fès",
  "Marrakech",
  "Oujda",
  "Agadir",
  "Tanger",
  "Autre",
];

const UNIVERSITES = [
  "FMPC",
  "UM6SS",
  "FMPR",
  "FMPM",
  "FMPT",
  "FMPDF",
  "FMPO",
  "FMPA",
  "FMPL",
  "UIC",
];

const ANNEES = [
  "1ère année",
  "2ème année",
  "3ème année",
  "4ème année",
  "5ème année",
  "Pas encore inscrit(e)",
];

const BESOINS = [
  "Une vraie app mobile (pas un site web)",
  "Filtrage précis par sujet, pas juste par chapitre",
  "Mode hors-ligne pour étudier sans connexion",
  "Des corrections plus fiables et détaillées",
  "Tout au même endroit au lieu de 3 sites différents",
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function SignupForm() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [signupCount, setSignupCount] = useState(0);
  const { count: animatedCount, startCounting } = useCountUp(signupCount);
  const counterStarted = useRef(false);

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    prenom: "",
    email: "",
    telephone: "",
    ville: "",
    universite: "",
    annee: "",
    besoin: "",
  });

  // Fetch signup count
  useEffect(() => {
    fetch("/api/count")
      .then((res) => res.json())
      .then((data) => setSignupCount(data.count))
      .catch(() => setSignupCount(0));
  }, []);

  // Start counter animation when visible
  useEffect(() => {
    if (isVisible && signupCount > 0 && !counterStarted.current) {
      counterStarted.current = true;
      startCounting();
    }
  }, [isVisible, signupCount, startCounting]);

  const updateField = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (formState === "error") {
        setFormState("idle");
        setErrorMsg("");
      }
    },
    [formState]
  );

  const handleSubmit = async () => {
    // Validate
    if (!formData.prenom.trim()) {
      setErrorMsg("Ton prénom est requis.");
      setFormState("error");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg("Adresse email invalide.");
      setFormState("error");
      return;
    }
    if (!formData.telephone.trim() || !/^(0[567]\d{8}|\+212[567]\d{8})$/.test(formData.telephone.replace(/\s/g, ''))) {
      setErrorMsg("Numéro de téléphone invalide (ex: 0612345678).");
      setFormState("error");
      return;
    }
    if (!formData.ville) {
      setErrorMsg("Sélectionne ta ville.");
      setFormState("error");
      return;
    }
    if (!formData.universite) {
      setErrorMsg("Sélectionne ta faculté.");
      setFormState("error");
      return;
    }
    if (!formData.annee) {
      setErrorMsg("Sélectionne ton année d'étude.");
      setFormState("error");
      return;
    }
    if (!formData.besoin) {
      setErrorMsg("Dis-nous ce qui te manque le plus.");
      setFormState("error");
      return;
    }

    setFormState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Une erreur est survenue.");
        setFormState("error");
        return;
      }

      setSignupCount(data.count);
      setFormState("success");
    } catch {
      setErrorMsg("Erreur de connexion. Réessaie.");
      setFormState("error");
    }
  };

  const shareUrl = "https://medmaster.ma";
  const shareText = `Je viens de m'inscrire sur la liste d'attente de MedMaster — la première vraie app mobile pour les QCM de médecine au Maroc ! Rejoins-nous : ${shareUrl}`;

  const handleWhatsAppShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  return (
    <section
      id="inscription"
      ref={ref}
      className="relative scroll-mt-8 py-20 sm:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-brand-50/40 to-surface-50" />

      <div className="section-container relative">
        {/* Counter */}
        <div
          className={`mb-10 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-brand-200 bg-white px-5 py-2.5 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-500" />
            </span>
            <span className="text-sm font-semibold text-surface-800">
              <span className="tabular-nums text-brand-600">
                {animatedCount > 0 ? animatedCount.toLocaleString("fr-FR") : "—"}
              </span>{" "}
              étudiants attendent MedMaster à Casablanca
            </span>
          </div>
        </div>

        <div
          className={`mx-auto max-w-xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="text-center">
            <h2 className="font-display text-display-lg text-surface-900">
              Sois parmi les premiers
            </h2>
            <p className="mt-3 text-base text-surface-800/60">
              Inscris-toi maintenant et on te préviendra dès que l'app sera
              prête. C'est gratuit, sans engagement.
            </p>
          </div>

          {formState === "success" ? (
            /* Success state */
            <div
              className="mt-10 rounded-2xl border border-brand-200 bg-white p-8 text-center shadow-lg shadow-brand-600/5 sm:p-10"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                <svg
                  className="success-check h-8 w-8 text-brand-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-surface-900">
                Tu es inscrit(e) !
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-surface-800/60">
                On te préviendra dès que MedMaster sera prêt à Casablanca.
                <br />
                Partage avec tes amis de promo pour qu'ils ne ratent rien.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={handleWhatsAppShare}
                  className="btn-primary !bg-[#25D366] !shadow-[#25D366]/25 hover:!bg-[#20BD5A]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Partager sur WhatsApp
                </button>
                <button onClick={handleCopyLink} className="btn-secondary">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copier le lien
                </button>
              </div>
            </div>
          ) : (
            /* Form */
            <div className="mt-10 rounded-2xl border border-surface-200 bg-white p-6 shadow-xl shadow-surface-900/5 sm:p-8">
              <div className="space-y-5">
                {/* Prénom */}
                <div>
                  <label
                    htmlFor="prenom"
                    className="mb-1.5 block text-sm font-medium text-surface-800"
                  >
                    Prénom
                  </label>
                  <input
                    id="prenom"
                    type="text"
                    placeholder="Ton prénom"
                    className="input-field"
                    value={formData.prenom}
                    onChange={(e) => updateField("prenom", e.target.value)}
                    disabled={formState === "submitting"}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-surface-800"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="ton.email@example.com"
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    disabled={formState === "submitting"}
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label
                    htmlFor="telephone"
                    className="mb-1.5 block text-sm font-medium text-surface-800"
                  >
                    Téléphone
                  </label>
                  <input
                    id="telephone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    className="input-field"
                    value={formData.telephone}
                    onChange={(e) => updateField("telephone", e.target.value)}
                    disabled={formState === "submitting"}
                  />
                </div>

                {/* Ville + Année row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="ville"
                      className="mb-1.5 block text-sm font-medium text-surface-800"
                    >
                      Ville
                    </label>
                    <select
                      id="ville"
                      className="input-field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat pr-10"
                      value={formData.ville}
                      onChange={(e) => updateField("ville", e.target.value)}
                      disabled={formState === "submitting"}
                    >
                      <option value="" disabled>
                        Ta ville
                      </option>
                      {VILLES.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="annee"
                      className="mb-1.5 block text-sm font-medium text-surface-800"
                    >
                      Année d'étude
                    </label>
                    <select
                      id="annee"
                      className="input-field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat pr-10"
                      value={formData.annee}
                      onChange={(e) => updateField("annee", e.target.value)}
                      disabled={formState === "submitting"}
                    >
                      <option value="" disabled>
                        Ton année
                      </option>
                      {ANNEES.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Université */}
                <div>
                  <label
                    htmlFor="universite"
                    className="mb-1.5 block text-sm font-medium text-surface-800"
                  >
                    Faculté / Université
                  </label>
                  <select
                    id="universite"
                    className="input-field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat pr-10"
                    value={formData.universite}
                    onChange={(e) => updateField("universite", e.target.value)}
                    disabled={formState === "submitting"}
                  >
                    <option value="" disabled>
                      Ta faculté
                    </option>
                    {UNIVERSITES.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Besoin - Radio cards */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-surface-800">
                    Qu'est-ce qui te manque le plus aujourd'hui ?
                  </label>
                  <div className="space-y-2.5">
                    {BESOINS.map((besoin, i) => (
                      <label key={i} className="radio-card flex items-center gap-3">
                        <input
                          type="radio"
                          name="besoin"
                          value={besoin}
                          checked={formData.besoin === besoin}
                          onChange={(e) => updateField("besoin", e.target.value)}
                          disabled={formState === "submitting"}
                        />
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            formData.besoin === besoin
                              ? "border-brand-500 bg-brand-500"
                              : "border-surface-200"
                          }`}
                        >
                          {formData.besoin === besoin && (
                            <svg
                              className="h-3 w-3 text-white"
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
                        </span>
                        <span className="text-[14px] leading-snug text-surface-800 sm:text-[15px]">
                          {besoin}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Error */}
                {errorMsg && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-700">{errorMsg}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={formState === "submitting"}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formState === "submitting" ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Inscription en cours...
                    </>
                  ) : (
                    "Rejoindre la liste d'attente"
                  )}
                </button>

                <p className="text-center text-xs text-surface-800/40">
                  On ne partage jamais ton email. Promis.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
