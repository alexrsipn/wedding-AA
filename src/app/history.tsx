"use client";

/*import {motion, useScroll, useTransform, useInView} from "framer-motion";*/
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

/*interface HistoryCardProps {
    item: HistoryItem,
    progress: ReturnType<typeof useScroll>['scrollYProgress'],
    range: [number, number, number, number]
}*/

/*const HistoryCard: FC<HistoryCardProps> = ({item, progress, range}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, {once: true, margin: "-40% 0px -40% 0px"});
    const opacity = useTransform(progress, range, [0, 1, 1, 0]);
    const scale = useTransform(progress, range, [0.8, 1, 1, 0.8]);
    const y = useTransform(progress, range, [100, 0, 0, -100]);
    useAudioOnScroll({progress, range, audioUrl: item.audioUrl});
    return (
        <motion.div ref={cardRef} style={{opacity, scale}} className="absolute flex h-full w-full flex-col items-center justify-center text-center">
            <div className="mx-auto">
                <motion.div style={{y}}>
                    <h2 className="text-lg font-medium title-font text-neutral-800 dark:text-white mb-1">{item.subtitle}</h2>
                    {/!*<h1 className="sm:text-4xl text-3xl font-bold title-font text-gray-900 dark:text-white mb-3">{item.title}</h1>*!/}
                    <Typewriter text={item.title} finalBar={true} className="text-4xl lg:text-3xl font-bold title-font text-gray-900 dark:text-white mb-3" startAnimation={isInView}/>
                    <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 lg:gap-2 p-4 border border-gray-200 rounded-lg shadow-xl">
                        <Image src={item.imageUrl} alt={item.title} width={800} height={600} className="w-2/5 h-full object-cover object-center order-1 lg:order-2"/>
                        <div className="w-full px-6 lg:px-2 order-2 lg:order-1 max-h-11/12">
                            <p className="text-justify leading-relaxed">{item.descriptionAndy}</p>
                        </div>
                        <div className="w-full px-6 lg:px-2 order-3">
                            <p className="text-justify leading-relaxed ">{item.descriptionAlexis}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}*/

/*<div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
    <div className="relative flex h-full w-full items-center justify-center">
        {historyItems.map((item, index) => {
            const start = index / totalItems;
            const end = (index + 1) / totalItems;
            const transitionPoint = 0.1;
            const range: [number, number, number, number] = [
                start,
                start + (end-start) * transitionPoint,
                end - (end-start) * transitionPoint,
                end
            ]
            return (
                <></>
                /!*<HistoryCard key={item.id} item={item} progress={scrollYProgress} range={range}/>*!/
            )
        })}
    </div>
</div>*/

export default function History() {
    const {guest} = useGuest();
    const {isMuted, toggleMute} = useAudio();
    const containerRef = useRef<HTMLDivElement>(null);
/*    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });
    const totalItems = historyItems.length;
    const scrollableHeight = totalItems * 100;*/
    const horizontalWrapperRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState(0);
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
        /*const cards = gsap.utils.toArray<HTMLDivElement>('.history-card')
        const images = gsap.utils.toArray<HTMLImageElement>('.history-image');
        const texts = gsap.utils.toArray<HTMLDivElement>('.history-text');*/
        const horizontalSections = gsap.utils.toArray<HTMLDivElement>('.history-card');

        gsap.to(horizontalSections, {
            x: () => -(horizontalWrapperRef.current!.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => "+=" + (horizontalWrapperRef.current!.scrollWidth - window.innerWidth),
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const newActiveCard = Math.floor(progress * horizontalSections.length);
                    if (newActiveCard !== activeCard) {
                        setActiveCard(newActiveCard);
                    }
                }
            }
        });

        horizontalSections.forEach((section, index) => {
            const image = section.querySelector('.history-image');
            const text = section.querySelector('.history-text');

            gsap.from(image, {
                scale: 1.3,
                scrollTrigger: {
                    trigger: section,
                    /*containerAnimation: ScrollTrigger.get(horizontalWrapperRef.current),*/
                    start: "left right",
                    end: "left left",
                    scrub: true,
                }
            });

            gsap.from(text, {
                y: 100,
                autoAlpha: 0,
                scrollTrigger: {
                    trigger: section,
                    /*containerAnimation: ScrollTrigger.get(horizontalWrapperRef.current)*/
                    start: "left center",
                    end: "left left",
                    scrub: true
                }
            });
        });

        /*gsap.set(cards, { autoAlpha: 0, y: 50, scale: 0.9 });*/

