"use client";

import Link from "next/link";
import {useState} from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import {Modal} from "@/components/Modal";
import {useGuest} from "@/context/GuestContext";
import HighlightedText from "@/components/HighlightedText";

const detailsItems = [
    {
        id: "schedule",
        title: "Fecha y horario",
        subtitle: "Sábado 28.03.2026",
        imageUrl: "/images/envelope.png",
        description: "El evento inicia a las 4:00 pm",
    },
    {
        id: "dresscode",
        title: "Código de vestimenta",
        subtitle: "Etiqueta formal jardín",
        imageUrl: "/images/envelope.png",
        description: "Para que luzcas increíble, te sugerimos evitar los colores blanco y negro. ¡Elige tu mejor atuendo y prepárate para celebrar!",
    },
    {
        id: "gifts",
        title: "Mesa de regalos",
        subtitle: "Tu presencia es nuestro mejor regalo",
        imageUrl: "/images/envelope.png",
        description: "Si además deseas obsequiarnos algo, te compartimos nuestra mesa de regalos.",
        urlList: [
            {
                url: "https://www.liverpool.com.mx/tienda/home",
                name: "Liverpool"
            },
            {
                url: "https://www.sears.com.mx",
                name: "Sears"
            },
            {
                url: "https://www.amazon.com.mx",
                name: "Amazon"
            }
        ]
    },
    {
        id: "moneygifts",
        title: "Apoyo económico",
        subtitle: "Tu presencia es nuestro mejor regalo",
        imageUrl: "/images/envelope.png",
        description: "Si además deseas obsequiarnos algo, te compartimos nuestra mesa de regalos.",
    }
]

export default function Details() {
    const {guest} = useGuest();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedItem = selectedId ? detailsItems.find(item => item.id === selectedId) : null;
    return (
        <>
            <section id="details" className="body-font my-8">
                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute top-0 -left-1 md:left-0 m-0 p-0 rotate-90 w-1/4 md:w-1/12 md:scale-105 saturate-75" unoptimized={true}/>
                </div>
                {/*<h3 className="text-3xl lg:text-2xl text-center font-medium title-font mb-4 text-gray-900 dark:text-white">Detalles del evento</h3>*/}
                <HighlightedText className="text-3xl lg:text-2xl text-center font-medium title-font mb-4 text-gray-900 dark:text-white">Detalles del evento</HighlightedText>
                {guest && (
                    <p className="text-center py-2 text-base">{guest.name} {guest.assignedTickets!>1 ? "les" : "te"} recomendamos revisar todos los detalles de nuestro evento</p>
                )}
                <div className="container px-4 mx-auto flex sm:flex-nowrap flex-wrap flex-col lg:flex-row justify-center items-center gap-4">
                    <div
                        className="w-full md:w-1/2 min-h-[30rem] bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative order-2 lg:order-1">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6113.944227080422!2d-98.96296843954751!3d18.81423064923412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce6f0f1f30e757%3A0x7c6a8f38f4134798!2zSmFyZMOtbiBkZSBFdmVudG9zIOKAnEVsIEVuY2FudG_igJ0!5e0!3m2!1ses-419!2smx!4v1756964578289!5m2!1ses-419!2smx"
                            width="100%" height="100%" className="absolute inset-0" title="El Encanto" allowFullScreen={false} loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <div className="flex bg-neutral-100 relative flex-wrap py-6 rounded shadow-md">
                            <div className="lg:w-1/2 px-6 text-slate-900">
                                <h2 className="title-font font-semibold tracking-widest">Ubicación</h2>
                                <p className="hidden md:block mt-1">Carr. Cuautla-el Hospital 45, 10 de Abril, 62744 Cuautla, Mor.</p>
                            </div>
                            <div className="w-full lg:w-1/2 lg:mt-0 text-center flex flex-col justify-center items-center gap-2 p-2">
                                <Link href="https://maps.app.goo.gl/NGLMagYyz4J17V2o6" target="_blank" className="w-full bg-sky-700 hover:bg-sky-800 dark:bg-sky-700 dark:hover:bg-sky-600 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-colors">Cómo llegar con Maps</Link>
                                <Link href="https://ul.waze.com/ul?place=ChIJV-cwHw9vzoURmEcT9DiPanw&ll=18.81484290%2C-98.96175350&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target="_blank" className="w-full bg-sky-700 hover:bg-sky-800 dark:bg-sky-700 dark:hover:bg-sky-600 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-colors">Cómo llegar con Waze</Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 p-4 flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800 order-1 lg:order-2 rounded-lg shadow border border-neutral-100">
                        {detailsItems.map((item, index) => (
                            <div key={index} className="w-full">
                                <h2 className="text-xl font-medium text-left">{item.title}</h2>
                                <p className="text-base font-normal text-center">{item.subtitle}</p>
                                <p className="text-base text-center">{item.description}</p>
                                <div className="w-full flex justify-around items-center">
                                {item.urlList && item.urlList.length > 0 && item.urlList.map(({url, name}, index) => (
                                    <button key={index} className="bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-colors">
                                        <Link href={url}>{name}</Link>
                                    </button>
                                ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -bottom-12 right-0 m-0 p-0 -rotate-90 w-1/4 md:w-1/12 md:scale-105 saturate-75" unoptimized={true}/>
                </div>
            </section>
        </>
    );
}