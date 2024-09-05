import {VideoData} from "./homepage";

export interface FooterData {
    data?: {
        id?: number;
        attributes?: {
            rightsLabel?: string;
            address?: FooterAddress;
            footerSocialMediaLinks: FooterMoreLinks;
            moreLinksFooterComponent?: FooterMoreLinks;
            footerNewsletter?: FooterNewsletter;
        };
    };
}

export interface FooterAddress {
    id?: number;
    title?: string;
    addressData?: string;
    phoneData?: string;
    postalCode?: string;
    oib?: string;
    town?: string;
    country?: string;
}

export interface FooterSocialMediaLinks {
    id?: number;
    instagramUrl?: string;
    facebookUrl?: string;
    linkedinUrl?: string;
    youtubeUrl?: string;
}

export interface FooterMoreLinks {
    euFondsUrl?: string;
    privacyPolicyUrl?: string;
    faqUrl?: string;
    gdprUrl?: string;
    label?: string;
    careersUrl?: string;
}

export interface FooterNewsletter {
    id?: number;
    sectionTitle?: string;
    sectionDescription?: string;
}

export interface GalleryPageData {
    data?: {
        id?: number;
        attributes?: {
            pageTitle?: string;
            imagesLabel?: string;
            videosLabel?: string;
            images?: any;
            videos?: any;
        };
    };
}

export interface GdprPageData {
    data: {
        attributes: {
            headerTitle?: string;
            title?: string;
            content?: string;
        };
    };
}

export interface FAQData {
    data: {
        attributes: {
            headerTitle?: string;
            locale?: string;
            faqQuestionComponent: QuestionData[];
        };
    };
}

export interface QuestionData {
    id?: number;
    questionTitle?: string;
    description?: string;
}

export interface EUFondsPageData {
    data?: {
        attributes?: {
            headerTitle?: string;
            title?: string;
            content?: string;
        };
    };
}

export interface CookiesData {
    data?: {
        attributes?: {
            content?: string;
            acceptBtnLabel?: string;
            cancelBtnLabel?: string;
        };
    };
}

export interface ContactUsDescriptionComponentData {
    id?: number;
    title?: string;
    subtitle?: string;
    description?: string;
}

export interface ContactUsAddressInfoComponentData {
    id?: number;
    addressLabel?: string;
    addressContent?: string;
    phoneNumberLabel?: string;
    phoneNumberContent?: string;
    emailLabel?: string;
    emailSales?: string;
    emailInfo?: string;
    submitFormBtnLabel?: string;
    workingHoursLabel?: string;
    workingHoursContent?: string;
}

export interface ContactUsPage {
    data: {
        attributes: {
            headerTitle?: string;
            title?: string;
            locale?: string;
            image?: any;
            notes?: string;
            pdfDownloadLabel?: string;
            contactUsDescriptionComponent?: ContactUsDescriptionComponentData;
            contactUsAddressInfoComponent?: ContactUsAddressInfoComponentData;
            additionalInfo?: any;
        };
    };
}

export interface TermsAndConditionsPageData {
    data?: {
        attributes?: {
            content?: string;
            title?: string;
            headerTitle?: string;
            iso9001Label?: string;
            iso14001Label: string;
        };
    };
}

export interface AboutUsPageData {
    data: {
        attributes: {
            headerTitle?: string;
            locale?: string;
            aboutUsMainContentComponent?: AboutUsMainContentComponent;
            callToActionComponent?: CallToActionComponent;
            headerVideo?: VideoData;
            aboutUsMainImage?: any;
        };
    };
}

export interface AboutUsMainContentComponent {
    id?: number;
    label?: string;
    title?: string;
    description?: string;
}

export interface CallToActionComponent {
    id?: number;
    headerLabel?: string;
    content?: string;
    buttonLabel?: string;
}

export interface CareersPageData {
    data: {
        attributes: {
            id?: number;
            headerTitle?: string;
            label?: string;
            title?: string;
            jobOpeningsComponent?: JobOpeningsData[];
        };
    };
}

export interface JobOpeningsData {
    id?: number;
    jobTitle?: string;
    jobLocation?: string;
    jobDescription?: any;
}
