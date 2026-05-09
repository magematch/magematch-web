import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const runtime = "edge";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex flex-1 items-center bg-linear-to-b from-zinc-50 to-white">
        <section className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 ring-1 ring-orange-200">
            404
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            The page you’re looking for doesn’t exist or may have moved.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Go home
            </Link>
            <Link
              href="/developers"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 transition hover:bg-white"
            >
              Browse developers
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}