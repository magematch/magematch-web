import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <img
                src="/magematch-logo.svg"
                alt="MageMatch"
                className="h-10 w-auto sm:h-11"
              />
            </Link>
            <p className="mt-4 text-sm leading-6 text-zinc-600">
              A curated marketplace for Adobe Commerce / Magento development.
              High signal. Vetted specialists. Fast starts.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">Marketplace</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/developers"
                  className="text-zinc-600 hover:text-zinc-900"
                >
                  Browse developers
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-zinc-600 hover:text-zinc-900"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-zinc-600 hover:text-zinc-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-600 hover:text-zinc-900">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">For merchants</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="text-zinc-600">Magento 2 & Adobe Commerce</li>
              <li className="text-zinc-600">Hyvä & headless builds</li>
              <li className="text-zinc-600">Performance & audits</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">Get in touch</p>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <p>
                <Link href="/contact" className="font-medium text-orange-600 hover:text-orange-700">
                  Contact page →
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16v12H4z" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                <a href="mailto:hello@magematch.com" className="font-medium text-orange-600 hover:text-orange-700">
                  hello@magematch.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Sofia, Bulgaria · EU Timezone
              </p>
              <p className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                Response within 2 hours
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-200 pt-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© MageMatch. All rights reserved.</p>
          <p className="text-zinc-500">
            Built for Adobe Commerce / Magento teams worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}

