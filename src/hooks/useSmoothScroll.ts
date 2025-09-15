"use client";

import {useEffect} from "react";
import Lenis from "lenis";
import {usePathname} from "next/navigation";

export const useSmoothScroll = () => {
    const pathName = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf (time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, [pathName]);
};