/*        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 0.5,
                start: "top top",
                end: "+=4000"
            }
        });*/

        /*cards.forEach((card, index) => {
            const image = images[index];
            const text = texts[index];

            tl.to(card, {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, `card${index}`)
                .to(image, {
                    scale: 1.15,
                    ease: "none"
                }, `card${index}`)
                .from(text, {
                    autoAlpha: 0,
                    y: 30,
                    duration: 0.8,
                }, `card${index}+=0.5`);

            if (index < cards.length - 1) {
                tl.to(card, {
                    autoAlpha: 0,
                    y: -50,
                    duration: 1,
                    ease: "power2.in"
                }, `card${index}+=2`);
            }
        });*/
    }, { scope: containerRef });

    return (
        <>
            <section id="history" className="body-font">
                <div className="container mx-auto p-4">
                    <div className="flex flex-col items-center justify-center text-center w-full">
                        {/*<h3 className="text-3xl lg:text-2xl text-center font-medium title-font mb-4 text-gray-900 dark:text-white">Nuestra historia</h3>*/}
                        <HighlightedText className="text-3xl lg:text-2xl text-center font-medium title-font mb-4 text-gray-900 dark:text-white">Nuestra historia</HighlightedText>
                        <Image src="/images/flowers_growing.gif" alt="Flores creciendo" className="py-4" unoptimized width={100} height={100}/>
                        {guest && (
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"><b>{guest.name}</b> nos gustaría que {guest.assignedTickets!>1 ? "conozcan" : "conozcas"} nuestra historia, otra hermosa historia de amor que solamente Dios pudo haber diseñado.</p>
                        )}
                        {/*<span>Te recomendamos activar el audio para una mejor experiencia.</span>*/}
                        <div className="py-4">
                            <button onClick={toggleMute} aria-label={isMuted ? "Activar sonido" : "Silenciar"} className="bg-sky-700 hover:bg-sky-800 dark:bg-sky-800 dark:hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-colors">
                                {isMuted ? (
                                    <span>Activar música</span>
                                ) : (
                                    <span>Silenciar</span>
                                )}
                            </button>
                        </div>
                    </div>
                    <div ref={containerRef} className="relative h-screen w-full overflow-hidden border border-red-500">
                        <div ref={horizontalWrapperRef} className="flex h-full" style={{width: `${historyItems.length * 100}vw`}}>
                        {historyItems.map((item, index) => (
                            <div key={item.id} className="history-card w-full h-full flex items-center justify-center relative p-8">
                                <div className="absolute inset-0 overflow-hidden">
                                    <Image src={item.imageUrl} alt={item.title} fill className="history-image object-cover"/>
                                </div>
                                <div className="history-text relative max-w-3xl w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 md:p-10 rouded-xl shadow-2xl text-center">
                                    <h2 className="text-lg font-medium title-font text-neutral-800 dark:text-white mb-1">{item.subtitle}</h2>
                                    <Typewriter text={item.title} finalBar={false} className="text-4xl lg:text-3xl font-bold title-font text-gray-900 dark:text-white mb-4" startAnimation={activeCard === index} />
                                    <div className="flex flex-col md:flex-row gap-4 text-justify text-sm md:text-base">
                                        <p className="leading-relaxed">{item.descriptionAndy}</p>
                                        <p className="leading-relaxed">{item.descriptionAlexis}</p>
                                    </div>
                                </div>
                                {/*<div className="mx-auto max-w-5xl w-full">
                                    <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 lg:gap-8 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-lg shadow-2xl">
                                        <div className="w-full lg:w-2/5 h-96 rounded-lg overflow-hidden">
                                            <Image src={item.imageUrl} alt={item.title} width={800} height={600} className="history-image w-full h-full object-cover scale-100"/>
                                        </div>
                                        <div className="history-text w-full lg:w-3/5 px-2 lg:px-4">
                                            <h2 className="text-lg font-medium title-font text-neutral-800 dark:text-white mb-1">{item.subtitle}</h2>
                                            <Typewriter text={item.title} finalBar={true} className="text-4xl lg:text-3xl font-bold title-font text-gray-900 dark:text-white mb-3" startAnimation={true} />
                                            <div className="flex flex-col md:flex-row gap-4 text-justify">
                                                <p className="leading-relaxed">{item.descriptionAndy}</p>
                                                <p className="leading-relaxed">{item.descriptionAlexis}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>*/}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
