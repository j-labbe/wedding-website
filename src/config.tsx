import type { SiteConfig } from "./types/Config";

import PictureFrame from "./components/PictureFrame";

// Our Story
import IntroPic from "./assets/img/IMG_6366.jpg?lqip";
import GraduationPic from './assets/img/45261FFB-F7C7-4944-804A-357E86961325.jpg?lqip';
import ProposalPic from "./assets/img/BGP_4719-3.JPEG?lqip";
import MovingPic from "./assets/img/IMG_5079.jpeg?lqip";
import RabbitPic from "./assets/img/IMG_1128.jpg?lqip";
import PSIPGroupPic from "./assets/img/IMG_20190824_142054.JPG?lqip";
import HHPPic from "./assets/img/IMG_4430.jpg?lqip";
import CongratsRA from "./assets/img/IMG_1418.jpeg?lqip";
import HawksGame from "./assets/img/IMG_1887.jpg?lqip";
import VacationPic from "./assets/img/IMG_0277.JPG?lqip";
import SurvivorPic from "./assets/img/IMG_4230.jpeg?lqip";
import LastPic from "./assets/img/IMG_3656.jpeg?lqip";
import CityHallPic from "./assets/img/IMG_6515.JPG?lqip";
import FutureMrsLabbe from "./assets/img/DSC08734.JPG?lqip";
import TheEndAnimated from './components/TheEndAnimated';

// The Cast
import Jack from './assets/img/jack.jpeg?lqip';
import Sammy from "./assets/img/IMG_0068.JPG?lqip";
import Paul from "./assets/img/paul.jpeg?lqip";
import Brenda from './assets/img/brenda.JPG?lqip';
import Tom from './assets/img/tom.jpg?lqip';
import Beth from './assets/img/beth.jpg?lqip';
import Morgan from './assets/img/Morgan.jpg?lqip';
import JGRAY from "./assets/img/10AAE7B2-2471-46E1-B21D-000071BBF24A.JPEG?lqip";
import Casey from "./assets/img/casey_pic.jpeg?lqip";
import Eve from "./assets/img/IMG_6051.jpg?lqip";
import Peter from "./assets/img/peter.JPEG?lqip";
import Bacon from "./assets/img/bacon.jpeg?lqip";
import Tommy from "./assets/img/tommy.jpeg?lqip";
import Nick from "./assets/img/IMG_2972.jpeg?lqip";
import Bailey from "./assets/img/bailey.jpeg?lqip";
import Sara from "./assets/img/sara.JPG?lqip";
import Leo from "./assets/img/IMG_2423.jpg?lqip";
import Luna from "./assets/img/IMG_1131.jpg?lqip";
import Placeholder from './assets/img/placeholder.png?lqip';

// Experience Newport
import Bowens from './assets/img/22b.jpg?lqip';
import LobsterBar from './assets/img/npt-lobsterbar.jpg?lqip';
import BrickAlleyPub from './assets/img/npt-bap.jpg?lqip';
import Midtown from './assets/img/npt-mo.jpg?lqip';
import ClakeCooke from './assets/img/clake-cooke.jpg?lqip';
import TheBreakers from './assets/img/the-breakers.jpg?lqip';
import CliffWalk from './assets/img/npt-cw.jpg?lqip';
import Thames from './assets/img/npt-thames.jpg?lqip';
import Sailing from './assets/img/sailing.jpg?lqip';
import BrentonPoint from './assets/img/npt-brtn.jpg?lqip';
import Buggy from './assets/img/buggy.jpeg?lqip';
import { ForkKnifeIcon, SailboatIcon } from '@phosphor-icons/react';

// Q & A
import { ChurchIcon, BedIcon, ShirtFoldedIcon, GiftIcon } from "@phosphor-icons/react";

