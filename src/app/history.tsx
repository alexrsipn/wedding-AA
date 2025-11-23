"use client";

import {useRef, useState, useEffect} from "react";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import {useAudio} from "@/context/AudioContext";
import {useGuest} from "@/context/GuestContext";
import HighlightedText from "@/components/HighlightedText";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type HistoryItem = {
    id: number;
    subtitle?: string;
    title: string;
    descriptionAndy?: string;
    descriptionAlexis?: string;
    imageUrl: string;
    audioUrl?: string;
}

const historyItems: HistoryItem[] = [
    {
        id: 1,
        subtitle: "2014 - 2019",
        title: "It's nice to have a friend",
        descriptionAndy: "Nos conocimos en el patio de amistad cristiana y desde el primer momento sentimos una conexión especial. Compartimos bastantes momentos de alegría, comenzamos a contarnos nuestras historias de vida y a ser muy buenos amigos. Visitamos algunos parques, fuimos a algunas bodas y éramos nuestro gran apoyo ante las dificultades de la vida, la difícil vida de dos adolescentes - jóvenes",
        imageUrl: "/images/std_history_1.webp",
        audioUrl: "/audio/track_1.ogg"
    },
    {
        id: 2,
        subtitle: "2021 - 2022",
        title: "All along there was some invisible string",
        descriptionAndy: "Como todas las relaciones personales, hubieron momentos de separación pero durante la pandemia volvimos a reconectar. No importo el pasar de los años, la familiaridad entre nosotros seguía intacta. Estábamos viviendo nuevas etapas y el apoyo seguía existiendo, de hecho, por primera vez sentimos algo mutuamente pero jamás nos lo dijimos y eventualmente, volvimos a separarnos…",
        imageUrl: "/images/std_history_2.webp",
        audioUrl: "/audio/track_2.ogg"
    },
    {
        id: 3,
        subtitle: "2025 - till the end",
        title: "I only see daylight",
        descriptionAndy: "El 31 de diciembre un mensaje cambió todo, llevábamos 2 años sin comunicación y juntarnos nuevamente se sintió como si no hubiera pasado el tiempo, platicamos de todo lo vivido en dicho tiempo, errores, aciertos, aventuras y demás. Algo cambió ese día, aquello que alguna vez sentimos seguía intacto, se sentía como volver a casa. Solo una salida bastó para saber que jamás nos volveríamos a separar…",
        imageUrl: "/images/std_history_3.webp",
        audioUrl: "/audio/track_3.ogg"
    },
/*    {
        id: 4,
        title: "El inicio de nuestra historia",
        imageUrl: "/images/std_history_4.webp",
        audioUrl: "/audio/track_1.ogg"
    },*/
];

export default function History() {
    const {guest} = useGuest();
    const {isMuted, toggleMute} = useAudio();
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState(-1);
    const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

    useEffect(() => {
        audioRefs.current = historyItems.map(item => item.audioUrl ? new Audio(item.audioUrl) : null);
        return () => {
            audioRefs.current.forEach(audio => audio?.pause());
        };
    }, []);

    useEffect(() => {
        audioRefs.current.forEach((audio, index) => {
            if (!audio) return;
            audio.loop = true;
            if (index === activeCard && !isMuted) {
                audio.play().catch(e => console.error("Audio play error: ", e));
            } else {
                audio.pause();
            }
        });
    }, [activeCard, isMuted]);

    useGSAP(() => {
        const sections = gsap.utils.toArray<HTMLDivElement>('.history-item');

        sections.forEach((section, index) => {
            const imageEl = section.querySelector('.history-image') as HTMLImageElement;
            const textBox = section.querySelector('.history-text') as HTMLDivElement;

            gsap.set(imageEl, { scale: 0.8, transformOrigin: "bottom center" });
            gsap.set(textBox, { autoAlpha: 0 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 50%",
                    scrub: true,
                    end: "bottom 50%",
                    onEnter: () => setActiveCard(index),
                    onEnterBack: () => setActiveCard(index),
                    onLeave: () => setActiveCard(-1),
                    onLeaveBack: () => setActiveCard(-1)
                }
            });

            const imageTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 50%",
                    scrub: true
                }
            });
            imageTl.to(imageEl, {scale: 1, autoAlpha: 1, ease: "power2.out"})
                .to(imageEl, {autoAlpha: 0, ease: "power2.in"});

            const textTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 30%",
                    end: "bottom 60%",
                    scrub: true
                }
            });
            textTl.to(textBox, {autoAlpha: 1, y: 0, ease: "power2.out"})
                .to(textBox, {autoAlpha: 0, y: 0, ease: "power2.in"});
        });
    }, { scope: containerRef });

    return (
        <>
            <section id="history" className="body-font">
                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -top-2 lg:top-0 left-0 m-0 p-0 rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>
                <div className="mx-auto" ref={containerRef}>
                    <HighlightedText className="text-3xl font-bold mb-6 text-center">
                        Nuestra historia
                    </HighlightedText>
                    <div className="flex flex-col items-center justify-center p-2">
                        {guest && (
                            <p className="text-justify p-2 text-base leading-relaxed landscape:px-12"><b>{guest.name}</b> nos gustaría que {guest.assignedTickets!>1 ? "conozcan" : "conozcas"} nuestra historia, otra hermosa historia de amor que solamente Dios pudo haber diseñado.</p>
                        )}
{/*                        <div className="w-full lg:max-w-1/5 py-2">
                            <button onClick={toggleMute} aria-label={isMuted ? "Activar sonido" : "Silenciar"} className="bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-colors w-full">
                                {isMuted ? (
                                    <span>Activar música</span>
                                ) : (
                                    <span>Silenciar</span>
                                )}
                            </button>
                        </div>*/}
                    </div>
                    <div className="flex flex-col">
                        {historyItems.map((item, idx) => (
                            <div
                                key={item.id}
                                className="history-item relative min-h-[100vh]"
                            >
                                <div className="sticky top-20 z-0 w-full h-[65vh] md:h-[75vh] bg-white/0">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        priority={idx === 0}
                                        sizes="100vw"
                                        className="history-image object-cover rounded-sm"
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                                {item.subtitle && (
                                    <div className="w-full flex justify-center items-center p-4">
                                        <div className="history-text max-w-3xl mt-0 py-4 bg-gray-50 dark:bg-slate-800 backdrop-blur-xl rounded-lg shadow-xl p-6">
                                            <h2 className="text-sm text-right font-medium leading-relaxed">{item.subtitle}</h2>
                                            <h4 className="text-lg md:text-xl text-center font-semibold italic">{item.title}</h4>
                                            {/*<Typewriter text={item.title} finalBar={true} className="text-lg md:text-xl text-center font-semibold italic" startAnimation={true}></Typewriter>*/}
                                            <div className="flex flex-col gap-3 text-justify text-sm md:text-base">
                                                <p className="py-2">{item.descriptionAndy}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="h-[60vh]" />
                            </div>
                        ))}
                    </div>
                </div>
{/*                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute bottom-0 lg:-bottom-12 right-0 m-0 p-0 -rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>*/}
            </section>
        </>
    )
}
