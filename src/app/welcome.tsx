"use client";
import {useState, useEffect} from "react";
import Image from "next/image";
import {useGuest} from "@/context/GuestContext";
import {useLenis} from "@/context/LenisContext";
import {QRCodeSVG} from "qrcode.react";

export default function Welcome() {
    const [isOpen, setIsOpen] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    const {guest, isLoading, error} = useGuest();
    const lenis = useLenis();

    useEffect(() => {
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = "manual";
        }
        window.scrollTo(0,0);

        if (isOpen && lenis) {
            /*document.body.style.overflow = "hidden";*/
            lenis.stop();
        } else {
            /*document.body.style.overflow = "auto";*/
            lenis?.start();
        }
        return () => {
            /*document.body.style.overflow = "auto";*/
            lenis?.start();
        };
    }, [isOpen, lenis]);
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 500)
    };
    return isOpen ? (
        <>
            <section className={`w-screen h-screen z-50 absolute top-0 left-0 bg-black/50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-500 ${isClosing ? "opacity-0" : "opacity-100"}`}>
                <div className={`bg-gray-50 dark:bg-slate-800 rounded-xl shadow-xl text-center flex flex-col gap-2 h-4/5 w-full lg:w-1/2 mx-4 -mt-20 lg:mt-0 transition-all duration-500 ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>
                    <div className="relative lg:min-w-xl h-full">
                        <Image className="absolute -top-24 lg:-top-31 left-4 w-11/12 lg:w-3/5 lg:left-1/5" src="/images/envelope.png" alt="Sobre de invitación" width={500} height={325}/>
                        <div className="overflow-hidden h-full">
                            <div className="relative w-full h-full">
                                <Image className="absolute top-16 lg:top-38 left-0 w-full h-full px-6 transform scale-200 lg:scale-125" src="/images/arc.svg" alt="Arco" width={1000} height={100}/>
                                <Image className="absolute bottom-0 left-8/12" src="/images/logo_arc.svg" alt="Logo arco" width={80} height={80}/>
                            </div>
                            <div className="absolute top-32 lg:top-48 w-full transition-all duration-500">
                                <div className="relative w-4/6 lg:w-2/5 mx-auto px-2 bg-white dark:bg-white/80 shadow-xl rounded">
                                    <p className="font-semibold py-2 text-xl text-center font-serif text-black">Andrea & Alexis</p>
                                    <div className="flex flex-col font-serif italic font-medium text-left px-2 text-gray-900">
                                        {isLoading ? (
                                            <span className="text-center font-medium font-sans">Cargando invitación...</span>
                                        ) : error ? (
                                            <span className="text-center font-medium">Invitación no encontrada</span>
                                        ) : guest ? (
                                            <>
                                                {guest.guestListDetails && !guest.confirmed ? (
                                                    <>
                                                        <p className="font-light text-gray-900 dark:text-gray-800 font-sans text-justify text-sm pb-2">Tenemos el honor de invitarte a la celebración de nuestro matrimonio.</p>
                                                        <p className="text-center italic"><b>{guest.name}</b></p>
                                                        <p className="text-center font-normal font-sans">Pases asignados: <b>{guest.assignedTickets}</b></p>
                                                        <details className="group mt-2" open>
                                                            <summary className="flex justify-around items-center font-medium font-sans cursor-pointer list-none text-sm text-gray-500 hover:text-gray-700">
                                                                <span>Invitados: </span>
                                                                <span className="transition-transform duration-300 group-open:rotate-180">
                                                                <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                                                            </span>
                                                            </summary>
                                                            <div className="text-slate-800 text-xs whitespace-pre-wrap bg-gray-50 text-center rounded max-h-24 lg:max-h-24">
                                                                {guest.guestDetails?.map((detail, index) => (
                                                                    <p key={index} className="font-sans">{detail}</p>
                                                                ))}
                                                            </div>
                                                        </details>
                                                    </>
                                                ) : guest.confirmed && (
                                                    <div className="font-sans not-italic text-justify text-sm">
                                                        <p className="font-normal text-center"><b>{guest.name}</b> gracias por confirmar <b>{guest.confirmedTickets}</b> boletos, te esperamos en nuestra boda.</p>
                                                        <div className="flex justify-center items-center my-2">
                                                            <QRCodeSVG value={guest.id} size={96} />
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <span>Bienvenido/a</span>
                                        )}
                                    </div>
                                    <div className="flex justify-around items-center py-2 lg:py-4 text-gray-900">
                                        <span className="font-serif font-normal">SÁBADO</span>
                                        <div className="flex flex-col justify-center items-center text-lg font-serif font-medium border-x border-black px-1.5">
                                            <span>28</span>
                                            <span>MARZO</span>
                                            <span>2026</span>
                                        </div>
                                        <span className="font-serif font-normal">3:30 PM</span>
                                    </div>
                                    <div className="py-1 ">
                                        <button
                                            className="w-full bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-all duration-500 disabled:bg-gray-400 disabled:hover:bg-gray-500 disabled:cursor-not-allowed disabled:animate-none animate-pulse flex items-center justify-center gap-2"
                                            onClick={handleClose}
                                            disabled={!guest}
                                        >
                                            Continuar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    ) : null;
}