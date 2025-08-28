"use client";
import {useState, useEffect} from "react";
import Image from "next/image";

export default function Welcome() {
    const [isOpen, setIsOpen] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
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
                <div className={`bg-white rounded-xl shadow-xl text-center flex flex-col gap-4 h-4/5 w-full lg:w-1/2 mx-4 transition-all duration-500 ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}>
                    <div className="relative lg:min-w-xl h-full">
                        <Image className="absolute -top-21 lg:-top-27 left-4 w-11/12 lg:w-3/5 lg:left-1/5" src="/images/envelope.svg" alt="Sobre de invitación" width={500} height={325}/>
                        <div className="overflow-hidden h-full">
                            <div className="text-white text-center relative w-full h-full">
                                <Image className="absolute top-20 lg:top-48 left-0 w-full h-full px-6 transform scale-200 lg:scale-125" src="/images/arc.svg" alt="Arco" width={1000} height={100}/>
                                <Image className="absolute bottom-0 left-8/12" src="/images/logo_arc.svg" alt="Logo arco" width={80} height={80}/>
                            </div>
                            <div className="absolute top-1/4 lg:top-1/3 w-full transition-all duration-500">
                                <div className="relative w-4/6 lg:w-2/5 mx-auto p-2 bg-white shadow-xl rounded">
                                    <p className="font-semibold py-2 text-xl text-center font-serif">Andrea & Alexis</p>
                                    <p>Tenemos el honor de invitarlos a la celebración de nuestra unión en matrimonio</p>
                                    <div className="flex flex-col font-serif italic font-medium py-4">
                                        <span>Nombre de invitado</span>
                                        <span>Cantidad de boletos</span>
                                    </div>
                                    <div className="flex justify-around items-center py-4">
                                        <span className="font-serif font-normal">SÁBADO</span>
                                        <div className="flex flex-col justify-center items-center text-lg font-serif font-medium border-x border-black px-1.5">
                                            <span>MARZO</span>
                                            <span>07</span>
                                            <span>2026</span>
                                        </div>
                                        <span className="font-serif font-normal">3:00 PM</span>
                                    </div>
                                    {/*<p className="hidden lg:block lg:pb-4">Toda la información de nuestra boda la puedes encontrar en nuestra página web</p>*/}
                                    <button className="bg-paynesgray cursor-pointer text-white font-semibold px-4 py-2 rounded-md font-mono" onClick={handleClose}>Más información</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    ) : null;
}