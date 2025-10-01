"use client";

import {ReactNode} from "react";

interface AccordionItemProps {
    title: string;
    children: ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

export function AccordionItem({title, children, isOpen, onClick}: AccordionItemProps) {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <h2>
                <button
                    type="button"
                    className="flex items-center justify-between w-full p-4 font-medium text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={onClick}
                    aria-expanded={isOpen}
                >
                    <span className="text-xl italic">{title}</span>
                    <svg
                        className={`w-3 h-3 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                    </svg>
                </button>
            </h2>
            <div className={`p-5 border-t-0 border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
                {children}
            </div>
        </div>
    );
}