"use client";

import {useState, useEffect} from "react";
import HighlightedText from "@/components/HighlightedText";
import {useGuest} from "@/context/GuestContext";

export default function RVSP() {
    return (
        <>
            <section id="rvsp" className="text-gray-600 body-font relative py-12">
                <div className="container px-4 mx-auto flex flex-col items-center">
                    <HighlightedText className="text-3xl lg:text-2xl text-center font-medium title-font mb-4 text-gray-900 dark:text-white">Asistencia</HighlightedText>
                    {/*<div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 border border-red-500">
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
                        <p className="leading-relaxed mb-5 text-gray-600">Post-ironic portland shabby chic echo park,
                            banjo fashion axe</p>
                        <div className="relative mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                            <input type="text" id="name" name="name"
                                   className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" name="email"
                                   className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                            <textarea id="message" name="message"
                                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        <button
                            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button
                        </button>
                        <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled
                            brook viral artisan.</p>
                    </div>*/}
{/*                    <div className="flex justify-center items-center p-40">
                        <p>Sección en construcción</p>
                    </div>*/}
                    <RVSPForm/>
                </div>
            </section>
        </>
    );
}

function RVSPForm() {
    const {guest, isLoading, error} = useGuest();
    const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
        };
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `URL:${document.URL}`,
            `DTSTART;TZID=America/Mexico_City:${event.startTime}`,
            `DTEND;TZID=America/Mexico_City:${event.endTime}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description}`,
            `LOCATION:${event.location}`,
            'BEGIN:VALARM',
            'TRIGGER:-PT24H',
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

    if (status === 'success' || guest.confirmed) {
        return (
            <div className="w-full flex flex-col justify-center items-center">
                <h3 className="text-2xl lg:text-xl text-center font-medium title-font mb-4 text-gray-900 dark:text-white">¡Gracias por confirmar!</h3>
                <p className="text-xl lg:text-lg text-center font-normal text-gray-900 dark:text-white">Tu respuesta ha sido guardada. ¡Nos llena de alegría saber que nos acompañarás!</p>
                <button onClick={handleAddToCalendar} className="bg-indigo-500 text-white font-semibold my-8 py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">Añadir evento al calendario</button>
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
            <button onClick={handleSubmit} disabled={status === 'submitting'} className="w-full bg-paynesgray cursor-pointer text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                {status === 'submitting' ? 'Confirmando...' : 'Confirmar asistencia'}
            </button>
            {status === 'error' && <p className="text-red-500 text-center mt-4">Hubo un error al enviar tu respuesta. Por favor, inténtalo de nuevo.</p>}
        </div>
    );
}