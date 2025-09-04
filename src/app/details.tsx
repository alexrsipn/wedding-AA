export default function Details() {
    return (
        <>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                    <div
                        className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6113.944227080422!2d-98.96296843954751!3d18.81423064923412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce6f0f1f30e757%3A0x7c6a8f38f4134798!2zSmFyZMOtbiBkZSBFdmVudG9zIOKAnEVsIEVuY2FudG_igJ0!5e0!3m2!1ses-419!2smx!4v1756964578289!5m2!1ses-419!2smx"
                            width="100%" height="100%" className="absolute inset-0" title="El Encanto" allowFullScreen={false} loading="lazy" marginHeight={0} marginWidth={0} scrolling="no"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                            <div className="lg:w-1/2 px-6">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                                <p className="mt-1">Photo booth tattooed prism, portland taiyaki hoodie neutra
                                    typewriter</p>
                            </div>
                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                                <a className="text-indigo-500 leading-relaxed">example@email.com</a>
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                                <p className="leading-relaxed">123-456-7890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}