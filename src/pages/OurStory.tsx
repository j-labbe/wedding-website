import PageTransition from '../components/PageTransition';
import PictureFrame from '../components/PictureFrame';
import TheEndAnimated from '../components/TheEndAnimated';
import FadeInOnScroll from '../components/FadeInOnScroll';

import IntroPic from "../assets/img/IMG_6366.jpg?lqip";
import GraduationPic from '../assets/img/45261FFB-F7C7-4944-804A-357E86961325.jpg?lqip';
import ProposalPic from "../assets/img/BGP_4719-3.JPEG?lqip";
import MovingPic from "../assets/img/IMG_5079.jpeg?lqip";
import RabbitPic from "../assets/img/IMG_1128.jpg?lqip";
import PSIPGroupPic from "../assets/img/IMG_20190824_142054.JPG?lqip";
import HHPPic from "../assets/img/IMG_4430.jpg?lqip";
import CongratsRA from "../assets/img/IMG_1418.jpeg?lqip";
import HawksGame from "../assets/img/IMG_1887.jpg?lqip";
import VacationPic from "../assets/img/IMG_0277.JPG?lqip";
import SurvivorPic from "../assets/img/IMG_4230.jpeg?lqip";
import LastPic from "../assets/img/IMG_3656.jpeg?lqip";
import CityHallPic from "../assets/img/IMG_6515.JPG?lqip";
import FutureMrsLabbe from "../assets/img/DSC08734.JPG?lqip";

function OurStory() {
    return (
        <PageTransition>
            <div className="flex justify-center flex-col items-center px-5">
                <FadeInOnScroll>
                    <h1 className="title md:text-5xl/20 text-4xl/15 mt-5 mb-5">Our Story</h1>
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <p className="drop-cap mt-10 mb-5 text-lg text-left leading-6 md:text-xl mx-auto max-w-xl line-height-sm">
                        It all began in August 2019, when our love first took flight. We were two freshmen at Saint Joseph's University, arriving early for the Philadelphia Service Immersion Program with no idea what was in store.
                    </p>
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <PictureFrame lqip={IntroPic} size="medium" alt="Sammy and Jack at SJU" />
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        As fate would have it, we were placed in the same group and spent the week learning about Jesuit values and painting walls around Philly. Over the weeks and months that followed, we formed a special bond, first as friends, and then something more as we navigated the ups and downs of college life. On October 7, 2019, we officially started dating!
                    </p>
                </FadeInOnScroll>

                <FadeInOnScroll className="flex flex-row flex-wrap justify-center gap-4 my-5">
                    <PictureFrame lqip={PSIPGroupPic} size="small" alt="Sammy and Jack's first week at SJU" />
                    <PictureFrame lqip={CityHallPic} size="small" alt="Sammy and Jack at SJU basketball game" />
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        Our four years at SJU brought a global pandemic, long-distance stretches, RA life, and tough courses, but it was the late-night Domino's runs, trips into the city, and endless laughter that shaped a bond perfectly meant for us.
                    </p>
                </FadeInOnScroll>

                <FadeInOnScroll className="flex flex-row flex-wrap justify-center gap-4 my-5">
                    <PictureFrame lqip={HHPPic} size="small" alt="Sammy and Jack at an HHP event" />
                    <PictureFrame lqip={CongratsRA} size="small" alt="Sammy and Jack at the beach" />
                    <PictureFrame lqip={HawksGame} size="small" alt="Sammy and Jack in the city" />
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        After graduating in Spring 2023, we moved to Bucks County, PA to start our careers and welcomed Luna and Leo into our little family.
                    </p>
                </FadeInOnScroll>

                <FadeInOnScroll className="flex flex-row flex-wrap justify-center gap-4 my-5">
                    <PictureFrame lqip={GraduationPic} size="small" alt="Sammy and Jack Graduation" />
                    <PictureFrame lqip={MovingPic} size="small" alt="Sammy and Jack moving" />
                    <PictureFrame lqip={RabbitPic} size="small" alt="Luna and Leo" />
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        When we're not working, you can usually find us playing pickleball, cruising through the Caribbean, or hunting down the best snacks.
                    </p>
                </FadeInOnScroll>

                <FadeInOnScroll className="flex flex-row flex-wrap justify-center gap-4 my-5">
                    <PictureFrame lqip={VacationPic} size="small" alt="Sammy and Jack with Luna and Leo" />
                    <PictureFrame lqip={SurvivorPic} size="small" alt="Sammy and Jack on vacation" />
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        On June 25, 2025, Jack proposed at sunset while we were sailing through Newport Harbor.
                    </p>
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <PictureFrame lqip={ProposalPic} size="medium" alt="Sammy and Jack's engagement" />
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        As we approach our wedding day, we're endlessly grateful for the family and friends who have supported us along the way. We can't wait to celebrate with you in beautiful Newport, RI. Here's to officially becoming hawkmates!
                    </p>
                </FadeInOnScroll>

                <FadeInOnScroll className="flex flex-row flex-wrap justify-center gap-4 my-5">
                    <PictureFrame lqip={LastPic} size="small" alt="Sammy and Jack" />
                    <PictureFrame lqip={FutureMrsLabbe} size="small" alt="Sammy and Jack" />
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <TheEndAnimated className="w-full mt-10" style={{ color: "#b6babbff", maxWidth: "12rem" }} />
                </FadeInOnScroll>

            </div>
        </PageTransition>
    )
}

export default OurStory
