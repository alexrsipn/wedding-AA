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
    },
    {
        id: 4,
        subtitle: "2024",
        title: "Título 3",
        descriptionAndy: "Era 31 de diciembre, cumpleaños de Alexis, llevábamos mas de 2 años sin hablar. Algo en mi me dijo que le escribiera para felicitar y, por consecuencia, reconectar nuevamente, parecía que habíamos vivido situaciones similares y probablemente nos podríamos entender. Y no les voy a mentir, una parte de mi si quería saber si había posibilidad de algo mas. Ahora se que fue Dios quien me guió, pues en el minuto 1 que nos volvimos a ver la conexión estaba intacta, la misma desde que teníamos solo 17. Alexis es mi hogar.",
        descriptionAlexis: "Ese día me dijo que se iría a Chile y algo dentro de mí no quería que se fuera, porque realmente me agradaba estar con Andy.",
        imageUrl: "/images/hero.jpg",
        audioUrl: "/audio/track_3.ogg"
    },
    {
        id: 5,
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
    const horizontalWrapperRef = useRef<HTMLDivElement>(null);
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
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const horizontalSections = gsap.utils.toArray<HTMLDivElement>('.history-card');

            const horizontalScrollTween = gsap.to(horizontalWrapperRef.current, {
                x: () => -(horizontalWrapperRef.current!.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    snap: {
                        snapTo: 1 / (horizontalSections.length - 1),
                        duration: 0.3
                    },
                    end: () => "+=" + (horizontalWrapperRef.current!.scrollWidth - window.innerWidth),
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (self.isActive) {
                            const progress = self.progress;
                            const newActiveCard = Math.min(
                                horizontalSections.length - 1,
                                Math.floor(progress * horizontalSections.length)
                            );
                            if (newActiveCard !== activeCard) {
                                setActiveCard(newActiveCard);
                            }
                        }
                    },
                    /*onLeave: () => setActiveCard(-1),
                    onLeaveBack: () => setActiveCard(-1),*/
                    onToggle: (self) => {
                        if (!self.isActive) setActiveCard(-1);
                    }
                },
            });

            horizontalSections.forEach((section) => {
                const image = section.querySelector('.history-image');
                const text = section.querySelector('.history-text');

                gsap.from(image, {
                    scale: 1.3,
                    scrollTrigger: {
                        trigger: section,
                        containerAnimation: horizontalScrollTween,
                        start: "left right",
                        end: "left left",
                        scrub: true,
                    },
                });

                gsap.from(text, {
                    y: 100,
                    autoAlpha: 0,
                    scrollTrigger: {
                        trigger: section,
                        containerAnimation: horizontalScrollTween,
                        start: "left center",
                        end: "left left",
                        scrub: true,
                    },
                });
            });

            return () => {
                gsap.killTweensOf(horizontalWrapperRef.current);
            };
        });

        mm.add("(max-width: 1023x)", () => {
            const verticalSections = gsap.utils.toArray<HTMLDivElement>('.history-card');

            verticalSections.forEach((section) => {
                const image = section.querySelector('.history-image');
                const text = section.querySelector('.history-text');

                gsap.from(image, {
                    y: 50,
                    autoAlpha: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                });

                gsap.from(text, {
                    y: 30,
                    autoAlpha: 0,
                    duration: 0.8,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <>
            <section id="history" className="body-font">
                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -top-2 lg:top-0 left-0 m-0 p-0 rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>
                <div className="container mx-auto p-4">
                    <div className="flex flex-col items-center justify-center text-center w-full">
                        {/*<h3 className="text-3xl lg:text-2xl text-center font-medium title-font mb-4 text-gray-900 dark:text-white">Nuestra historia</h3>*/}
                        <HighlightedText className="text-3xl lg:text-2xl text-center font-medium title-font mb-4 text-gray-900 dark:text-white">Nuestra historia</HighlightedText>
                        <Image src="/images/flowers_growing.gif" alt="Flores creciendo" className="py-4" unoptimized width={100} height={100}/>
                        {guest && (
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"><b>{guest.name}</b> nos gustaría que {guest.assignedTickets!>1 ? "conozcan" : "conozcas"} nuestra historia, otra hermosa historia de amor que solamente Dios pudo haber diseñado.</p>
                        )}
                        <div className="py-4">
                            <button onClick={toggleMute} aria-label={isMuted ? "Activar sonido" : "Silenciar"} className="bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-colors">
                                {isMuted ? (
                                    <span>Activar música</span>
                                ) : (
                                    <span>Silenciar</span>
                                )}
                            </button>
                        </div>
                    </div>
                    <div ref={containerRef} className="relative lg:h-screen w-full lg:overflow-hidden">
                        <div ref={horizontalWrapperRef} className="lg:flex lg:h-full" style={{width: `calc(100vw * ${historyItems.length}`}}>
                        {historyItems.map((item, index) => (
                            <div key={item.id} className="history-card w-full lg:w-screen h-auto lg:h-full flex items-center justify-center relative p-4 md:p-12 mb-16 lg:mb-0">
                                <div className="absolute inset-0 overflow-hidden">
                                    <Image src={item.imageUrl} alt={item.title} fill className="history-image object-cover lg:p-16 w-full h-auto"/>
                                </div>
                                <div className="history-text relative max-w-3xl w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg p-6 md:p-10 rounded-xl shadow-2xl text-center">
                                    <h2 className="text-lg font-medium title-font text-neutral-800 dark:text-white mb-1">{item.subtitle}</h2>
                                    <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{item.title}</h4>
                                    {/*<Typewriter text={item.title} finalBar={false} className="text-4xl lg:text-3xl font-bold title-font text-gray-900 dark:text-white mb-4" startAnimation={activeCard === index} />*/}
                                    <div className="flex flex-col md:flex-row gap-4 text-justify text-sm md:text-base">
                                        <p className="leading-relaxed">{item.descriptionAndy}</p>
                                        <p className="leading-relaxed">{item.descriptionAlexis}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -bottom-0 lg:-bottom-12 right-0 m-0 p-0 -rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>
            </section>
        </>
    )
}
