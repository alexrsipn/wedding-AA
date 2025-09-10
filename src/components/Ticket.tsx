"use client";

import {forwardRef} from "react";
import {QRCodeSVG} from "qrcode.react";
import Image from "next/image";

interface TicketProps {
    guestName?: string;
    confirmedGuests: string[];
    guestId: string;
}

export const Ticket = forwardRef<HTMLDivElement, TicketProps>(({guestName, confirmedGuests, guestId}, ref) => {
    /*const qrUrl = `${window.location.origin}/?guestId=${guestId}`;*/
    return (
        <div ref={ref} className="w-full max-w-sm bg-white dark:bg-slate-800 p-6 rounded-lg shadow-2xl font-sans text-slate-800 dark:text-slate-200">
            <div className="text-center border-b-2 border-dashed border-slate-300 dark:border-slate-600 pb-4">
                <p className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">Te esperamos en la boda de</p>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white py-2">Andrea & Alexis</h2>
                <p className="text-sm">Sábado, 28 de Marzo, 2026 - 3:30 PM</p>
            </div>
            <div className="py-4 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">Pase de entrada para:</p>
                <p className="font-bold text-lg">{guestName}</p>
                <div className="p-0">
                    <p className="text-sm text-slate-500 dark:text-slate-400 py-2">Invitados confirmados ({confirmedGuests.length}): </p>
                    <div className="text-sm bg-slate-50 dark:bg-slate-700 p-2 rounded-md">
                        {confirmedGuests.map((name, index) => (
                            <p key={index}>{name}</p>
                        ))}
                    </div>
                    <div className="flex justify-center items-center my-4 border-t-2 border-dashed border-slate-300 dark:border-slate-600">
                        <div className="bg-white mt-4 p-2 rounded-md">
                            <QRCodeSVG value={guestId} size={128} />
                        </div>
                    </div>
                    <div className="text-center">
                        <Image src="/images/logo_AA_light.svg" alt="Logo" width={40} height={40} className="mx-auto dark:invert" />
                    </div>
                </div>
            </div>
        </div>
    );
});

Ticket.displayName = "Ticket";