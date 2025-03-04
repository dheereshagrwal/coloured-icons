"use client";

import { useState, useContext, useEffect } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { MenuList } from ".";
import { SearchContext } from "@/context/SearchContextProvider";
import Link from "next/link";
import { Pacifico } from "next/font/google";
import { usePathname } from "next/navigation";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

interface NavbarProps {
  hideSearch?: boolean;
}

const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [pendingFocus, setPendingFocus] = useState(false);
  const { triggerFocus } = useContext(SearchContext);

  useEffect(() => {
    if (pendingFocus && pathname === "/") {
      handleSearchClick();
      setPendingFocus(false);
    }
  }, [pathname, pendingFocus]);

  const handleSearchClick = () => {
    const searchSection = document.getElementById("search-section");
    if (searchSection) {
      const offset = 50;
      const elementPosition = searchSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      triggerFocus();
    }
  };

  return (
    <>
      <nav className="my-6" aria-label="Global">
        <div className="flex items-center justify-between gap-8">
          <div className="flex lg:flex-1">
            <Link
              className={`${pacifico.className} text-2xl lg:text-3xl hover:text-gray-600 transition-colors`}
              href="/"
            >
              Coloured Icons
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            <MenuList
              className="flex items-center gap-8 font-semibold text-gray-600"
              activePathname={pathname}
            />
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  handleSearchClick();
                } else {
                  setPendingFocus(true);
                }
              }}
            >
              <CiSearch className="text-gray-700 text-xl" />
            </Link>

            <button
              type="button"
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <RxHamburgerMenu className="text-xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed z-50">
          <div className="fixed" onClick={() => setIsMenuOpen(false)} />

          {/* Menu panel */}
          <div className="fixed h-full inset-y-0 right-0 w-full overflow-y-auto bg-white px-8 mx-auto my-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link
                className={`${pacifico.className} text-2xl`}
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Coloured Icons
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <RxCross2 className="text-xl" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <MenuList
                  className="flex flex-col space-y-2 mt-6 text-base font-semibold text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
