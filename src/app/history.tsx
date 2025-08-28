"use client";

import {motion, useScroll, useTransform} from "framer-motion";
import {useRef} from "react";
import type {FC} from "react";
import Image from "next/image";
import {useAudioOnScroll} from "@/hooks/useAudioOnScroll";
import Typewriter from "@/components/Typewriter";
import {useAudio} from "@/context/AudioContext";

type HistoryItem = {
    id: number;
    subtitle: string;
    title: string;
    descriptionAndy: string;
    descriptionAlexis: string;
    imageUrl: string;
    audioUrl?: string;
}

const historyItems: HistoryItem[] = [
    {
        id: 1,
        subtitle: "2014-2019",
        title: "It's nice to have a friend",
        descriptionAndy: "Nos conocimos en el patio de Amistad Cristiana y compartimos muchos años siendo verdaderamente amigos. Nos contabamos todo, servimos juntos, nos felicitábamos en días festivos y hasta hicimos un viaje a Queretaro para un congreso de jóvenes. Nosotros muy cristianos.",
        descriptionAlexis: "Ese día me dijo que se iría a Chile y algo dentro de mí no quería que se fuera, porque realmente me agradaba estar con Andy.",
        imageUrl: "/images/history_1.jpg",
        audioUrl: "/audio/track_1.mp3"
    },
    {
        id: 2,
        subtitle: "09 de julio de 2019",
        title: "La salida en la que hablamos sobre nuestro futuro",
        descriptionAndy: "Salimos por un helado de la Escandón y a pasear por parque Lira.",
        descriptionAlexis: "Ese día me dijo que se iría a Chile y algo dentro de mí no quería que se fuera, porque realmente me agradaba estar con Andy.",
        imageUrl: "/images/hero.jpg",
        audioUrl: "/audio/track_2.mp3"
    },
    {
        id: 3,
        subtitle: "Tercer momento",
        title: "Título de tercer momento",
        descriptionAndy: "Descripción bonita",
        descriptionAlexis: "Ese día me dijo que se iría a Chile y algo dentro de mí no quería que se fuera, porque realmente me agradaba estar con Andy.",
        imageUrl: "/images/hero.jpg",
        audioUrl: "/audio/track_3.mp3"
    },
    {
        id: 4,
        subtitle: "Cuarto momento",
        title: "Título de cuarto momento",
        descriptionAndy: "Descripción bonita",
        descriptionAlexis: "Ese día me dijo que se iría a Chile y algo dentro de mí no quería que se fuera, porque realmente me agradaba estar con Andy.",
        imageUrl: "/images/hero.jpg",
        audioUrl: "/audio/track_4.mp3"
    },
    {
        id: 5,
        subtitle: "Quinto momento",
        title: "Título de quinto momento",
        descriptionAndy: "Descripción bonita",
        descriptionAlexis: "Ese día me dijo que se iría a Chile y algo dentro de mí no quería que se fuera, porque realmente me agradaba estar con Andy.",
        imageUrl: "/images/hero.jpg",
        audioUrl: "/audio/track_5.mp3"

    },
    {
        id: 6,
        subtitle: "Sexto momento",
        title: "Título de sexto momento",
        descriptionAndy: "Descripción bonita",
        descriptionAlexis: "Ese día me dijo que se iría a Chile y algo dentro de mí no quería que se fuera, porque realmente me agradaba estar con Andy.",
        imageUrl: "/images/hero.jpg",
        audioUrl: "/audio/track_6.mp3"
    },
    {
        id: 7,
        subtitle: "Séptimo momento",
        title: "Título de séptimo momento",
        descriptionAndy: "Descripción bonita",
        descriptionAlexis: "Ese día me dijo que se iría a Chile y algo dentro de mí no quería que se fuera, porque realmente me agradaba estar con Andy.",
        imageUrl: "/images/hero.jpg",
        audioUrl: "/audio/track_7.mp3"
    },
];

