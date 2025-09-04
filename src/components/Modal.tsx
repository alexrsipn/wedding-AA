"use client";
import {motion, AnimatePresence} from "framer-motion";
import {ReactNode} from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    layoutId: string;
}

export const Modal = ({isOpen, onClose, children, layoutId}: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} onClick={onClose}>
                    <motion.div layoutId={layoutId} className="relative w-full max-w-lg bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}