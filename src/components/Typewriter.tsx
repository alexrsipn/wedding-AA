"use client";
import {useState, useEffect} from "react";
import {motion, animate, useMotionValue, useTransform} from "framer-motion";

interface TypewriterProps {
    text: string;
    finalBar: boolean;
    className?: string;
    startAnimation?: boolean;
}

const Typewriter = ({text, finalBar, className, startAnimation = true}: TypewriterProps) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayedText = useTransform(rounded, (latest) => text.slice(0, latest));

    const [animationComplete, setAnimationComplete] = useState(false);

/*    useEffect(() => {
        const controls = animate(count, text.length, {
            type: "tween",
            duration: text.length * 0.05,
            ease: "linear",
            onComplete: () => setAnimationComplete(true),
        });
        return controls.stop;
    }, [text, count]);*/
    useEffect(() => {
        if (startAnimation) {
            setAnimationComplete(false);
            const controls = animate(count, text.length, {
                type: "tween",
                duration: text.length * 0.05,
                ease: "linear",
                onComplete: () => setAnimationComplete(true)
            });
            return controls.stop;
        }
    }, [text, count, startAnimation]);

    return (
        <motion.h1 className={className}>
            <motion.span>{displayedText}</motion.span>
            {animationComplete && finalBar && (
                <motion.span animate={{opacity: [0,1,0]}} transition={{repeat: Infinity, duration: 0.8, ease: "linear"}}>
                    &nbsp;|
                </motion.span>
            )}
        </motion.h1>
    );
};

export default Typewriter;