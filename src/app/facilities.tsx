"use client";

import HighlightedText from "@/components/HighlightedText";
import Image from "next/image";
import {useGuest} from "@/context/GuestContext";
import Link from "next/link";

const facilitiesItems = [
    {
        id: 1,
        icon: "/images/icon_ubication.svg",
        title: "Título 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquet tincidunt, nisl nisl tincidunt nisl, eget aliquet nisl nisl eget aliquet nisl.",
        url: "https://www.google.com",
        urlName: "Google"
    },
    {
        id: 2,
        icon: "/images/icon_ubication.svg",
        title: "Título 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquet tincidunt, nisl nisl tincidunt nisl, eget aliquet nisl nisl eget aliquet nisl.",
        url: "https://www.google.com",
        urlName: "Google"
    },
    {
        id: 3,
        icon: "/images/icon_ubication.svg",
        title: "Título 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget aliquet tincidunt, nisl nisl tincidunt nisl, eget aliquet nisl nisl eget aliquet nisl.",
        url: "https://www.google.com",
        urlName: "Google"
    }
]

export default function Facilities() {
    const {guest} = useGuest();
    return (
        <>
            <section id="facilities" className="body-font">
                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -top-4 lg:top-0 left-0 m-0 p-0 rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>
                <div className="px-4 mx-auto flex flex-col">
                    <HighlightedText className="text-3xl font-bold mb-6 text-center">Recomendaciones</HighlightedText>
                </div>
                {guest && (
                    <p className="text-center p-2 text-base">{guest.name} {guest.assignedTickets!>1 ? "les" : "te"} damos las siguientes recomendaciones:</p>
                )}
                <div
                    className="container px-4 mx-auto flex sm:flex-nowrap flex-wrap flex-col lg:flex-row justify-center items-center gap-4">
                    <div className="flex flex-wrap justify-evenly items-center">
                        {facilitiesItems.map((item) => (
                            <div key={item.id} className="w-full md:w-1/4">
                                <div className="flex rounded-lg h-full bg-slate-50 p-8 flex-col">
                                    <div className="flex items-center">
                                        <h2 className="text-gray-900 text-lg title-font font-medium">{item.title}</h2>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="leading-relaxed text-base">{item.description}</p>
                                        <Link href={item.url} target="_blank" className="text-blue-500 inline-flex items-center">{item.urlName}
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="w-4 h-4 ml-2"
                                                viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/*<div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute bottom-0 right-0 m-0 p-0 -rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>*/}
            </section>
        </>
    );
}