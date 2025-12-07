import PageTransition from '../components/PageTransition';
import ProfileImage from '../components/ProfileImage';
import Jack from '../assets/img/jack.jpeg?lqip';
import Placeholder from '../assets/img/placeholder.png?lqip';

interface CastMember {
    name: string;
    role: string;
    image: typeof Placeholder;
}

function TheCast() {

    const brideAndGroom: CastMember[] = [
        { name: 'Sammy', role: 'The Bride', image: Placeholder },
        { name: 'Jack', role: 'The Groom', image: Jack },
    ];

    const parents: CastMember[] = [
        { name: 'Beth', role: 'Mother of The Bride', image: Placeholder },
        { name: 'Tom', role: 'Father of The Bride', image: Placeholder },
        { name: 'Brenda', role: 'Mother of The Groom', image: Placeholder },
        { name: 'Paul', role: 'Father of The Groom', image: Placeholder },
    ];

    const weddingParty: CastMember[] = [
        { name: 'Juliana', role: 'Maid of Honor', image: Placeholder },
        { name: 'Eve', role: 'Bridesmaid', image: Placeholder },
        { name: 'Morgan', role: 'Bridesmaid', image: Placeholder },
        { name: 'Casey', role: 'Bridesmaid', image: Placeholder },
        { name: 'Bailey', role: 'Bridesmaid', image: Placeholder },
        { name: 'Sara', role: 'Bridesmaid', image: Placeholder },
        { name: 'Peter', role: 'Best Man', image: Placeholder },
        { name: 'Ryan', role: 'Groomsman', image: Placeholder },
        { name: 'Chris', role: 'Groomsman', image: Placeholder },
        { name: 'Tommy', role: 'Groomsman', image: Placeholder },
        { name: 'Nick', role: 'Groomsman', image: Placeholder },
        { name: '???', role: 'Groomsman', image: Placeholder },
    ];

    // Pets
    const pets: CastMember[] = [
        { name: 'Luna', role: 'Bun of Honor', image: Placeholder },
        { name: 'Leo', role: 'Best Bun', image: Placeholder },
    ];

    // ====================================================================

    return (
        <PageTransition>
            <div className="flex justify-center flex-col items-center px-5">
                <h1 className="title md:text-5xl/20 text-4xl/15 mt-5 mb-5">The Cast</h1>

                <div className="flex flex-col items-center max-w-4xl mx-auto my-10 space-y-10">

                    {/* Bride & Groom */}
                    <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto my-10">
                        {brideAndGroom.map((member) => (
                            <div key={member.name} className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                                <ProfileImage lqip={member.image} size="medium" alt={member.name} />
                                <p className="font-semibold text-lg md:text-xl mb-2">{member.name}</p>
                                <p className="text-md md:text-lg leading-6 text-center">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Parents */}
                    <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto my-10">
                        {parents.map((member) => (
                            <div key={member.name} className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                                <ProfileImage lqip={member.image} size="medium" alt={member.name} />
                                <p className="font-semibold text-lg md:text-xl mb-2">{member.name}</p>
                                <p className="text-md md:text-lg leading-6 text-center">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Wedding Party */}
                    <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto my-10">
                        {weddingParty.map((member) => (
                            <div key={member.name} className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                                <ProfileImage lqip={member.image} size="medium" alt={member.name} />
                                <p className="font-semibold text-lg md:text-xl mb-2">{member.name}</p>
                                <p className="text-md md:text-lg leading-6 text-center">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pets */}
                    <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto my-10">
                        {pets.map((member) => (
                            <div key={member.name} className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                                <ProfileImage lqip={member.image} size="medium" alt={member.name} />
                                <p className="font-semibold text-lg md:text-xl mb-2">{member.name}</p>
                                <p className="text-md md:text-lg leading-6 text-center">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}

export default TheCast
