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
        <div ref={ref} className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-lg shadow-2xl font-sans text-slate-800 dark:text-slate-200 border border-slate-200">
            <div className="flex justify-baseline items-center px-4 py-2">
                <Image src="/images/logo_AA_light.svg" alt="Logo" width={50} height={50} className="dark:invert" />
            </div>
            <div className="m-0 p-0 w-full h-36 flex flex-row justify-between items-center">
                <Image src="/images/hero.jpg" alt="Foto_pass" width={100} height={50} className="w-1/2 h-full"/>
                <div className="w-1/2 h-full flex flex-col justify-center items-center bg-amber-100/50 dark:bg-neutral-700">
                    <p className="font-serif font-semibold">Andrea & Alexis</p>
                    <p className="font-light text-sm italic">28.03.2026</p>
                </div>
            </div>
{/*            <div className="text-center border-b-2 border-dashed border-slate-300 dark:border-slate-600 pb-4">
                <p className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">Te esperamos en la boda de</p>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white py-2">Andrea & Alexis</h2>
                <p className="text-sm">Sábado, 28 de Marzo, 2026 - 3:30 PM</p>
            </div>*/}
            <div className="py-2 text-center">
                {/*<p className="text-sm text-slate-500 dark:text-slate-400">Pase de entrada para:</p>*/}
                <p className="font-bold text-md">{guestName} : {confirmedGuests.length}</p>
                <div className="py-2">
                    {/*<p className="text-sm text-slate-500 dark:text-slate-400 py-2">Invitados confirmados ({confirmedGuests.length}): </p>*/}
                    <div className="text-sm bg-slate-100 dark:bg-slate-700 p-2">
                        {confirmedGuests.map((name, index) => (
                            <p key={index}>{name}</p>
                        ))}
                    </div>
                    {/*<div className="flex justify-center items-center my-4 border-t-2 border-dashed border-slate-300 dark:border-slate-600">*/}
                    <div className="flex justify-center items-center py-2">
                        <div className="bg-white p-2 rounded-md">
                            <QRCodeSVG value={guestId} size={96} />
                        </div>
                    </div>
                    {/*<div className="text-center">
                        <Image src="/images/logo_AA_light.svg" alt="Logo" width={40} height={40} className="mx-auto dark:invert" />
                    </div>*/}
                </div>
            </div>
        </div>
    );
});

Ticket.displayName = "Ticket";