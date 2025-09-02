"use client";

import {createContext, useContext, useState, useEffect, ReactNode} from "react";
import {useSearchParams} from "next/navigation";

export interface Guest {
    id: string,
    name?: string,
    guestListDetails?: string,
    guestDetails?: string[],
    assignedTickets?: number,
    confirmedTickets?: number,
    guestList?: string,
    guestCode?: string,
    phone?: string,
    email?: string,
    confirmed?: string,
    invitationStatus?: string
}

interface GuestContextType {
    guest: Guest | null;
    isLoading: boolean;
    error: string | null;
}

const GuestContext = createContext<GuestContextType>({
    guest: null,
    isLoading: true,
    error: null
});

export const useGuest = () => useContext(GuestContext);

export const GuestProvider = ({children}: {children: ReactNode}) => {
    const [guest, setGuest] = useState<Guest | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const guestId = searchParams!.get('guestId');

    useEffect(() => {
        if (!guestId) {
            setIsLoading(false);
            setError("No se ha proporcionado un ID de invitado");
            return;
        }
        const fetchGuest = async () => {
            try {
                const response = await fetch(`/api/netlify/functions/get-guest?guestId=${guestId}`);
                if (!response.ok) {
                    /*throw new Error("No pudimos encontrar tu invitación");*/
                    console.error("No pudimos encontrar tu invitación");
                    setError("No pudimos encontrar tu invitación");
                    return;
                }
                const data: Guest = await response.json();
                const guestList = data.guestListDetails?.split(";");
                const guestData = {
                    id: data.id,
                    name: data.name,
                    guestListDetails: data.guestListDetails,
                    guestDetails: guestList,
                    assignedTickets: data.assignedTickets,
                    confirmedTickets: data.confirmedTickets,
                    guestList: data.guestList,
                    guestCode: data.guestCode,
                    phone: data.phone,
                    email: data.email,
                    confirmed: data.confirmed,
                    invitationStatus: data.invitationStatus
                }
                setGuest(guestData);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("Caught an error: ", err.message);
                    setError(err.message);
                } else if (typeof err === "string") {
                    console.error("Caught an error: ", err);
                    setError(err);
                } else {
                    console.error("Caught an unknown error");
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchGuest();
    }, [guestId]);
    const value = {guest, isLoading, error};
    return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
}