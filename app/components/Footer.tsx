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
            <p className="mt-4 text-sm text-zinc-600">
              Have a question? Email us at{' '}
              <a href="mailto:hello@magematch.com" style={{ color: '#F97316' }}>
                hello@magematch.com
              </a>
            </p>
            <div className="mt-4">
              <Link
                href="/"
                className="inline-flex rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Join the waitlist
              </Link>
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

