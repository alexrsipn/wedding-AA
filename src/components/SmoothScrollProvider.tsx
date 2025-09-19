"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import {LenisContext} from "@/context/LenisContext";
import {useState, useEffect} from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        const newLenis = new Lenis();
        setLenis(newLenis);
        function raf(time: number) {
            newLenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => newLenis.destroy();
    }, []);

    return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}