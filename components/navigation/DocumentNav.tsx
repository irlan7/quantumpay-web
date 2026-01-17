'use client';

import Link from 'next/link';

type NavItem = {
  label: string;
  href: string;
};

type DocumentNavProps = {
  prev?: NavItem;
  next?: NavItem;
};

export default function DocumentNav({ prev, next }: DocumentNavProps) {
  return (
    <nav className="mt-20 border-t border-zinc-800 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-sm">
      
      {prev ? (
        <Link
          href={prev.href}
          className="text-zinc-400 hover:text-white transition"
        >
          ← {prev.label}
        </Link>
      ) : <span />}

      <div className="flex gap-6">
        <a
          href="#top"
          className="text-zinc-500 hover:text-white transition"
        >
          Back to top ↑
        </a>

        {next && (
          <Link
            href={next.href}
            className="text-zinc-400 hover:text-white transition"
          >
            {next.label} →
          </Link>
        )}
      </div>
    </nav>
  );
}
