import PageTransition from '../components/PageTransition';
import FadeInOnScroll from '../components/FadeInOnScroll';

import config from '../config';

function OurStory() {
    const page = config.pages.find(p => p.id === "our-story");
    const content = page?.content;
    const sections = content && 'sections' in content ? content.sections : [];

    return (
        <PageTransition>
            <div className="flex justify-center flex-col items-center px-5">
                {sections.map((section: React.JSX.Element, index: number) => (
                    <FadeInOnScroll key={index}>
                        {section}
                    </FadeInOnScroll>
                ))}
            </div>
        </PageTransition>
    )
}


export default OurStory
