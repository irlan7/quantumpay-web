import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelector";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            QuantumPay
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="hover:underline">
              {t("nav.home")}
            </Link>
            <Link href="/about" className="hover:underline">
              {t("nav.about")}
            </Link>
            <Link href="/features" className="hover:underline">
              {t("nav.features")}
            </Link>
            <Link href="/contact" className="hover:underline">
              {t("nav.contact")}
            </Link>
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Language Dropdown */}
          <LanguageSelector />

          {/* CTA Button */}
          <Link
            href="/login"
            className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {t("nav.login")}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
