"use client";

import HighlightedText from "@/components/HighlightedText";
import Image from "next/image";
import {useGuest} from "@/context/GuestContext";
import Link from "next/link";

const facilitiesItems = [
    {
        id: 1,
        icon: "/images/icon_ubication.svg",
        title: "Hotel de Cuautla",
        description: "Batalla 19 de Febrero de 1812 No. 114, Centro, 62740 Cuautla, Mor.",
        url: "https://www.hoteldecuautla.com.mx",
        urlName: "Ver página del hotel"
    },
    {
        id: 2,
        icon: "/images/icon_ubication.svg",
        title: "Quinta Loriffe",
        discount: "10%",
        description: "Cuernavaca-Cuautla 788, Cuautlixco, 62749 Cuautla, Mor.",
        url: "http://www.quintaloriffehotel.com",
        urlName: "Ver página del hotel"
    },
    {
        id: 3,
        icon: "/images/icon_ubication.svg",
        title: "Hotel Hacienda Cocoyoc",
        description: "Carretera Federal, Cuernavaca-Cuautla Km 32.5, Centro Cocoyoc, 62736 Cocoyoc, Mor.",
        url: "https://hcocoyoc.com",
        urlName: "Ver página del hotel"
    },
    {
        id: 4,
        icon: "/images/icon_ubication.svg",
        title: "Plataformas digitales de hospedaje",
        description: "Te recomendamos buscar hospedaje en plataformas como Airbnb en las zonas de Cuautla, Cocoyoc o Oaxtepec.",
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
                    <p className="text-center p-2 text-base leading-relaxed">{guest.name} en caso de buscar hospedaje para el evento, te podemos recomendar las siguientes opciones:</p>
                )}
                <div
                    /*className="container p-4 mx-auto flex sm:flex-nowrap flex-wrap flex-col lg:flex-row justify-center items-center">*/
                    className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/*<div className="flex flex-wrap justify-evenly items-center gap-2">*/}
                        {facilitiesItems.map((item) => (
                            <div key={item.id}>
                                <div className="flex rounded-lg h-full bg-slate-50 p-8 flex-col text-gray-900">
                                    <div className="flex items-center">
                                        <h2 className="text-lg title-font font-medium">{item.title}</h2>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="leading-relaxed text-base">{item.description}</p>
                                        {item.discount && <p className="text-xs">Pregunta por el descuento de {item.discount} por convenio.</p>}
                                        {item.url && (
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
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    {/*</div>*/}
                </div>
                {/*<div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute bottom-0 right-0 m-0 p-0 -rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>*/}
            </section>
        </>
    );
}