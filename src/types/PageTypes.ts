import React from "react";
import type { IconProps } from "@phosphor-icons/react";
import type { LQIPImage } from "./ImageTypes";
import type { PairedMembers } from "./cast";

export interface ExperienceNewportItems {
    name: string;
    description: string;
    image: LQIPImage;
    link?: string;
}

export interface QAndAItems {
    q: string;
    a: string;
}

export interface HomePageContent {
    title: string;
    subtitle: string;
    location: string;
    bottomText: string;
}

export interface StoryPageContent {
    title: string;
    sections: React.JSX.Element[];
}

export interface CastPageContent {
    title: string;
    members: (PairedMembers & { role: string })[];
}

export interface EventPageContent {
    title: string;
}

export interface ExperienceNewportSection {
    id: string;
    category: string;
    navIcon: React.ForwardRefExoticComponent<IconProps>;
    items?: ExperienceNewportItems[];
    lodging?: LodgingSection[];
    lodgingDescription?: string;
}

export interface QAndASection {
    id: string;
    category: string;
    navIcon: React.ForwardRefExoticComponent<IconProps>;
    questions: QAndAItems[];
}

export interface LodgingSection {
    sectionId: string;
    title: string;
    description: string;
    hotels: HotelOption[];
}

export interface HotelOption {
    name: string;
    link: string;
    description: string;
    price: string;
    address: string;
    image?: LQIPImage;
}

/*******************************************************************/

export interface BaseSitePage<TPageName extends string, TContent> {
    id: TPageName;
    name: string;
    content: TContent;
}
export type SitePageHome = BaseSitePage<"home", HomePageContent>;
export type SitePageStory = BaseSitePage<"our-story", StoryPageContent>;
export type SitePageCast = BaseSitePage<"the-cast", CastPageContent>;
export type SitePageEvent = BaseSitePage<"the-event", EventPageContent>;
export type SitePageExperienceNewport = BaseSitePage<"experience-newport", ExperienceNewportSection[]>;
export type SitePageQAndA = BaseSitePage<"q-and-a", QAndASection[]>;

export type SitePage =
    | SitePageHome
    | SitePageStory
    | SitePageCast
    | SitePageEvent
    | SitePageExperienceNewport
    | SitePageQAndA;