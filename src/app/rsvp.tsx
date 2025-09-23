"use client";

import {useState, useEffect, useRef, useCallback} from "react";
import HighlightedText from "@/components/HighlightedText";
import {useGuest} from "@/context/GuestContext";
import {toPng} from "html-to-image";
import {Ticket} from "@/components/Ticket";
import {toDataURL} from "@/lib/utils";
import Image from "next/image";

export default function Rsvp() {
    return (
        <>
            <section id="rvsp" className= "body-font my-6">
                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -top-2 lg:top-0 left-0 m-0 p-0 rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>
                <div className="container px-4 mx-auto flex flex-col items-center">
                    <HighlightedText className="text-3xl font-bold mb-6 text-center">Asistencia</HighlightedText>
                    <RVSPForm/>
                </div>
                {/*<div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -bottom-12 lg:-bottom-12 right-0 m-0 p-0 -rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>*/}
            </section>
        </>
    );
}

function RVSPForm() {
    const {guest, isLoading, error} = useGuest();
    const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const ticketRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (guest?.guestDetails) {
            setSelectedGuests(guest.guestDetails);
        }
    }, [guest]);

    const handleCheckboxChange = (guestName: string) => {
        setSelectedGuests(prev => prev.includes(guestName) ? prev.filter(name => name !== guestName) : [...prev, guestName]);
    };

    const handleSubmit = async () => {
        if (!guest) return;
        setStatus('submitting');
        try {
            const response = await fetch('/api/netlify/functions/confirm-guest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    GuestId: guest.id,
                    Confirmed: selectedGuests.length > 0,
                    ConfirmedTickets: selectedGuests.length,
                    ConfirmedAttendees: selectedGuests,
                    InvitationStatus: "Confirmed"
                }),
            });

            if (!response.ok) {
                setStatus('error');
                console.log("Error al confirmar la asistencia")
                return;
            }
            setStatus('success');
        } catch (e) {
            setStatus('error');
            console.log(e)
        }
    };

    const handleAddToCalendar = () => {
        const event = {
            title: 'Boda Andrea & Alexis',
            description: "¡Te esperamos para celebrar nuestra unión en matrimonio! Código de vestimenta: Formal de jardín.",
            location: "Jardín de Eventos 'El Encanto', Carr. Cuautla-el Hospital 45, 10 de abril, 62744 Cuautla, Mor.",
            startTime: "20260328T150000",
            endTime: "20260329T000000",
            url: window.location.href,
        };
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `URL:${event.url}`,
            `DTSTART;TZID=America/Mexico_City:${event.startTime}`,
            `DTEND;TZID=America/Mexico_City:${event.endTime}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description}`,
            `LOCATION:${event.location}`,
            'BEGIN:VALARM',
            'TRIGGER:-PT48H',
            'REPEAT:1',
            'DURATION:PT5M',
            'ACTION:DISPLAY',
            'DESCRIPTION:Recordatorio',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR',
        ].join("\n");

        const blob = new Blob([icsContent], {type: "text/calendar;charset=utf-8"});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "boda-andrea-alexis.ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadTicket = useCallback(() => {
        if (ticketRef.current === null) {
            return;
        }

        const nodeToRender = ticketRef.current;
        const image = ticketRef.current.querySelector('img.ticket-image') as HTMLImageElement;

        if (!image) {
            console.error("No se encontró la imagen del boleto.");
            return;
        }

        const originalSrc = image.src;

        const generateAndDownload = () => {
            toPng(nodeToRender, {cacheBust: true, pixelRatio: 2})
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.download = "boleto-boda-andrea-alexis.png";
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => console.error("Error al generar la imagen: ", err))
                .finally(() => {
                    image.src = originalSrc;
                })
        };

        if (image.src.startsWith('data:')) {
            generateAndDownload();
        } else {
            toDataURL(image.src)
                .then(dataUrl => {
                    image.src = dataUrl;
                    generateAndDownload();
                })
                .catch((error) => {
                    console.error("Error al generar la imagen: ", error);
                })
        }
    }, [ticketRef]);

    if (isLoading) {
        return <p className="mt-8">Cargando tu invitación...</p>
    }

    if (error || !guest) {
        return (
            <div className="mt-8 text-center max-w-lg p-6 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-xl font-semibold text-red-800">Invitación no encontrada</h3>
                <p className="text-red-700 mt-2">No pudimos cargar los detalles de tu invitación. Por favor, asegúrate de usar el enlace personal que te enviamos.</p>
            </div>
        );
    }

    if (status === 'success' || guest.invitationStatus === "Confirmed") {
        return (
            <div className="w-full flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl lg:text-3xl font-serif font-semibold title-font mb-4 text-gray-900 dark:text-white">¡Gracias por confirmar!</h3>
                <p className="text-xl lg:text-lg font-normal text-gray-900 dark:text-white pb-4">Tu respuesta ha sido guardada. ¡Nos llena de alegría saber que nos acompañarás!</p>
                <Ticket ref={ticketRef} guestName={guest.name} confirmedGuests={guest.guestDetails || []} guestId={guest.id} />
                <div className="flex flex-col sm:flex-row gap-8 mt-8">
                    <button onClick={handleDownloadTicket} className="bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer shadow-md hover:bg-sky-700 transition-all duration-300 transform hover:scale-105">Descargar boleto</button>
                    <button onClick={handleAddToCalendar} className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">Añadir evento al calendario</button>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8 w-full max-w-2xl p-6 bg-white dark:bg-neutral-700 rounded-lg shadow-xl border border-gray-200 dark:border-neutral-600">
            <p className="text-center text-lg mb-4">Hola <b>{guest.name}</b>, por favor, selecciona quiénes de tu grupo asistirán.</p>
            <div className="space-y-3 mb-6">
                {guest.guestDetails?.map((guest, index) => (
                    <label key={index} htmlFor={`guest-${index}`} className="flex items-center p-2 bg-gray-50 dark:bg-neutral-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-500 transition-colors">
                        <input
                            type="checkbox"
                            id={`guest-${index}`}
                            checked={selectedGuests.includes(guest)}
                            onChange={() => handleCheckboxChange(guest)}
                            className="h-5 w-5 rounded border-gray-300 text-paynesgray focus:ring-paynesgray"
                        />
                        <span className="ml-4 text-lg text-gray-800 dark:text-gray-100">{guest}</span>
                    </label>
                ))}
            </div>
            <div className="flex justify-between items-center mb-6">
                <p className="font-semibold text-lg">{selectedGuests.length} de {guest.assignedTickets} asistirán</p>
                <div className="flex gap-2">
                    <button onClick={() => setSelectedGuests(guest?.guestDetails || [])} className="text-sm text-paynesgray dark:text-skyblue hover:underline">Seleccionar todos</button>
                    <button onClick={() => setSelectedGuests([])} className="text-sm text-gray-500 hover:underline">Deseleccionar</button>
                </div>
            </div>
            <button onClick={handleSubmit} disabled={status === 'submitting'} className="w-full bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed">
                {status === 'submitting' ? 'Confirmando...' : 'Confirmar asistencia'}
            </button>
            {status === 'error' && <p className="text-red-500 text-center mt-4">Hubo un error al enviar tu respuesta. Por favor, inténtalo de nuevo.</p>}
        </div>
    );
}