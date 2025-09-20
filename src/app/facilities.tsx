"use client";

import HighlightedText from "@/components/HighlightedText";
import Image from "next/image";

export default function Facilities() {
    return (
        <>
            <section id="rvsp" className="text-gray-600">
                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -top-4 lg:top-0 left-0 m-0 p-0 rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>
                <div className="px-4 mx-auto flex flex-col">
                    <HighlightedText className="text-3xl lg:text-2xl text-center font-medium title-font mb-4 text-gray-900 dark:text-white">Recomendaciones</HighlightedText>
                    <div className="flex justify-center items-center p-40">
                        <p>Sección en construcción</p>
                    </div>
                </div>
                <div className="relative">
                    <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute bottom-0 right-0 m-0 p-0 -rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
                </div>
            </section>
        </>
    );
}