"use client";
import {useState, useEffect} from "react";
import Image from "next/image";
import {useGuest} from "@/context/GuestContext";

export default function Welcome() {
    const [isOpen, setIsOpen] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    const {guest, isLoading, error} = useGuest();
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 500)
    };
    return isOpen ? (
        <>
            <section className={`w-screen h-screen z-50 absolute top-0 left-0 bg-black/50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-500 ${isClosing ? "opacity-0" : "opacity-100"}`}>
                <div className={`bg-white rounded-xl shadow-xl text-center flex flex-col gap-2 h-4/5 w-full lg:w-1/2 mx-4 -mt-20 lg:mt-0 transition-all duration-500 ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>
                    <div className="relative lg:min-w-xl h-full">
                        <Image className="absolute -top-24 lg:-top-31 left-4 w-11/12 lg:w-3/5 lg:left-1/5" src="/images/envelope.png" alt="Sobre de invitación" width={500} height={325}/>
                        <div className="overflow-hidden h-full">
                            <div className="text-white text-center relative w-full h-full">
                                <Image className="absolute top-16 lg:top-38 left-0 w-full h-full px-6 transform scale-200 lg:scale-125" src="/images/arc.svg" alt="Arco" width={1000} height={100}/>
                                <Image className="absolute bottom-0 left-8/12" src="/images/logo_arc.svg" alt="Logo arco" width={80} height={80}/>
                            </div>
                            <div className="absolute top-32 lg:top-48 w-full transition-all duration-500">
                                <div className="relative w-4/6 lg:w-2/5 mx-auto px-2 bg-white shadow-xl rounded">
                                    <p className="font-semibold py-2 lg:py-4 text-xl text-center font-serif">Andrea & Alexis</p>
                                    <p className="font-light py-1 lg:py-2">Tenemos el honor de invitarte a la celebración de nuestro matrimonio</p>
                                    <div className="flex flex-col font-serif italic font-medium py-2 text-left px-2 lg:py-2">
                                        {isLoading ? (
                                            <span className="text-center font-semibold">Cargando invitación...</span>
                                        ) : error ? (
                                            <span className="text-center font-medium">Invitación no encontrada</span>
                                        ) : guest ? (
                                            <>
                                                <p className="text-center italic"><b>{guest.name}</b></p>
                                                <p className="text-center">Pases asignados: <b>{guest.assignedTickets}</b></p>
                                                {guest.guestListDetails && (
                                                    <details className="group mt-2">
                                                        <summary className="flex justify-around items-center font-medium cursor-pointer list-none text-sm text-gray-500 hover:text-gray-700">
                                                            <span>Invitados: </span>
                                                            <span className="transition-transform duration-300 group-open:rotate-180">
                                                                <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                                                            </span>
                                                        </summary>
                                                        <div className="text-gray-500 text-xs whitespace-pre-wrap bg-gray-50 p-2 text-center rounded max-h-16 lg:max-h-24 overflow-y-auto">
                                                            {guest.guestDetails?.map((detail, index) => (
                                                                <p key={index}>{detail}</p>
                                                            ))}
                                                        </div>
                                                    </details>
                                                )}
                                            </>
                                        ) : (
                                            <span>Bienvenido/a</span>
                                        )}
                                    </div>
                                    <div className="flex justify-around items-center py-2 lg:py-4">
                                        <span className="font-serif font-normal">SÁBADO</span>
                                        <div className="flex flex-col justify-center items-center text-lg font-serif font-medium border-x border-black px-1.5">
                                            <span>28</span>
                                            <span>MARZO</span>
                                            <span>2026</span>
                                        </div>
                                        <span className="font-serif font-normal">3:30 PM</span>
                                    </div>
                                    <div className="pb-1">
                                        <button className="bg-paynesgray cursor-pointer text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed" onClick={handleClose} disabled={!guest}>Más información</button>
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