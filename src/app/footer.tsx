"use client";

import Link from "next/link";
import Image from "next/image";
import {useGuest} from "@/context/GuestContext";

const Footer = () => {
    const {guest} = useGuest();
    return (
        <>
            <div className="py-6 lg:py-3">
                <Image src="/images/std_footer.webp" alt="Foto footer" width={960} height={540} className="w-full max-h-[50%] object-contain" unoptimized={true}/>
            </div>
            <hr className="border-top border-gray-500 dark:border-gray-300"/>
            <footer className="body-font bg-white dark:bg-neutral-900">
                <div className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col justify-between">
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        <Link href={`/?guestId=${guest?.id}`} scroll={true}
                              className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                            <Image src="/images/logo_AA_light.svg" alt="Logo A&A" width={50} height={50} className="dark:invert" />
                        </Link>
                        <p className="text-sm text-gray-500">&copy; 2025 Andrea y Alexis</p>
                    </div>
                    <div className="flex flex-col justify-center items-center py-1">
                        <p className="w-full text-sm text-gray-500 text-center md:text-right">Desarrollado por Alexis Ruiz - <Link href="https://github.com/alexrsipn" className="not-italic" rel="noopener noreferrer" target="_blank">@alexrsipn</Link></p>
                        <p className="w-full text-sm text-gray-500 text-center md:text-right">Contenido por Andrea Lugo - <Link href="https://www.instagram.com/andylugoh.happytrip" className="not-italic" rel="noopener noreferrer" target="_blank">@andylugoh.happytrip</Link></p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;