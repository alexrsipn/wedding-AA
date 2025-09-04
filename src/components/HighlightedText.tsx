"use client";

import {useScroll, useTransform, motion, MotionValue} from "framer-motion";
import {useRef, ReactNode, FC} from "react";

interface HighlightedTextProps {
    children: string;
    className?: string;
}

interface WordProps {
    children: ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range}) => {
    const opacity = useTransform(progress, range, [0.2, 1]);
    return (
        <span className="relative">
            <span className="absolute opacity-20">{children}</span>
            <motion.span style={{opacity}}>{children}</motion.span>
        </span>
    )
}

const HighlightedText: FC<HighlightedTextProps> = ({children, className}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start 0.6", "end 0.4"]
    });

    const words = children.split(" ");
    return (
        <p ref={containerRef} className={`flex flex-wrap ${className}`}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
            })}
        </p>
    )
}

export default HighlightedText;