const config: SiteConfig = {
    site: {
        title: "Sammy and Jack - 6/24/2027",
        description: "Join us in celebrating our wedding in Newport, RI on June 24, 2027!",
        url: "https://sammyandjack.com"
    },
    pages: [
        {
            id: "home",
            name: "",
            content: {
                title: "Sammy and Jack",
                subtitle: "June 24, 2027",
                location: "Newport, RI • OceanCliff Hotel",
                bottomText: "Welcome to Our Love Story"
            }
        },
        {
            id: "our-story",
            name: "Our Story",
            content: {
                title: "Our Story",
                sections: [
                    <h1 className="title md:text-5xl/20 text-4xl/15 mt-5 mb-5">Our Story</h1>,

                    <p className="drop-cap mt-10 mb-5 text-lg text-left leading-6 md:text-xl mx-auto max-w-xl line-height-sm">
                        It all began in August 2019, when our love first took flight. We were two freshmen at Saint Joseph's University, arriving early for the Philadelphia Service Immersion Program with no idea what was in store.
                    </p>,

                    <PictureFrame lqip={IntroPic} size="medium" alt="Sammy and Jack at SJU" />,

                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        As fate would have it, we were placed in the same group and spent the week learning about Jesuit values and painting walls around Philly. Over the weeks and months that followed, we formed a special bond, first as friends, and then something more as we navigated the ups and downs of college life. On October 7, 2019, we officially started dating!
                    </p>,

                    <div className="flex flex-row flex-wrap justify-center gap-4 my-5">
                        <PictureFrame lqip={PSIPGroupPic} size="small" alt="Sammy and Jack's first week at SJU" />
                        <PictureFrame lqip={CityHallPic} size="small" alt="Sammy and Jack at SJU basketball game" />
                    </div>,

                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        Our four years at SJU brought a global pandemic, long-distance stretches, RA life, and tough courses, but it was the late-night Domino's runs, trips into the city, and endless laughter that shaped a bond perfectly meant for us.
                    </p>,

                    <div className="flex flex-row flex-wrap justify-center gap-4 my-5">
                        <PictureFrame lqip={HHPPic} size="small" alt="Sammy and Jack at an HHP event" />
                        <PictureFrame lqip={CongratsRA} size="small" alt="Sammy and Jack at the beach" />
                        <PictureFrame lqip={HawksGame} size="small" alt="Sammy and Jack in the city" />
                    </div>,

                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        After graduating in Spring 2023, we moved to Bucks County, PA to start our careers and welcomed Luna and Leo into our little family.
                    </p>,

                    <div className="flex flex-row flex-wrap justify-center gap-4 my-5">
                        <PictureFrame lqip={GraduationPic} size="small" alt="Sammy and Jack Graduation" />
                        <PictureFrame lqip={MovingPic} size="small" alt="Sammy and Jack moving" />
                        <PictureFrame lqip={RabbitPic} size="small" alt="Luna and Leo" />
                    </div>,

                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        When we're not working, you can usually find us playing pickleball, cruising through the Caribbean, or hunting down the best snacks.
                    </p>,

                    <div className="flex flex-row flex-wrap justify-center gap-4 my-5">
                        <PictureFrame lqip={VacationPic} size="small" alt="Sammy and Jack with Luna and Leo" />
                        <PictureFrame lqip={SurvivorPic} size="small" alt="Sammy and Jack on vacation" />
                    </div>,

                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        On June 25, 2025, Jack proposed at sunset while we were sailing through Newport Harbor.
                    </p>,

                    <PictureFrame lqip={ProposalPic} size="medium" alt="Sammy and Jack's engagement" />,

                    <p className="max-w-2xl mx-auto my-5 text-md md:text-lg leading-6">
                        As we approach our wedding day, we're endlessly grateful for the family and friends who have supported us along the way. We can't wait to celebrate with you in beautiful Newport, RI. Here's to officially becoming hawkmates!
                    </p>,

                    <div className="flex flex-row flex-wrap justify-center gap-4 my-5">
                        <PictureFrame lqip={LastPic} size="small" alt="Sammy and Jack" />
                        <PictureFrame lqip={FutureMrsLabbe} size="small" alt="Sammy and Jack" />
                    </div>,

                    <TheEndAnimated className="w-full mt-10" style={{ color: "#b6babbff", maxWidth: "12rem" }} />
                ]
            }
        },
        {
            id: "the-cast",
            name: "The Cast",
            content: {
                title: "The Cast",
                members: [
                    {
                        role: "The Couple",
                        left: {
                            name: "Sammy",
                            role: "The Bride",
                            image: Sammy,
                            funFact: "Jack first met my Mom in palm tree swimtrunks in the middle of the winter! (He claims he had no clean laundry!)",
                        },
                        right: {
                            name: "Jack",
                            role: "The Groom",
                            image: Jack,
                            funFact: "Sammy had her first drink in my freshman dorm room, a raspberry White Claw! (She called it a \"raincloud in her head\")"
                        }
                    },
                    {
                        role: "The Parents",
                        left: {
                            name: "Beth",
                            role: "Mother of the Bride",
                            image: Beth,
                            funFact: "I applied to Survivor and dream of being casted one day!"
                        },
                        right: {
                            name: "Tom",
                            role: "Father of the Bride",
                            image: Tom,
                            funFact: "I enjoy playing pickleball with family!"
                        }
                    },
                    {
                        role: "The Parents",
                        left: {
                            name: "Brenda",
                            role: "Mother of the Groom",
                            image: Brenda,
                            funFact: "My first date with Paul was a Rolling Stones concert at Foxboro Stadium, center stage, row #10."
                        },
                        right: {
                            name: "Paul",
                            role: "Father of the Groom",
                            image: Paul,
                            funFact: "After growing up playing hockey in a cold rink and later coaching my kid's teams, I now spend as much time as possible at the beach in Florida."
                        }
                    },
                    {
                        role: "Bridal Party & Groomsmen",
                        left: {
                            name: "Juliana",
                            role: "Maid of Honor",
                            image: JGRAY,
                            funFact: "I've been to 100 concerts! (Some of which I organized at Penn State!)"
                        },
                        right: {
                            name: "Peter",
                            role: "Best Man",
                            image: Peter,
                            funFact: "I rescued a cat named Nate in 2022!"
                        }
                    },
                    {
                        role: "Bridal Party & Groomsmen",
                        left: {
                            name: "Eve",
                            role: "Bridesmaid",
                            image: Eve,
                            funFact: "I conquered the Philly Half Marathon!"
                        },
                        right: {
                            name: "Ryan",
                            role: "Groomsman",
                            image: Bacon,
                            funFact: "I played hockey at Worcester State as a goalie!"
                        }
                    },
                    {
                        role: "Bridal Party & Groomsmen",
                        left: {
                            name: "Morgan",
                            role: "Bridesmaid",
                            image: Morgan,
                            funFact: "I currently live in the Virgin Islands working as a dolphin trainer!"
                        },
                        right: {
                            name: "Chris",
                            role: "Groomsman",
                            image: Placeholder,
                            funFact: "Add a fun fact about Chris!"
                        }
                    },
                    {
                        role: "Bridal Party & Groomsmen",
                        left: {
                            name: "Casey",
                            role: "Bridesmaid",
                            image: Casey,
                            funFact: "My favorite animal is a groundhog! I even went to Punxsutawney once to celebrate Groundhog Day!"
                        },
                        right: {
                            name: "Nick",
                            role: "Groomsman",
                            image: Nick,
                            funFact: "I'm a triplet with my two other brothers, Ryan and Andrew!"
                        }
                    },
                    {
                        role: "Bridal Party & Groomsmen",
                        left: {
                            name: "Bailey",
                            role: "Bridesmaid",
                            image: Bailey,
                            funFact: "I play basketball for Gettysburg College!"
                        },
                        right: {
                            name: "Tommy",
                            role: "Groomsman",
                            image: Tommy,
                            funFact: "I collect sneakers and comics!"
                        }
                    },
                    {
                        role: "Bridal Party & Groomsmen",
                        left: {
                            name: "Sara",
                            role: "Bridesmaid",
                            image: Sara,
                            funFact: "I played youth hockey with my twin brother! Go bruins!"
                        },
                        right: {
                            name: "Placeholder",
                            role: "Groomsman",
                            image: Placeholder,
                            funFact: "Add a fun fact about Placeholder!"
                        }
                    },
                    {
                        role: "Pets",
                        left: {
                            name: "Luna",
                            role: "Bun of Honor",
                            image: Luna,
                            funFact: "I only eat locally grown lettuce!"
                        },
                        right: {
                            name: "Leo",
                            role: "Best Bun",
                            image: Leo,
                            funFact: "I love giving fist bumps!"
                        }
                    }
                ]
            }
        },
        {
            id: "the-event",
            name: "The Event",
            content: {
                title: "The Event"
            }
        },
        {
            id: "experience-newport",
            name: "Experience Newport",
            content: [
                {
                    id: 'eat',
                    category: 'Places to Eat',
                    navIcon: ForkKnifeIcon,
                    items: [
                        {
                            name: '22 Bowens',
                            description: 'Land and sea offerings in the heart of Newport. Sammy and Jack love the prime rib sandwich and chicken salads.',
                            image: Bowens,
                            link: 'https://22bowens.com'
                        },
                        {
                            name: 'The Lobster Bar',
                            description: 'Legendary lobster rolls and fresh seafood. Sammy and Jack visit here every time when in Newport.',
                            image: LobsterBar,
                            link: 'https://www.lobsterbarri.com'
                        },
                        {
                            name: "Brick Alley Pub",
                            description: "The classic pub experience in Newport with a wide menu. Sammy and Jack love the lobster mac and cheese. Great for large groups!",
                            image: BrickAlleyPub,
                            link: 'https://maps.app.goo.gl/w3KMLffv5eGhsZAEA'
                        },
                        {
                            name: "Midtown Oyster Bar",
                            description: "Some of the freshest seafood and oysters in Newport. Lobster rolls are great here, but Oysters are the star of the show!",
                            image: Midtown,
                            link: 'https://www.midtownoyster.com'
                        },
                        {
                            name: "Clake Cooke House",
                            description: "A charming spot with a cozy atmosphere and delicious New England fare. Known for its clam chowder and seafood dishes.",
                            image: ClakeCooke,
                            link: "https://www.clarkecooke.com"
                        }
                    ]
                },
                {
                    id: 'do',
                    category: 'Things to Do',
                    navIcon: SailboatIcon,
                    items: [
                        {
                            name: 'Mansion Tours',
                            description: 'Take a tour through historic Gilded Age mansions including The Breakers, The Elms, Marble House, and more.',
                            image: TheBreakers,
                            link: 'https://www.newportmansions.org/plan-a-visit/'
                        },
                        {
                            name: 'Cliff Walk',
                            description: 'A scenic walk along Newport\'s stunning coastline, passing by many of the famous mansions.',
                            image: CliffWalk,
                            link: 'https://sammyandjack.com/files/cliff-walk-map.pdf'
                        },
                        {
                            name: 'Thames Street Shopping',
                            description: 'Explore boutiques, galleries, and shops along Newport\'s main street.',
                            image: Thames,
                            link: undefined // hide link btn
                        },
                        {
                            name: 'Sailing & Harbor Tours',
                            description: 'Experience Newport\'s sailing heritage with a harbor tour or sailing excursion on Narragansett Bay. (Note: book in advance!)',
                            image: Sailing,
                            link: 'https://sightsailing.com'
                        },
                        {
                            name: 'Brenton Point State Park',
                            description: 'Enjoy stunning ocean views, picnicking, and kite flying at this beautiful state park located on the western tip of Newport. Food trucks are often visiting on weekends!',
                            image: BrentonPoint,
                            link: 'https://riparks.ri.gov/parks/brenton-point-state-park'
                        },
                        {
                            name: 'Rent a Beach Buggy',
                            description: 'Explore Newport in a fun and thrilling mini beach buggy!',
                            image: Buggy,
                            link: 'https://scooterworldri.com'
                        }
                    ]
                }
            ]
        },
        {
            id: "q-and-a",
            name: "Questions & Answers",
            content: [
                {
                    id: 'ceremony-reception',
                    category: 'Ceremony & Reception',
                    navIcon: ChurchIcon,
                    questions: [
                        {
                            q: 'What time should I arrive?',
                            a: 'Please arrive 15-20 minutes before the ceremony begins to get seated.'
                        },
                        {
                            q: 'Will the ceremony be indoors or outdoors?',
                            a: 'The ceremony will be outdoors (weather permitting) with the reception indoors.'
                        },
                        {
                            q: 'Can I take photos during the ceremony?',
                            a: 'We kindly request an unplugged ceremony. Phones and cameras away until the celebration begins!'
                        },
                        {
                            q: 'Will there be parking on-site?',
                            a: 'Yes, there is complimentary parking available at the venue.'
                        },
                        {
                            q: 'Can I bring a plus-one?',
                            a: 'If your invitation includes a guest, it will say "and guest." Otherwise, we are unable to accommodate additional guests.'
                        },
                        {
                            q: 'Are kids invited?',
                            a: 'We love your little ones, but our wedding will be adults-only.'
                        },
                        {
                            q: 'Will there be an open bar?',
                            a: 'Yes! Beer, wine, and cocktails will be provided.'
                        },
                        {
                            q: 'What if I have dietary restrictions?',
                            a: 'Please include any dietary needs when you RSVP, we will happily accommodate.'
                        }
                    ]
                },
                {
                    id: 'lodging',
                    category: 'Travel & Lodging',
                    navIcon: BedIcon,
                    questions: [
                        {
                            q: 'Are there hotel blocks?',
                            a: 'Yes! Details to be shared soon.'
                        },
                        {
                            q: 'What airports are closest?',
                            a: 'The closest airports are Providence - TF Green (PVD) and Boston - Logan (BOS).'
                        },
                        {
                            q: 'Will transportation be provided?',
                            a: 'A shuttle will run between the hotel block and the venue before and after the event. Times will be added closer to the date. If you are driving separately, the OceanCliff address is [65 Ridge Rd, Newport, RI 02840](https://www.google.com/maps?q=65+Ridge+Rd,+Newport,+RI+02840).'
                        }
                    ]
                },
                {
                    id: 'attire',
                    category: 'Attire',
                    navIcon: ShirtFoldedIcon,
                    questions: [
                        {
                            q: 'What should I wear?',
                            a: 'For the ladies, formal black-tie attire, long gowns, or elegant evening dresses are perfect. For the gents, black-tie optional, a tux or dark suit with a tie.'
                        },
                        {
                            q: "What's the dress code for the welcome event?",
                            a: 'Resort casual. Think sundresses, blouses, or polos with shorts or slacks.'
                        },
                        {
                            q: 'What will the weather be like?',
                            a: 'Late June in Newport is typically warm and breezy, especially by the water.'
                        }
                    ]
                },
                {
                    id: "gifts",
                    category: "Gifts & Registry",
                    navIcon: GiftIcon,
                    questions: [
                        {
                            q: 'Where are you registered?',
                            a: "Your presence is truly the best gift. If you'd like to browse our registry, it's linked [here](https://www.theknot.com/us/samantha-balkir-and-jack-labbe-2027-06-24/registry)."
                        }
                    ]
                }
            ]
        }
    ]
}

export default config;