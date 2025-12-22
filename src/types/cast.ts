import type Placeholder from '../assets/img/placeholder.png?lqip';

export interface CastMember {
    name: string;
    role: string;
    image: typeof Placeholder;
    funFact?: string;
}

export type AnimationState = 'idle' | 'expanding' | 'expanded' | 'collapsing';
