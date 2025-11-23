"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useGuest} from "@/context/GuestContext";
import HighlightedText from "@/components/HighlightedText";
import {AccordionItem} from "@/components/Accordion";

const detailsItems = [
    {
        id: "schedule",
        title: "Fecha y horario",
        subtitle: "Nuestra boda se llevará a cabo el día sábado 28 de marzo del 2026",
        description: "Te esperamos desde las 3:30 pm, la ceremonia inicia a las 4:00 pm.",
    },
    {
        id: "dresscode",
        title: "Código de vestimenta",
        subtitle: "Vestimenta formal de jardín",
        description: "Para que luzcas increíble, te sugerimos evitar los colores blanco y negro. ¡Elige tu mejor atuendo y prepárate para celebrar!",
    },
    {
        id: "gifts",
        title: "Mesa de regalos",
        subtitle: "Tu presencia es nuestro mejor regalo.",
        description: "Si además deseas obsequiarnos algo, te compartimos nuestras mesas de regalos.",
        urlList: [
            {
                url: "https://www.amazon.com.mx/wedding/share/andreayalexis",
                name: "Amazon",
                className: "bg-white text-black font-bold py-2 px-4 rounded border border-[#FF9900]"
            },
            {
                url: "https://mesaderegalos.liverpool.com.mx/milistaderegalos/51774312",
                name: "Liverpool",
                className: "bg-[#e10098] text-white font-bold py-2 px-4 rounded border border-white"
            },
            {
                url: "https://www.elpalaciodehierro.com/buscar?eventId=401292",
                name: "Palacio de Hierro",
                className: "bg-[#f4b900] text-black font-bold py-2 px-4 rounded border border-white"
            }
        ]
    },
    {
        id: "considerations",
        title: "Consideraciones importantes",
        subtitle: "Costo de estacionamiento $70 MXN (tiempo libre)",
        description: "Reserva con anticipación si te hospedas cerca, ya que el evento es un día antes de Semana Santa.",
        important: "NO NIÑOS MAYORES DE 3 AÑOS."
    }
];

export default function Details() {
    const {guest} = useGuest();
    const [openAccordion, setOpenAccordion] = useState<string | null>(detailsItems[0]?.id || null);
    return (
        <>
            <section id="details" className="body-font my-6">
                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -top-4 lg:top-0 left-0 m-0 p-0 rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>
                <HighlightedText className="text-3xl font-bold mb-6 text-center">Detalles del evento</HighlightedText>
                {guest && (
                    <p className="text-justify p-2 text-base landscape:px-12">{guest.name} {guest.assignedTickets!>1 ? "les" : "te"} recomendamos revisar todos los detalles de nuestro evento, presionando cada sección.</p>
                )}
                <div className="container px-4 mx-auto flex sm:flex-nowrap flex-wrap flex-col lg:flex-row justify-center items-center gap-4">
                    <div
                        className="w-full md:w-1/2 min-h-[35rem] bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative order-2 lg:order-1">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6113.944227080422!2d-98.96296843954751!3d18.81423064923412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce6f0f1f30e757%3A0x7c6a8f38f4134798!2zSmFyZMOtbiBkZSBFdmVudG9zIOKAnEVsIEVuY2FudG_igJ0!5e0!3m2!1ses-419!2smx!4v1756964578289!5m2!1ses-419!2smx"
                            width="100%" height="100%" className="absolute inset-0" title="El Encanto" allowFullScreen={false} loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <div className="flex bg-neutral-100 relative flex-wrap py-2 rounded shadow-xl">
                            <div className="lg:w-1/2 px-6 text-slate-900">
                                <h2 className="text-sm lg:text-xl title-font font-semibold tracking-widest">Ubicación</h2>
                                <p className="block text-xs lg:text-base">Carr. Cuautla-el Hospital 45, 10 de Abril, 62744 Cuautla, Mor.</p>
                            </div>
                            <div className="w-full lg:w-1/2 lg:mt-0 text-center flex flex-col justify-center items-center gap-2 p-2">
                                <Link href="https://maps.app.goo.gl/NGLMagYyz4J17V2o6" target="_blank" className="w-full bg-sky-700 hover:bg-sky-800 dark:bg-sky-700 dark:hover:bg-sky-600 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-colors">Cómo llegar con Maps</Link>
                                <Link href="https://ul.waze.com/ul?place=ChIJV-cwHw9vzoURmEcT9DiPanw&ll=18.81484290%2C-98.96175350&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target="_blank" className="w-full bg-sky-700 hover:bg-sky-800 dark:bg-sky-700 dark:hover:bg-sky-600 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-colors">Cómo llegar con Waze</Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 bg-slate-100/80 dark:bg-slate-800/90 order-1 lg:order-2 rounded shadow border border-neutral-50 dark:border-neutral-700 overflow-hidden">
                        {detailsItems.map((item) => (
                            item.id !== "gifts" && (
                                <AccordionItem
                                    key={item.id}
                                    title={item.title}
                                    isOpen={openAccordion === item.id}
                                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                                >
                                    <div className="text-lg text-center font-normal leading-relaxed space-y-3">
                                        <p className="font-semibold">{item.subtitle}</p>
                                        <p className="text-justify">{item.description}</p>
                                        {item.important && <p className="font-semibold italic">{item.important}</p>}
                                        <div
                                            className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                                            {item.urlList?.map(({url, name, className}, index) => (
                                                <Link key={index} href={url} target="_blank"
                                                      className={`${className} w-full sm:w-auto text-center`}>{name}</Link>
                                            ))}
                                        </div>
                                    </div>
                                </AccordionItem>
                            )
                        ))}
                        {detailsItems.map((item) => (
                            item.id === "gifts" && (
                                <div key={item.id} className="text-lg text-center font-normal leading-relaxed space-y-3 p-4">
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p className="font-semibold">{item.subtitle}</p>
                                    <p className="text-justify">{item.description}</p>
                                    {item.important && <p className="font-semibold italic">{item.important}</p>}
                                    <div
                                        className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                                        {item.urlList?.map(({url, name, className}, index) => (
                                            <Link key={index} href={url} target="_blank"
                                                  className={`${className} w-full sm:w-auto text-center`}>{name}</Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
{/*                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -bottom-20 lg:-bottom-12 right-0 m-0 p-0 -rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>*/}
            </section>
        </>
    );
}