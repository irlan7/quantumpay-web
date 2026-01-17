'use client';

import LanguageSwitcher from '../LanguageSwitcher';

export default function Navbar() {
  return (
    <nav style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
      <LanguageSwitcher />
    </nav>
  );
}
