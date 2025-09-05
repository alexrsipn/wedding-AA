"use client";
import {useState, useEffect} from "react";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import HighlightedText from "@/components/HighlightedText";

interface timeLeft {
    dias?: number;
    horas?: number;
    minutos?: number;
    segundos?: number;
}

export default function Hero() {
    const calculateTimeLeft = () => {
        const difference = +new Date("2026-03-28T15:00:00") - +new Date();
        let timeLeft: timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((difference / 1000 / 60) % 60),
                segundos: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <>
            <section id="home" className="text-gray-600 dark:text-white body-font">
                <div className="container mx-auto flex px-5 py-8 items-center justify-center flex-col lg:flex-row gap-4">
                    <Image className="lg:w-1/2 md:w-3/6 w-full mb-4 object-cover object-center rounded" alt="hero"
                         src="/images/hero.jpg" width={700} height={600}/>
                    <div className="text-center lg:w-2/3 w-full">
                        <div className="lg:mb-4 mb-2">
                            <Typewriter text="¡Nos casamos!" finalBar={false} className="text-4xl lg:text-3xl font-medium text-gray-900 dark:text-gray-100 mb-4"/>
                            {/*<HighlightedText className="text-center text-4xl lg:text-3xl font-medium text-gray-900 dark:text-gray-100 mb-4">¡ N o s  c a s a m o s !</HighlightedText>*/}
                            <p className="font-light italic text-center">&quot;Y a Aquel que es poderoso para hacer todas las cosas mucho más abundantemente de lo que pedimos o entendemos, según el poder que actúa en nosotros, a él sea gloria en la iglesia en Cristo Jesús por todas las edades, por los siglos de los siglos. Amén.&quot;</p>
                            <span className="font-normal block mt-2">Efesios 3:20-21</span>
                        </div>
                        <div className="lg:mb-4 mb-2">
                            <h4 className="text-2xl lg:text-xl font-medium text-gray-900">Nuestros padres</h4>
                            <div className="flex justify-evenly items-center">
                                <div className="text-right">
                                    <p>Martín Salvador Lugo Aquino</p>
                                    <p>Ana María Rivero Ramírez</p>
                                </div>
                                <div className="text-left">
                                    <p>Juan Carlos Ruiz de la Cruz</p>
                                    <p>Noemí Santiago Santiago</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:mb-4 mb-2">
                            <h2 className="title-font sm:text-2xl text-xl font-medium text-gray-900">Faltan: </h2>
                            {/*<span>Contador en reversa</span>*/}
                            {Object.keys(timeLeft).length > 0 ? (
                                <div className="flex justify-center items-baseline text-gray-900 mt-4 space-x-2 md:space-x-4">
                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl lg:text-4xl font-semibold">{timeLeft.dias}</span>
                                        <span className="text-xs uppercase tracking-widest">Días</span>
                                    </div>
                                    <span className="text-2xl lg:text-4xl font-bold">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl lg:text-4xl font-semibold">{String(timeLeft.horas).padStart(2, '0')}</span>
                                        <span className="text-xs uppercase tracking-widest">Horas</span>
                                    </div>
                                    <span className="text-4xl lg:text-5xl font-bold">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl lg:text-4xl font-semibold">{String(timeLeft.minutos).padStart(2, '0')}</span>
                                        <span className="text-xs uppercase tracking-widest">Minutos</span>
                                    </div>
{/*                                    <span className="text-4xl lg:text-5xl font-bold">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-4xl lg:text-5xl font-bold">{String(timeLeft.segundos).padStart(2, '0')}</span>
                                        <span className="text-xs uppercase tracking-widest">Segundos</span>
                                    </div>*/}
                                </div>
                            ) : (
                                <p className="text-2xl mt-4 font-semibold text-gray-900">¡El gran día ha llegado!</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}