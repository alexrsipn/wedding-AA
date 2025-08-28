"use client";
import {useState, useEffect} from "react";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";

interface timeLeft {
    dias?: number;
    horas?: number;
    minutos?: number;
    segundos?: number;
}

export default function Hero() {
    const calculateTimeLeft = () => {
        const difference = +new Date("2026-03-07T15:00:00") - +new Date();
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
            <section className="text-gray-600 dark:text-white body-font">
                <div className="container mx-auto flex px-5 py-8 items-center justify-center flex-col lg:flex-row">
                    <Image className="lg:w-1/2 md:w-3/6 w-full mb-4 object-cover object-center rounded" alt="hero"
                         src="/images/hero.jpg" width={700} height={600}/>
                    <div className="text-center lg:w-2/3 w-full">
                        <div className="lg:mb-4 mb-2">
                            {/*<h1 className="title-font sm:text-4xl text-3xl font-medium text-gray-900">¡Nos casamos!</h1>*/}
                            <Typewriter text="¡Nos casamos!" finalBar={false} className="title-font sm:text-4xl text-3xl font-medium text-gray-900 dark:text-gray-100 mb-4"/>
                            <p className="leading-relaxed">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                        </div>
                        <div className="lg:mb-4 mb-2">
                            <h4 className="title-font sm:text-2xl text-xl font-medium text-gray-900">Nuestros padres</h4>
                            <div className="flex justify-evenly items-center">
                                <div className="text-right">
                                    <p>Salvador Lugo</p>
                                    <p>Ana María Rivero</p>
                                </div>
                                <div className="text-left">
                                    <p>Juan Carlos Ruiz</p>
                                    <p>Noemí Santiago</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:mb-4 mb-2">
                            <h2 className="title-font sm:text-2xl text-xl font-medium text-gray-900">Faltan: </h2>
                            {/*<span>Contador en reversa</span>*/}
                            {Object.keys(timeLeft).length > 0 ? (
                                <div className="flex justify-center items-baseline text-gray-900 mt-4 space-x-2 md:space-x-4">
                                    <div className="flex flex-col items-center">
                                        <span className="text-4xl lg:text-5xl font-bold">{timeLeft.dias}</span>
                                        <span className="text-xs uppercase tracking-widest">Días</span>
                                    </div>
                                    <span className="text-4xl lg:text-5xl font-bold">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-4xl lg:text-5xl font-bold">{String(timeLeft.horas).padStart(2, '0')}</span>
                                        <span className="text-xs uppercase tracking-widest">Horas</span>
                                    </div>
                                    <span className="text-4xl lg:text-5xl font-bold">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-4xl lg:text-5xl font-bold">{String(timeLeft.minutos).padStart(2, '0')}</span>
                                        <span className="text-xs uppercase tracking-widest">Minutos</span>
                                    </div>
{/*                                    <span className="text-4xl lg:text-5xl font-bold">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-4xl lg:text-5xl font-bold">{String(timeLeft.segundos).padStart(2, '0')}</span>
                                        <span className="text-xs uppercase tracking-widest">Segundos</span>
                                    </div>*/}
                                </div>
                            ) : (
                                <p className="text-2xl mt-4 font-semibold text-paynesgray">¡El gran día ha llegado!</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}