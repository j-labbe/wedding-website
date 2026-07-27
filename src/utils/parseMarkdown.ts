import React from 'react';

/**
 * Parse markdown bold (**text**) and strikethrough (~~text~~) syntax
 * and return React nodes
 */
export function parseMarkdown(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*|~~[^~]+~~)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return React.createElement('strong', { key: index }, part.slice(2, -2));
        }
        if (part.startsWith('~~') && part.endsWith('~~')) {
            return React.createElement('del', { key: index }, part.slice(2, -2));
        }
        return part;
    });
}
