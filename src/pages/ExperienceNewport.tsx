import PageTransition from '../components/PageTransition';
import FadeInOnScroll from '../components/FadeInOnScroll';
import InfoCard from '../components/InfoCard';

function ExperienceNewport() {
    const thingsToSeeAndDo = [
        'Cliffwalk',
        'Mansion tours - Breakers, Elm, Marble House',
        'Shop in the wharfs',
        'Beach Day',
        'Brenton Point',
        'Rent a Buggy',
        'Take a scenic drive along Ocean Drive',
    ];

    const placesToEat = [
        '22 Bowens',
        'The Lobster Bar',
        'Clark Cooke House',
        'Midtown Oyster Bar',
        'Brick Alley Pub and Restaurant',
    ];

    return (
        <PageTransition>
            <div className="flex justify-center flex-col items-center px-1 sm:px-5">
                <FadeInOnScroll>
                    <h1 className="title md:text-5xl/20 text-4xl/15 mt-5 mb-5">Experience Newport</h1>
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <p className="subtitle font-laluxes-noligatures text-xl md:text-2xl text-center mb-12 max-w-3xl mx-auto">
                        Our favorite things to do in the sailing capital of the world!
                    </p>
                </FadeInOnScroll>

                <div className="max-w-4xl mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <FadeInOnScroll>
                        <InfoCard title="Things to See and Do" items={thingsToSeeAndDo} />
                    </FadeInOnScroll>

                    <FadeInOnScroll>
                        <InfoCard title="Places to Eat" items={placesToEat} />
                    </FadeInOnScroll>
                </div>
            </div>
        </PageTransition>
    )
}

export default ExperienceNewport
