"use client";

import {useState} from "react";
import Image from "next/image";
import HighlightedText from "@/components/HighlightedText";

const imagesGallery = [
    {
        id: 1,
        imageUrl: '/images/std_gallery_1.jpg',
        alt: 'Foto de la galería 1'
    },
    {
        id: 2,
        imageUrl: '/images/std_gallery_2.jpg',
        alt: 'Foto de la galería 2'
    },
    {
        id: 3,
        imageUrl: '/images/std_gallery_3.jpg',
        alt: 'Foto de la galería 3'
    },
    {
        id: 4,
        imageUrl: '/images/std_gallery_4.jpg',
        alt: 'Foto de la galería 4'
    },
    {
        id: 5,
        imageUrl: '/images/std_gallery_5.jpg',
        alt: 'Foto de la galería 5'
    },
    {
        id: 6,
        imageUrl: '/images/std_gallery_6.jpg',
        alt: 'Foto de la galería 6'
    },
    {
        id: 7,
        imageUrl: '/images/std_gallery_7.jpg',
        alt: 'Foto de la galería 7'
    },
    {
        id: 8,
        imageUrl: '/images/std_gallery_8.jpg',
        alt: 'Foto de la galería 8'
    },
    {
        id: 9,
        imageUrl: '/images/std_gallery_9.jpg',
        alt: 'Foto de la galería 9'
    },
    {
        id: 10,
        imageUrl: '/images/std_gallery_10.jpg',
        alt: 'Foto de la galería 10'
    },
    {
        id: 11,
        imageUrl: '/images/std_gallery_11.jpg',
        alt: 'Foto de la galería 11'
    },
    {
        id: 12,
        imageUrl: '/images/std_gallery_12.jpg',
        alt: 'Foto de la galería 12'
    }
];

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const openModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div id="gallery" className="body-font">
            <div className="relative">
                <Image src="/images/corner_flowers.png" alt="Flores en la esquina" width={150} height={150} className="absolute -top-2 lg:top-0 left-0 m-0 p-0 rotate-90 w-1/5 lg:w-1/12 saturate-75" unoptimized={true}/>
            </div>
            <HighlightedText className="text-3xl font-bold mb-6 text-center">Galería</HighlightedText>
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid grid-cols-3 gap-1 lg:gap-2 py-4 lg:py-12">
                    {imagesGallery.map((image) => (
                        <div key={image.id} className="relative aspect-square cursor-pointer overflow-hidden group transition-transform duration-200 active:scale-95" onClick={() => openModal(image.imageUrl)}>
                            <Image src={image.imageUrl} alt={image.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-110" sizes="(max-width: 768px) 33vw, 33vw" />
                        </div>
                    ))}
                </div>
                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 transition-opacity duration-300" onClick={closeModal}>
                        <button className="absolute bottom-4 right-4 hover:cursor-pointer scale-150 border border-white/50" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                                 className="text-white" viewBox="0 0 16 16">
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                        <div className="relative max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
                            <Image src={selectedImage} alt="Imagen seleccionada" width={1200} height={800}
                                   className="object-contain w-auto h-auto max-h-[90vh]"/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}