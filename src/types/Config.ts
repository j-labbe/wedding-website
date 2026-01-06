import type { SitePage } from './PageTypes';

export interface SiteConfig {
    site: {
        title: string;
        description: string;
        url: string;
    };
    pages: SitePage[];
}