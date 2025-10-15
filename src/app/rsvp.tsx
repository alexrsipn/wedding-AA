"use client";

import {useState, useEffect, useRef, useCallback} from "react";
import HighlightedText from "@/components/HighlightedText";
import {useGuest} from "@/context/GuestContext";
import {toPng} from "html-to-image";
import {Ticket} from "@/components/Ticket";
import Image from "next/image";
import {Modal} from "@/components/Modal";

export default function Rsvp() {
    return (
        <>
            <section id="rvsp" className= "body-font my-6">
                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -top-2 lg:top-0 left-0 m-0 p-0 rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>
                <div className="container px-4 mx-auto flex flex-col items-center">
                    <HighlightedText className="text-3xl font-bold mb-6 text-center">Asistencia</HighlightedText>
                    <RSVPForm/>
                </div>
                {/*<div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -bottom-12 lg:-bottom-12 right-0 m-0 p-0 -rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>*/}
            </section>
        </>
    );
}

function RSVPForm() {
    const {guest, isLoading, error} = useGuest();
    const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'declined' | 'error'>('idle');
    const [isDownloading, setIsDownloading] = useState(false);
    const ticketRef = useRef<HTMLDivElement>(null);
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
    const [declineReason, setDeclineReason] = useState("");

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

    const handleDecline = async (reason: string) => {
        if (!guest) return;
        setStatus('submitting');
        try {
            const response = await fetch('/api/netlify/functions/confirm-guest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    GuestId: guest.id,
                    Confirmed: true,
                    ConfirmedTickets: 0,
                    ConfirmedAttendees: [],
                    InvitationStatus: "Declined",
                    DeclineReason: reason
                }),
            });

            if (!response.ok) {
                setStatus('error');
                return;
            }
            setStatus('declined');
            setIsDeclineModalOpen(false);
        } catch (e: unknown) {
            console.log("Error: ", e)
            setStatus('error');
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
        setIsDownloading(true);
        if (ticketRef.current === null || isDownloading) {
            return;
        }

        toPng(ticketRef.current, { cacheBust: true, pixelRatio: 2 })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "boleto-boda-andrea-alexis.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => console.error("Ocurrió un error al generar la imagen del boleto: ", err))
            .finally(() => setIsDownloading(false));
    }, [ticketRef, isDownloading]);

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
                    <button
                        onClick={handleDownloadTicket}
                        className="bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer shadow-md hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100"
                        disabled={isDownloading}>
                        {isDownloading ? (
                            <>
                                <svg aria-hidden="true" role="status"
                                     className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="#1C64F2"/>
                                </svg>
                                Descargando...
                            </>
                        ) : 'Descargar boleto'}
                    </button>
                    <button
                        onClick={handleAddToCalendar}
                        className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:scale-100"
                        disabled={isDownloading}
                    >Añadir evento al calendario
                    </button>
                </div>
            </div>
        );
    }

    if (status === 'declined' || guest.invitationStatus === 'Declined') {
        return (
            <div className="w-full min-h-96 flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl lg:text-3xl font-serif font-semibold title-font mb-4 text-gray-900 dark:text-white">Confirmación recibida</h3>
                <p>Lamentamos que no puedan acompañarnos, pero agradecemos mucho que nos hayan avisado.</p>
                <p>Les enviamos nuestros mejores deseos.</p>
            </div>
        )
    }

    return (
        <div
            className="mt-8 w-full max-w-2xl p-6 bg-white dark:bg-neutral-700 rounded-lg shadow-xl border border-gray-200 dark:border-neutral-600">
            <div className="py-4">
                <p className="text-center text-lg"><b>{guest.name}</b> selecciona quiénes de los adultos asistirán.</p>
                <p className="text-justify py-2">Se generará un boleto QR con las personas que asistirán, al presionar el botón <i>Confirmar asistencia</i>.</p>
            </div>
            <div className="space-y-3 mb-6">
                {guest.guestDetails?.map((guest, index) => (
                    <label key={index} htmlFor={`guest-${index}`}
                           className="flex items-center p-2 bg-gray-50 dark:bg-neutral-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-500 transition-colors">
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
                <div className="flex flex-col lg:flex-row gap-4">
                    <button onClick={() => setSelectedGuests(guest?.guestDetails || [])} className="text-sm text-indigo-400 hover:underline cursor-pointer">Seleccionar todos</button>
                    <button onClick={() => setSelectedGuests([])} className="text-sm text-indigo-400 hover:underline cursor-pointer">Deseleccionar todos</button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setIsDeclineModalOpen(true)} disabled={status === 'submitting'} className="w-full bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">{guest.assignedTickets! > 1 ? "No podremos asistir" : "No podré asistir"}</button>
                <button onClick={handleSubmit} disabled={status === 'submitting' || selectedGuests.length === 0} className="w-full bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-all duration-500 disabled:bg-gray-400 disabled:hover:bg-gray-500 disabled:cursor-not-allowed disabled:animate-none animate-pulse flex items-center justify-center gap-2">
                    {status === 'submitting' ? 'Confirmando...' : 'Confirmar asistencia'}
                </button>
            </div>
            {status === 'error' && <p className="text-red-500 text-center mt-4">Hubo un error al enviar tu respuesta. Por favor, inténtalo de nuevo.</p>}
            <Modal isOpen={isDeclineModalOpen} onClose={() => setIsDeclineModalOpen(false)} layoutId="decline-modal">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Lamentamos que no puedas asistir</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Si lo deseas, puedes dejarnos un mensaje.</p>
                    <textarea
                        value={declineReason}
                        onChange={(e) => setDeclineReason(e.target.value)}
                        placeholder="Ej: ¡Les deseamos lo mejor en su gran día!..."
                        className="w-full p-4 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200 focus:ring-sky-500"
                        rows={3}
                    />
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <button onClick={() => setIsDeclineModalOpen(false)} className="w-full px-4 py-2 bg-gray-200 dark:bg-neutral-400 text-gray-800 cursor-pointer dark:text-gray-200 rounded-md  hover:bg-gray-300 dark:hover:bg-neutral-500 font-medium transition-colors">Regresar</button>
                        <button onClick={() => handleDecline(declineReason)} disabled={status === 'submitting'} className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 cursor-pointer text-white rounded-md font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {status === 'submitting' ? 'Enviando...' : 'Confirmar no asistencia'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}