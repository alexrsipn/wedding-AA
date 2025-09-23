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
        subtitle: "2014 - 2019",
        title: "Título 1",
        descriptionAndy: "Nos conocimos en el patio de amistad y desde el primer momento me pareció una persona diferente, inteligente y con un corazón bello. Compartimos bastantes momentos de alegría, éramos muy jovenes. Pese a las circunstancias nuestra amistad no dejo de ser, aunque nos frecuentábamos menos, seguimos unidos. \nEn 2019 salimos, como solíamos hacerlo cada año, fue la primera vez que sentí que queria ser yo la persona con la cual compartiera su vida.",
        descriptionAlexis: "Ese día me dijo que se iría a Chile y algo dentro de mí no quería que se fuera, porque realmente me agradaba estar con Andy.",
        imageUrl: "/images/history_1.jpg",
        audioUrl: "/audio/track_1.ogg"
    },
    {
        id: 2,
        subtitle: "2021 - 2022",
        title: "Título 2",
        descriptionAndy: "Durante la pandemia, cuando ya estaba un poco mejor todo, volvimos a reconectar. No importo el pasar de los años porque en el minuto 1 se sintió la familiaridad de siempre. Alexis siempre había sido (y sigue) mi persona favorita, con quien podia ser yo misma y quien me aplaudía cualquier cosa que hacía. En aquella ocasión volví a sentir el querer SER su persona, sin embargo, volvimos a separarnos…",
        descriptionAlexis: "Ese día me dijo que se iría a Chile y algo dentro de mí no quería que se fuera, porque realmente me agradaba estar con Andy.",
        imageUrl: "/images/hero.jpg",
        audioUrl: "/audio/track_2.ogg"
    },
    {
        id: 3,
        subtitle: "2024",
        title: "Título 3",
        descriptionAndy: "Era 31 de diciembre, cumpleaños de Alexis, llevábamos mas de 2 años sin hablar. Algo en mi me dijo que le escribiera para felicitar y, por consecuencia, reconectar nuevamente, parecía que habíamos vivido situaciones similares y probablemente nos podríamos entender. Y no les voy a mentir, una parte de mi si quería saber si había posibilidad de algo mas. Ahora se que fue Dios quien me guió, pues en el minuto 1 que nos volvimos a ver la conexión estaba intacta, la misma desde que teníamos solo 17. Alexis es mi hogar.",
        descriptionAlexis: "Ese día me dijo que se iría a Chile y algo dentro de mí no quería que se fuera, porque realmente me agradaba estar con Andy.",
        imageUrl: "/images/hero.jpg",
        audioUrl: "/audio/track_3.ogg"
    }
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
            const imageWrap = section.querySelector('.history-image-wrap') as HTMLDivElement;
            const imageEl = section.querySelector('.history-image') as HTMLImageElement;
            const textBox = section.querySelector('.history-text') as HTMLDivElement;

            gsap.set(imageEl, {
                scale: 0.8,
                transformOrigin: "bottom center",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 40%",
                    scrub: true,
                    end: "bottom 60%",
                    /*snap: {
                        snapTo: 1 / sections.length,
                        inertia: false,
                        ease: "sine.in",
                        /!*duration: 0.8,*!/
                        onComplete: () => setActiveCard(index),
                    },*/
                    /*markers: true,*/
                    onEnter: () => setActiveCard(index),
                    onEnterBack: () => setActiveCard(index),
/*                    onUpdate: (self) => {
                        if (self.isActive) {
                            const progress = self.progress;
                            const newActiveCard = Math.min(
                                sections.length - 1,
                                Math.floor(progress * sections.length)
                            );
                            if (newActiveCard !== activeCard) {
                                setActiveCard(newActiveCard);
                            }
                        }
                    },*/
                    onToggle: (self) => {
                        if (!self.isActive) setActiveCard(-1);
                    },
                    onLeave: () => setActiveCard(-1),
                    onLeaveBack: () => setActiveCard(-1)
                }
            });

            tl.to(imageEl, {
                scale: 1,
                ease: "power3.inOut",
            }, 0);

            gsap.fromTo(textBox,
                {
                    autoAlpha: 0,
                    opacity: 0
                },
                {
                    autoAlpha: 1,
                    ease: "power3.out",
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 70%",
                        scrub: true,
                        /*markers: true,*/
                        /*snap: {
                            snapTo: 1 / sections.length,
                            ease: "sine.in",
                            inertia: false,
                            /!*duration: 0.8*!/
                        }*/
                    }
                }
                );
        });
    }, { scope: containerRef });

    return (
        <>
            <section id="history" className="body-font">
                <div className="mx-auto" ref={containerRef}>
                    <HighlightedText className="text-3xl font-bold mb-6 text-center">
                        Nuestra historia
                    </HighlightedText>
                    <div className="flex flex-col">
                        {historyItems.map((item, idx) => (
                            <div
                                key={item.id}
                                className="history-item relative min-h-[100vh]"
                            >
                                <div className="history-image-wrap sticky top-20 z-0 w-full h-[65vh] md:h-[75vh] bg-white/0">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        priority={idx === 0}
                                        sizes="100vw"
                                        className="history-image object-cover"
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>

                                {/* Texto centrado durante el tramo medio */}
                                <div className="w-full flex justify-center items-center">
                                    <div className="history-text max-w-3xl -mt-16 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-lg shadow-xl p-6">
                                        <h2 className="text-base md:text-lg font-medium mb-1">{item.subtitle}</h2>
                                        <h4 className="text-lg md:text-xl font-semibold mb-4">{item.title}</h4>
                                        <div className="flex flex-col gap-3 text-justify text-sm md:text-base">
                                            <p>{item.descriptionAndy}</p>
                                            <p>{item.descriptionAlexis}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Espacio inferior para que al seguir el scroll se revele la siguiente imagen */}
                                <div className="h-[60vh]" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
