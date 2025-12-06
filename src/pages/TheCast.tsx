import PageTransition from '../components/PageTransition';
import ProfileImage from '../components/ProfileImage';
import Jack from '../assets/img/jack.jpeg?lqip';
import Placeholder from '../assets/img/placeholder.png?lqip';

function TheCast() {

    return (
        <PageTransition>
            <div className="flex justify-center flex-col items-center px-5">
                <h1 className="title md:text-5xl/20 text-4xl/15 mt-5 mb-5">The Cast</h1>

                <div className="flex flex-col items-center max-w-4xl mx-auto my-10 space-y-10">

                    <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto my-10">
                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Sammy Balkir" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Sammy</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                The Bride
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Jack} size="medium" alt="Jack Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Jack</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                The Groom
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto my-10">
                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Sammy Balkir" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Beth</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Mother of The Bride
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Jack Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Tom</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Father of The Bride
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Sammy Balkir" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Brenda</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Mother of The Groom
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Jack Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Paul</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Father of The Groom
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto my-10">

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Juliana Gracey" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Juliana</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Maid of Honor
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Peter Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Eve</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Bridesmaid
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Peter Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Morgan</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Bridesmaid
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Juliana Gracey" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Casey</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Bridesmaid
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Peter Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Bailey</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Bridesmaid
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Peter Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Sara</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Bridesmaid
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Juliana Gracey" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Peter</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Best Man
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Peter Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Ryan</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Groomsman
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Peter Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Chris</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Groomsman
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Juliana Gracey" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Tommy</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Groomsman
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Peter Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Nick</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Groomsman
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Peter Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">???</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Groomsman
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto my-10">
                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Sammy Balkir" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Luna</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Bun of Honor
                            </p>
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1 flex flex-col items-center">
                            <ProfileImage lqip={Placeholder} size="medium" alt="Jack Labbe" />
                            <p className="font-semibold text-lg md:text-xl mb-2">Leo</p>
                            <p className="text-md md:text-lg leading-6 text-center">
                                Best Bun
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </PageTransition>
    )
}

export default TheCast
