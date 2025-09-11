"use client";

import {useState, useEffect} from "react";
import {Scanner} from "@yudiel/react-qr-scanner";

/*const CHECKIN_PASSWORD = process.env.NEXT_PUBLIC_CHECKIN_PASS;*/
const CHECKIN_PASSWORD = "1234";

interface ScanResult {
    status: 'success' | 'error' | 'already_checked_in' | 'not_found' | 'idle';
    message: string;
    guestName?: string;
    tickets?: number;
}

interface CheckedInGuest {
    name?: string;
    tickets?: number;
    time?: string;
}

export default function CheckinPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [scanResult, setScanResult] = useState<ScanResult>({ status: 'idle', message: 'Apunta la cámara al código QR del boleto.'});
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkedInGuests, setCheckedInGuests] = useState<CheckedInGuest[]>([])
    const [isListLoading, setIsListLoading] = useState(true);

    const fetchCheckedInGuests = async () => {
        try {
            const response = await fetch('/api/netlify/functions/get-checkedin-guests');
            const data = await response.json();
            setCheckedInGuests(data);
        } catch (error) {
            console.error("Error fetching checked-in list: ", error);
        } finally {
            setIsListLoading(false);
        }
    }

    useEffect(() => {
        const isAuthenticatedInSession = sessionStorage.getItem('checkin_authenticated') === 'true';
        if (isAuthenticatedInSession) {
            setIsAuthenticated(true);
            fetchCheckedInGuests();
        }
    }, []);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password === CHECKIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
            sessionStorage.setItem('checkin_authenticated', 'true');
        } else {
            setError('Contraseña incorrecta');
        }
    };

    const handleScan = async (scannedText: string) => {
        if (scannedText && !isProcessing) {
            setIsProcessing(true);
            setScanResult({status: 'idle', message: 'Procesando...'});

            try {
                const guestId = scannedText;

                const response = await fetch('/api/netlify/functions/checkin-guest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({guestId})
                });

                const data = await response.json();

                if (!response.ok) {
                    setScanResult({status: 'error', message: data.message || 'Error desconocido.'});
                } else {
                    setScanResult(({
                        status: data.status,
                        message: data.message,
                        guestName: data.guest?.FullName,
                        tickets: data.guest?.ConfirmedTickets
                    }));
                    fetchCheckedInGuests();
                }

            } catch (error) {
                console.error(error);
                setScanResult({status: 'error', message: 'El código QR no es válido o no se pudo procesar.'})
            } finally {
                setTimeout(() => setIsProcessing(false), 3000);
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-100">
                <form onSubmit={handlePasswordSubmit} className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-4 text-center">Acceso Check-in</h2>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-slate-700 mb-2">Contraseña</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"/>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition-colors">Entrar</button>
                </form>
            </div>
        )
    }

    const resultColors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        already_checked_in: 'bg-yellow-500',
        not_found: 'bg-red-500',
        idle: 'bg-slate-700'
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
            <div className="w-full lg:flex lg:gap-8 lg:items-start">
                <div className="lg:w-1/2 flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4">Check-in del evento</h1>
                    <div className="w-full max-w-sm aspect-square overflow-hidden rounded-lg shadow-lg mb-4 bg-gray-800 border border-red-500">
                        <Scanner
                            onScan={(result) => handleScan(result[0].rawValue)}
                            onError={(error) => console.error(error)}
                            constraints={{facingMode: 'environment'}}
                            scanDelay={300} />
                    </div>
                    <div className={`w-full max-w-md p-4 rounded-lg text-center transition-colors duration-300 ${resultColors[scanResult.status]}`}>
                        <p className="text-lg font-semibold">{scanResult.message}</p>
                        {scanResult.guestName && (
                            <div className="mt-2">
                                <p className="text-2xl font-bold">{scanResult.guestName}</p>
                                <p className="text-md">{scanResult.tickets} pases</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                    <h2 className="text-2xl font-bold mb-4 text-center">Invitados registrados ({checkedInGuests.length})</h2>
                    <div className="bg-slate-800 rounded-lg shadow-lg p-4 max-h-[60vh] overflow-y-auto">
                        {isListLoading ? <p>Cargando lista...</p> : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-600">
                                        <th className="p-2">Nombre</th>
                                        <th className="p-2">Pases</th>
                                        <th className="p-2">Hora</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {checkedInGuests.map((guest, index) => (
                                        <tr key={index} className="border-b border-slate-700">
                                            <td className="p-2">{guest.name}</td>
                                            <td className="p-2 text-center">{guest.tickets}</td>
                                            <td className="p-2 text-center">{guest.time ? new Date(guest.time).toLocaleTimeString('es-MX') : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}