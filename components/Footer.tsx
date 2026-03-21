export default function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-surface-50">
      <div className="section-container py-10">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          {/* Logo / brand */}
          <div>
            <p className="font-display text-lg font-bold text-surface-900">
              Med<span className="text-brand-600">Master</span>
            </p>
            <p className="mt-1 text-sm text-surface-800/50">
              Un produit{" "}
              <a
                href="https://mindontech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-surface-800/70 underline decoration-surface-200 underline-offset-2 transition-colors hover:text-brand-600 hover:decoration-brand-300"
              >
                MindOn Tech
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:contact@medmaster.ma"
              className="text-sm text-surface-800/50 transition-colors hover:text-brand-600"
            >
              Contact
            </a>
            <a
              href="https://instagram.com/medmaster.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-surface-800/50 transition-colors hover:text-brand-600"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-surface-200 pt-6 text-center">
          <p className="text-xs text-surface-800/35">
            © {new Date().getFullYear()} MedMaster. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
