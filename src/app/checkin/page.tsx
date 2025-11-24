"use client";

import {useState, useEffect} from "react";
import {Scanner} from "@yudiel/react-qr-scanner";

const CHECKIN_PASSWORD = "1234";

interface ScanResult {
    status: 'success' | 'error' | 'already_checked_in' | 'not_found' | 'idle';
    message: string;
    guestName?: string;
    tickets?: number;
    isException?: boolean;
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
    const [scanResult, setScanResult] = useState<ScanResult>({ status: 'idle', message: 'Escanea el código QR del boleto con la cámara de tu teléfono.'});
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkedInGuests, setCheckedInGuests] = useState<CheckedInGuest[]>([]);
    const [isListLoading, setIsListLoading] = useState(true);
    const [isScannerActive, setIsScannerActive] = useState(false);
    const [totalGuests, setTotalGuests] = useState(0);

    const fetchCheckedInGuests = async () => {
        try {
            const data = await fetch('/api/netlify/functions/get-checkedin-guests').then((response) => response.json());
            setCheckedInGuests(data.checkedInGuests);
            setTotalGuests(data.totalGuests);
        } catch (error) {
            console.error("Error fetching checked-in list: ", error);
        } finally {
            setIsListLoading(false);
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('checkin_authenticated') === 'true') {
            setIsAuthenticated(true);
        }
        if (isAuthenticated) {
            fetchCheckedInGuests();
        }
    }, [isAuthenticated]);

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
                        tickets: data.guest?.ConfirmedTickets,
                        isException: data.guest?.SpecialException
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
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
                <form onSubmit={handlePasswordSubmit} className="bg-gray-50 dark:bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-sm h-[40vh]">
                    <div className="flex flex-col justify-evenly items-center h-full">
                        <h2 className="text-3xl font-bold p-4 text-center">Boda A&A</h2>
                        <div className="w-full flex flex-col items-center justify-between gap-4">
                            <div className="w-full">
                                <label htmlFor="password" className="block text-slate-700 dark:text-slate-100">Contraseña:</label>
                                <input type="password" pattern="[0-9]*" inputMode="numeric" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full text-center py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-200"/>
                            </div>
                            {error && <p className="text-red-500 text-base m-0 p-0">{error}</p>}
                            <button type="submit" className="w-1/2 font-semibold bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition-colors">Entrar</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    const resultColors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        already_checked_in: 'bg-yellow-500 text-slate-800',
        not_found: 'bg-red-500',
        idle: 'bg-slate-500 text-slate-100'
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-gray-900  dark:text-slate-200">
            <div className="w-full lg:flex lg:gap-8 lg:items-start">
                <div className="lg:w-1/2 flex flex-col items-center">
                    <h1 className="text-3xl font-bold leading-relaxed">Check-in boda A&A</h1>
                    <h4 className="text-xl font-semibold">28/03/2026</h4>
                    <div className="w-full max-w-sm aspect-square overflow-hidden rounded-lg shadow-lg mb-4 bg-gray-800">
                        {isScannerActive ? (
                            <Scanner
                                onScan={(result) => handleScan(result[0].rawValue)}
                                onError={(error) => console.error(error)}
                                constraints={{facingMode: 'environment'}}
                                scanDelay={100}
                                paused={!isScannerActive}
                                sound={isScannerActive}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-100">
                                <p className="font-semibold text-xl text-center">Active el escaner para registrar a invitado</p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center items-center w-full py-2">
                        {isScannerActive ? (
                            <button className="min-w-1/2 bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-colors" onClick={() => setIsScannerActive(false)}>Desactivar escaner</button>
                        ) : (
                            <button className="min-w-1/2 bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium transition-colors" onClick={() => setIsScannerActive(true)}>Activar escaner</button>
                        )}
                    </div>
                    <div className={`w-full max-w-md p-4 rounded-lg text-center transition-colors duration-300 ${resultColors[scanResult.status]}`}>
                        <p className="text-lg font-semibold">{scanResult.message}</p>
                        {scanResult.guestName && (
                            <div className="">
                                <p className="text-xl font-bold">{scanResult.guestName}</p>
                                <p className="text-lg">{scanResult.tickets} pases</p>
                            </div>
                        )}
                        {scanResult.isException && (
                            <div className="mt-2 p-2 bg-blue-100 text-blue-800 rounded-md border border-blue-300">
                                <p className="font-bold text-lg">Atención: Invitado con excepción aceptada.</p>
                            </div>
                        )}
                    </div>
                </div>
                <hr className="w-full lg:hidden my-4 border-t border-slate-700 dark:border-slate-300" />
                <div className="lg:w-1/2 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-4 text-center">Invitados registrados ({checkedInGuests.length}) de ({totalGuests})</h2>
                    <div className="bg-slate-800 text-slate-100 rounded-lg shadow-lg p-4 max-h-[60vh] overflow-y-auto w-full">
                        {isListLoading ? <p>Cargando lista...</p> : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-600">
                                        <th className="px-2">Invitado</th>
                                        <th className="px-2">Boletos confirmados</th>
                                        <th className="px-2">Fecha y hora de check-in</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {checkedInGuests.map((guest, index) => (
                                        <tr key={index} className="border-b border-slate-700">
                                            <td className="p-2">{guest.name}</td>
                                            <td className="p-2 text-center">{guest.tickets}</td>
                                            <td className="p-2 text-center">{guest.time ? new Date(guest.time).toLocaleDateString() + " " + new Date(guest.time).toLocaleTimeString() : '-'}</td>
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