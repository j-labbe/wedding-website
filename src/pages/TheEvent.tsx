import PageTransition from '../components/PageTransition';
import DecorativeAnchor from '../components/DecorativeAnchor';
import DecorativeDivider from '../components/DecorativeDivider';
import FadeInOnScroll from '../components/FadeInOnScroll';

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
                        <h3 className="text-xl md:text-xl mb-3">Wednesday, June 23, 2027</h3>
                        <p className="text-md md:text-lg leading-6 mb-3">
                            Join us for a welcome party to kickoff the festivities! Light hors d'oeuvres will be served. Cash bar.
                        </p>
                        <p className="text-md md:text-lg leading-6 mb-2">
                            <span className="font-semibold">Location:</span> The Reef - <a href="https://maps.google.com/?q=10 Howard Wharf Newport, RI 02840" target="_blank" rel="noopener noreferrer" className="underline">10 Howard Wharf Newport, RI 02840</a>
                        </p>
                        <p className="text-md md:text-lg leading-6">
                            <span className="font-semibold">When:</span> 6-9pm
                        </p>
                    </div>



                    <div>
                        <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-center">The Wedding Day</h2>
                        <h3 className="text-xl md:text-xl mb-3">Thursday, June 24, 2027</h3>
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

                <FadeInOnScroll className="mt-20 text-center">
                    <DecorativeDivider>
                        <DecorativeAnchor />
                    </DecorativeDivider>
                </FadeInOnScroll>
            </div>
        </PageTransition>
    )
}

export default TheEvent
