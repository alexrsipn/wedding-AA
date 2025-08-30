"use client";

import {createContext, useContext, useState, useEffect, ReactNode} from "react";
import {useSearchParams} from "next/navigation";

export interface Guest {
    id: string,
    name?: string,
    guestListDetails?: string,
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
                    throw new Error("No pudimos encontrar tu invitación");
                }
                const data: Guest = await response.json();
                setGuest(data);
            } catch (err: Error) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchGuest();
    }, [guestId]);
    const value = {guest, isLoading, error};
    return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
}