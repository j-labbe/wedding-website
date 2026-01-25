import React from 'react';

/**
 * Parse markdown bold syntax (**text**) and return React nodes
 */
export function parseMarkdownBold(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return React.createElement('strong', { key: index }, part.slice(2, -2));
        }
        return part;
    });
}
