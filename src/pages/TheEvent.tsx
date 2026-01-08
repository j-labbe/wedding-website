import PageTransition from '../components/PageTransition';

function TheEvent() {

    return (
        <PageTransition>
            <article>
                <title>The Event - Sammy and Jack</title>
            </article>
            <div className="flex justify-center flex-col items-center px-5">
                <div className="max-w-2xl mx-auto mt-5 space-y-10">
                    <div>
                        <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-center">The Night Before</h2>
                        <p className="text-md md:text-lg leading-6 mb-3">
                            Join us for a cocktail hour to kickoff the festivities! Light hors d'oeuvres will be served. Cash bar.
                        </p>
                        <p className="text-md md:text-lg leading-6">
                            <span className="font-semibold">When:</span> 6–8pm
                        </p>
                        <p className="text-md md:text-lg leading-6">
                            {/* <span className="font-semibold">Where:</span> The Lobster Bar - 31 Bowens Wharf Newport, RI 02840 */}
                            <span className="font-semibold">Where:</span> Location to be announced soon!
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-center">The Wedding Day</h2>
                        <p className="text-md md:text-lg leading-6 mb-4">
                            <span className="font-semibold">Location:</span> Oceancliff Hotel - 65 Ridge Rd, Newport, RI 02840
                        </p>
                        <div className="space-y-2">
                            <p className="text-md md:text-lg leading-6">
                                <span className="font-semibold">5:30–6:00pm</span> — Ceremony
                            </p>
                            <p className="text-md md:text-lg leading-6">
                                <span className="font-semibold">6:00–7:00pm</span> — Cocktail Hour
                            </p>
                            <p className="text-md md:text-lg leading-6">
                                <span className="font-semibold">7:00–11:00pm</span> — Reception
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}

export default TheEvent
