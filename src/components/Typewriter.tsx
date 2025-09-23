"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(TextPlugin);

interface TypewriterProps {
    text: string;
    finalBar: boolean;
    className?: string;
    startAnimation?: boolean;
}

const Typewriter = ({text, finalBar, className, startAnimation = true}: TypewriterProps) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!startAnimation || !textRef.current) return;

        const masterTl = gsap.timeline({ repeat: -1, defaults: {ease: "none"}});

        if (finalBar && cursorRef.current) {
            gsap.to(cursorRef.current, { opacity: 0, repeat: -1, yoyo: true, duration: 0.4 });
        }

        const tl = gsap.timeline();
        tl.to(textRef.current, {
            duration: text.length * 0.05 + 0.25,
            text: text,
            ease: "sine.in",
            onComplete: () => {
                if (finalBar && cursorRef.current) {
                    gsap.to(cursorRef.current, {
                        opacity: 0,
                        ease: "power2.inOut",
                        repeat: -1,
                        yoyo: true,
                        duration: 0.4
                    });
                }
            }
        });
        tl.to({}, {duration: 3});
        tl.to(textRef.current, {
            text: text,
            reversed: true,
            ease: "sine.out"
        });
        tl.to({}, {duration: 1});
        masterTl.add(tl);
        return () => masterTl.kill();
    }, {dependencies: [startAnimation, text], scope: containerRef, revertOnUpdate: true});

    return (
        <h1 className={className} ref={containerRef}>
            <span ref={textRef}></span>
            {finalBar && <span ref={cursorRef}>|</span>}
        </h1>
    );
};

export default Typewriter;
