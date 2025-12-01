"use client";

import { useState } from "react";
import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary";
import { useGuest } from "@/context/GuestContext";

const EVENT_DATE = '2026-03-28';

const isEventActive = () => {
    const today = new Date('2026-03-28');
    const eventDate = new Date(EVENT_DATE);
    const endDate = new Date(eventDate);
    endDate.setDate(eventDate.getDate() + 2);
    return today >= eventDate && today <= endDate;
};

export default function LibraryPage() {
    const { guest } = useGuest();
    const [isPublic, setIsPublic] = useState(true);
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: ''})

    if (!isEventActive()) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-serif mb-4">Galería de recuerdos de la boda Andrea & Alexis</h1>
                <p>Esta sección estará disponible durante el evento para que compartas tus mejores momentos en nuestra boda.</p>
                <p>¡Vuelve pronto!</p>
            </div>
        );
    }

    if (!guest || !guest.confirmed) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-3xl font-serif mb-4">Acceso restringido.</h1>
                <p>Esta acción es solo para invitados confirmados.</p>
            </div>
        );
    }

    const handleUploadSuccess: CldUploadWidgetProps['onSuccess'] = async (result, {widget}) => {
        if (typeof result.info !== 'object' || !result.info.secure_url) {
            return;
        }

        const {secure_url, resource_type} = result.info;

        try {
            const saveResponse = await fetch('/api/netlify/functions/save-media', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    guestId: guest.id,
                    mediaUrl: secure_url,
                    isPublic,
                    mediaType: resource_type
                }),
            });
            const saveData = await saveResponse.json();
            setStatus({ type: saveData.status, message: saveData.message });
            widget.close();
        } catch (error) {
            setStatus({ type: 'error', message: `No se pudo guardar la información del archivo: ${error}`})
        }

        setTimeout(() => setStatus({ type: 'idle', message: ''}), 5000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-serif mb-4">Comparte tus momentos</h1>
            <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="mt-4 flex items-center">
                    <input type="checkbox" id="isPublic" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                    <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Momento público para todos los invitados</label>
                </div>
            </div>
            <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params" onSuccess={handleUploadSuccess} options={{sources: ['local', 'camera'], multiple: false}}>
                {({open}) => {
                    return (
                        <button onClick={() => open()} className="mt-6 w-full bg-sky-700 hover:bg-sky-800 text-white font-bold py-3 px-4 rounded-lg">
                            Subir foto o video
                        </button>
                    )
                }}
            </CldUploadWidget>
            {status.message && <p className={`mt-4 text-center font-semibold ${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>{status.message}</p>}
        </div>
    );
}