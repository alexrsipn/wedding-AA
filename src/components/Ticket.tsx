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
        <div ref={ref} className="w-full max-w-sm bg-slate-50 dark:bg-slate-800 rounded-lg shadow-2xl font-sans text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-50">
            <div className="flex justify-center items-center p-2">
                <Image src="/images/logo_AA_light.svg" alt="Logo" width={50} height={50} className="dark:invert" />
            </div>
            <div className="m-0 p-0 w-full h-40 flex flex-row justify-between items-center">
                <div className="w-1/2">
                    <Image src="/images/std_ticket_banner.svg" alt="Foto_pass" width={80} height={40} className="w-full h-full ticket-image"/>
                </div>
                <div className="w-1/2 h-full flex flex-col justify-center items-center bg-amber-100/50 dark:bg-neutral-700">
                    <p className="font-serif font-semibold">Andrea & Alexis</p>
                    <p className="font-light text-sm italic">28.03.2026</p>
                </div>
            </div>
            <div className="py-2 text-center">
                <p className="font-bold text-md">{guestName}: {confirmedGuests.length}</p>
                <div className="py-2">
                    <div className="text-sm bg-slate-200 dark:bg-slate-700 p-2">
                        {confirmedGuests.map((name, index) => (
                            <p key={index}>{name}</p>
                        ))}
                    </div>
                    <div className="flex justify-center items-center py-2">
                        <div className="bg-white p-2 rounded-md">
                            <QRCodeSVG value={guestId} size={96} />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="border-b border-dashed border-slate-600 font-semibold w-1/4">NO NIÑOS</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

Ticket.displayName = "Ticket";