interface HistoryCardProps {
    item: HistoryItem,
    progress: ReturnType<typeof useScroll>['scrollYProgress'],
    range: [number, number, number, number]
}

const HistoryCard: FC<HistoryCardProps> = ({item, progress, range}) => {
    const opacity = useTransform(progress, range, [0, 1, 1, 0]);
    const scale = useTransform(progress, range, [0.8, 1, 1, 0.8]);
    const y = useTransform(progress, range, [100, 0, 0, -100]);
    useAudioOnScroll({progress, range, audioUrl: item.audioUrl});
    return (
        <motion.div style={{opacity, scale}} className="absolute flex h-full w-full flex-col items-center justify-center text-center">
            <div className="max-w-4xl mx-auto">
                <motion.div style={{y}}>
                    <h2 className="text-lg font-medium title-font text-coyote dark:text-isabelline mb-1">{item.subtitle}</h2>
                    {/*<h1 className="sm:text-4xl text-3xl font-bold title-font text-gray-900 dark:text-white mb-3">{item.title}</h1>*/}
                    <Typewriter text={item.title} finalBar={true} className="sm:text-4xl text-3xl font-bold title-font text-gray-900 dark:text-white mb-3"/>
                    <div className="flex flex-col lg:flex-row justify-center items-baseline w-full gap-4 lg:gap-8">
                        <p className="w-full px-6 lg:px-2 lg:w-1/2 text-justify leading-relaxed mb-6 text-rose-800">Ella: {item.descriptionAndy}</p>
                        <p className="w-full px-6 lg:px-2 lg:w-1/2 text-justify leading-relaxed mb-6 text-blue-800">El: {item.descriptionAlexis}</p>
                    </div>
                    <div className="w-full max-w-2xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-200">
                        <Image src={item.imageUrl} alt={item.title} width={800} height={600} className="w-full h-full object-cover object-center"/>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function History() {
    const {isMuted, toggleMute} = useAudio();
    const containerRef = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });
    const totalItems = historyItems.length;
    const scrollableHeight = totalItems * 100;
    return (
        <>
            <section id="history" className="text-gray-600 body-font dark:text-gray-300">
                <div className="container mx-auto py-4">
                    <div className="flex flex-col items-center justify-center text-center w-full">
                        <h3 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white">Nuestra historia</h3>
                        <Image src="/images/flowers_growing.gif" alt="Flores creciendo" className="py-4" unoptimized width={100} height={100}/>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Nos gustaría que conozcas nuestra historia, otra hermosa historia de amor que solamente Dios pudo haber planeado.</p>
                        <p>Ella es color X</p>
                        <p>El es color X</p>
                        {/*<span>Te recomendamos activar el audio para una mejor experiencia.</span>*/}
                        <div className="py-4">
                            <button onClick={toggleMute} aria-label={isMuted ? "Activar sonido" : "Silenciar"} className="py-2 px-4 rounded-full bg-gray-600 text-gray-50 font-medium  cursor-pointer transition-colors hover:bg-gray-700 dark:text-gray-300 dark:hover::bg-gray-800 dark:hover:text-white">
                                {isMuted ? (
                                    <span>Activar sonidos</span>
                                ) : (
                                    <span>Silenciar</span>
                                )}
                            </button>
                        </div>
                    </div>
                    <div ref={containerRef} className="relative" style={{height: `${scrollableHeight/2}vh`}}>
                        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
                            <div className="relative flex h-full w-full items-center justify-center">
                                {historyItems.map((item, index) => {
                                    const start = index / totalItems;
                                    const end = (index + 1) / totalItems;
                                    /*const range: [number, number, number, number] = [start, start + 0.08, end - 0.08, end];*/
                                    const transitionPoint = 0.1;
                                    const range: [number, number, number, number] = [
                                        start,
                                        start + (end-start) * transitionPoint,
                                        end - (end-start) * transitionPoint,
                                        end
                                    ]
                                    return (
                                        <HistoryCard key={item.id} item={item} progress={scrollYProgress} range={range}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
