"use client";

import {useEffect, useRef} from "react";
import {MotionValue, useTransform} from "framer-motion";
/*import {useAudio} from "@/context/AudioContext";*/

interface UseAudioOnScrollProps {
    /*progress: MotionValue<number>;
    range: [number, number, number, number];*/
    progress: MotionValue<number> | number;
    audioUrl?: string;
}

/*export function useAudioOnScroll({progress, range, audioUrl}: UseAudioOnScrollProps) {*/
export function useAudioOnScroll({progress, audioUrl}: UseAudioOnScrollProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    /*const {isMuted} = useAudio();*/
    /*const volume = useTransform(progress, range, [0, 0.7, 0.7, 0]);*/
    const wasPlayingRef = useRef(false);
    useEffect(() => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.loop = true;
            audioRef.current = audio;
        }
        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        }
    }, [audioUrl]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (typeof progress === 'number' && progress > 0.1 && progress < 0.9) {
            if (!wasPlayingRef.current) {
                audio.currentTime = 0;
                audio.play().catch(e => console.error("Error al reproducir el audio: ", e));
                wasPlayingRef.current = true;
            }
            audio.volume = Math.min(1, progress * 2) * Math.min(1, (1 - progress) * 2) * 0.7;
        } else {
            if (wasPlayingRef.current) {
                audio.pause();
                wasPlayingRef.current = false;
            }
        }
    }, [progress]);

    return audioRef;
    /*useEffect(() => {
/!*        const unsubscribe = volume.on("change", (latestVolume) => {
            const audio = audioRef.current;
            if (!audio) return;*!/
        const audio = audioRef.current;
        if (!audio) return;

/!*            if (isMuted) {
                audio.pause();
                wasPlayingRef.current = false;
                return;
            }*!/


            if (latestVolume > 0) {
                if (!wasPlayingRef.current) {
                    audio.currentTime = 0;
                    audio.play().catch(e => console.error("Error al reproducir el audio: ", e));
                    wasPlayingRef.current = true;
                }
                audio.volume = latestVolume;
            } else {
                if (wasPlayingRef.current) {
                    audio.pause();
                    wasPlayingRef.current = false;
                }
            }

/!*            if (latestVolume > 0 && audio.paused) {
                audio.play().catch(e => console.error("Error al reproducir el audio: ", e));
            }
            audio.volume = latestVolume;*!/
        });
        return () => unsubscribe();
    }, [volume, isMuted]);*/

/*    useEffect(() => {
        if (isMuted) {
            audioRef.current?.pause();
        }
    }, [isMuted]);*/
}