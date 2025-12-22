import CastMemberCard from './CastMemberCard';
import type { CastMember, AnimationState } from '../types/cast';

interface CastSectionProps {
    members: CastMember[];
    columns: 2 | 3 | 4;
    selectedMemberName: string | undefined;
    animationState: AnimationState;
    onMemberClick: (member: CastMember, event: React.MouseEvent<HTMLDivElement>) => void;
}

function CastSection({ members, columns, selectedMemberName, animationState, onMemberClick }: CastSectionProps) {
    return (
        <div className={`grid grid-cols-${columns} gap-4 max-w-4xl mx-auto my-10`}>
            {members.map((member) => (
                <CastMemberCard
                    key={member.name}
                    member={member}
                    isSelected={selectedMemberName === member.name && animationState !== 'idle'}
                    onMemberClick={onMemberClick}
                />
            ))}
        </div>
    );
}

export default CastSection;
