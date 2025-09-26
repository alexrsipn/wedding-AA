"use client";

import Image from "next/image";
import {useState, useEffect, useRef, MouseEvent} from "react";
import Link from 'next/link';
import {useAudio} from "@/context/AudioContext";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useLenis} from "@/context/LenisContext";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Nuestra historia', href: '#history' },
    { name: 'Detalles', href: '#details' },
    { name: 'Asistencia', href: '#rvsp' },
    { name: 'Recomendaciones', href: '#facilities' },
    { name: 'Galería', href: '#gallery' }
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const {isMuted, toggleMute} = useAudio();
    const lenis = useLenis();

    useGSAP(() => {
        gsap.to(headerRef.current, {
            padding: '0.5rem 0',
            /*backgroundColor: 'rgba(255, 255, 255, 0.8)',*/
            backdropFilter: 'blur(4px)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            scrollTrigger: {
                trigger: 'body',
                start: 'top -10px',
                end: 'top -50px',
                scrub: true
            }
        });

        gsap.to('.header-logo', {
            width: 50,
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'top -50px',
                scrub: 0.5
            }
        });
    }, {scope: headerRef});

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleNavCLic = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        closeMenu();
        if (lenis && headerRef.current) {
            lenis.scrollTo(target, {offset: -headerRef.current.offsetHeight})
        }
    }
    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-40 p-4 bg-white dark:bg-neutral-900"
        >
            <div className="container mx-auto flex items-center justify-between px-2">
                {/*<Link href="#home" className={`flex-shrink-0 transition-all duration-300 ${isScrolled ? 'p-2' : 'p-4'}`} onClick={closeMenu}>*/}
                <Image
                    src="/images/logo_AA_light.svg"
                    alt="Logo_boda_Andrea_y_Alexis"
                    width={80}
                    height={80}
                    priority
                    className="header-logo dark:invert"
                />
                {/*</Link>*/}
                <nav className="hidden md:flex md:items-center md:justify-center md:gap-x-6 lg:gap-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavCLic(e, link.href)}
                            className="text-lg font-medium text-gray-600 transition-all duration-300 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:underline underline-offset-4 p-2 rounded-md"
                        >
                            {link.name}
                        </Link>
                    ))}
{/*                    <button onClick={toggleMute} aria-label={isMuted ? "Activar sonido" : "Silenciar"} className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover::bg-gray-800 dark:hover:text-white cursor-pointer">
                        {isMuted ? (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                        ) : (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                        )}
                    </button>*/}
                </nav>
                <div className="flex items-center md:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label="Abrir menú"
                        aria-expanded={isMenuOpen}
                        className="inline-flex items-center justify-center rounded-md px-6 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                className={`transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 -translate-y-[0.14rem] translate-x-[0.56rem]' : ''}`}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16"
                            />
                            <path
                                className={`transition-transform duration-300 ease-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 12h16"
                            />
                            <path
                                className={`transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 translate-y-1.5 -translate-x-1/3' : ''}`}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`transform transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <nav className="flex flex-col space-y-1 px-4 pb-4 pt-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavCLic(e, link.href)}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                            {link.name}
                        </Link>
                    ))}
{/*                    <button onClick={() => {toggleMute(); closeMenu();}} className="flex items-center gap-x-3 rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
                        {isMuted ? (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                        ) : (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                        )}
                        <span>{isMuted ? "Activar sonido" : "Silenciar"}</span>
                    </button>*/}
                </nav>
            </div>
        </header>
    );
}