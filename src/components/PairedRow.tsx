import type { ReactNode } from 'react';
import CastMemberCard from './CastMemberCard';
import type { CastMember, AnimationState } from '../types/cast';

interface PairedRowProps {
    left: CastMember;
    right: CastMember;
    selectedMemberName?: string;
    animationState: AnimationState;
    onMemberClick: (member: CastMember, event: React.MouseEvent<HTMLDivElement>) => void;
    leftOverlay?: ReactNode;
}

function PairedRow({ left, right, selectedMemberName, animationState, onMemberClick, leftOverlay }: PairedRowProps) {
    return (
        <div className="flex justify-center gap-4 sm:gap-8 md:gap-16">
            <CastMemberCard
                member={left}
                isSelected={selectedMemberName === left.name && animationState !== 'idle'}
                onMemberClick={onMemberClick}
                overlay={leftOverlay}
            />
            {right && right.name !== 'Mystery' ? (
                <CastMemberCard
                    member={right}
                    isSelected={selectedMemberName === right.name && animationState !== 'idle'}
                    onMemberClick={onMemberClick}
                />
            ) : (null)}
        </div>
    );
}

export default PairedRow;
