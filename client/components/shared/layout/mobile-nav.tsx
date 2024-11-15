"use client";

import { useState, useEffect, useRef, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Link from 'next/link';
import { UrlObject } from 'url';
import headerNavLinks from '../../../core/constants/headerNavLinks';

const MobileNav = () => {
  const [navShow, setNavShow] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status && navRef?.current) {
        enableBodyScroll(navRef?.current);
      } else {
        navRef?.current && disableBodyScroll(navRef?.current);
      }
      return !status;
    });
  };

  useEffect(() => {
    return clearAllBodyScrollLocks;
  }, []);

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="sm:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Overlay */}
      {navShow && (
        <div
          className="fixed inset-0 z-50 bg-black/25 transition-opacity duration-300"
          onClick={onToggleNav}
        />
      )}

      {/* Side Panel */}
      <div
        ref={navRef}
        className={`fixed top-0 left-0 z-60 h-full w-full transform bg-white transition-transform duration-300 ease-in-out dark:bg-gray-950 ${
          navShow ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <nav className="mt-8 flex flex-col h-full pl-12 pt-2 text-left overflow-y-auto">
          {headerNavLinks.map((link: { title: boolean | Key | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; href: string | UrlObject; }) => (
            <Link
              key={String(link.href) + link.title}
              href={link.href}
              className="mb-4 py-2 pr-4 text-2xl font-bold tracking-widest text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <button
          className="absolute right-4 top-7 z-70 h-8 w-8 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
          aria-label="Toggle Menu"
          onClick={onToggleNav}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default MobileNav;
