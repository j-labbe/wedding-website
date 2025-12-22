import type { ReactNode } from 'react';
import ProfileImage from './ProfileImage';
import FadeInOnScroll from './FadeInOnScroll';
import type { CastMember } from '../types/cast';

interface CastMemberCardProps {
    member: CastMember;
    isSelected: boolean;
    onMemberClick: (member: CastMember, event: React.MouseEvent<HTMLDivElement>) => void;
    overlay?: ReactNode;
}

function CastMemberCard({ member, isSelected, onMemberClick, overlay }: CastMemberCardProps) {
    return (
        <FadeInOnScroll className="flex flex-col items-center">
            {isSelected ? (
                <div
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full"
                    style={{ backgroundColor: 'rgba(200, 200, 200, 0.5)' }}
                />
            ) : (
                <div
                    onClick={(e) => onMemberClick(member, e)}
                    className="relative cursor-pointer"
                >
                    <ProfileImage lqip={member.image} size="medium" alt={member.name} />
                    {overlay}
                </div>
            )}
            <p className="font-semibold text-lg md:text-xl mb-2">{member.name}</p>
            <p className="text-md md:text-lg leading-6 text-center">{member.role}</p>
        </FadeInOnScroll>
    );
}

export default CastMemberCard;
