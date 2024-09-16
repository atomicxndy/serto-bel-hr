import {SEOData} from "./homepage";

export interface BLMPageData {
    data?: {
        attributes?: {
            headerTitle?: string;
            imageSectionOne?: any;
            blmSectionOneComponent?: SectionOneBLMComponent;
            blmSectionOneDescriptionComponent?: SectionOneDescriptionComponent[];
            imageSectionTwo?: any;
            blmSectionTwoComponent?: SectionTwoBLMComponent;
            blmCardSectionTwoComponent?: SectionTwoCardBLMComponent[];
            largeImage?: any;
            sectionThreeTitle?: string;
            blmCardSectionThreeComponent?: SectionThreeCardBLMComponent[];
            blmSectionFourComponent?: SectionFourBLMComponent;
            blmCardSectionFourComponent?: SectionFourCardBLMComponent[];
        };
    };
}

export interface SectionFourBLMComponent {
    id?: number;
    firstTitle?: string;
    firstDescription?: string;
    secondTitle?: string;
    secondDescription?: string;
}

export interface SectionFourCardBLMComponent
    extends SectionTwoCardBLMComponent {}

export interface SectionOneBLMComponent {
    id?: number;
    title?: string;
    subtitle?: string;
    mainTitle?: string;
}

export interface SectionOneDescriptionComponent {
    id?: number;
    title?: string;
    description?: string;
}

export interface SectionTwoCardBLMComponent {
    id?: number;
    title?: string;
    content?: string;
}

export interface SectionThreeCardBLMComponent
    extends SectionTwoCardBLMComponent {}

export interface SectionTwoBLMComponent {
    id?: number;
    title?: string;
    subtitle?: string;
}

export interface BLMSoftwarePageData {
    data?: {
        attributes?: {
            headerTitle?: string;
            blmSoftwareSectionOneComponent?: BLMSoftwareSectionOneComponent;
            sectionOneImages?: any;
            blmSoftwareCardsSectionOneComponent?: BLMSoftwareCardsSectionOneComponent[];
            blmSoftwareSectionTwoComponent?: BMLSoftwareSectionTwoComponent;
            sectionTwoImage?: any;
            blmSoftwareSectionThreeComponent?: BLMSoftwareSectionThreeComponent;
            blmSoftwareCardsSectionThreeComponent?: BLMSoftwareCardsSectionThreeComponent[];
            blmTechnicalSpecificationsComponent?: BLMTechnicalSpecificationsComponent[];
            technicalCharacteristicsTableLabel?: string;
            blmCardWithImageOne?: BLMCard;
            blmCardWithImageTwo?: BLMCard;
            blmCardWithImageThree?: BLMCard;
            blmCardWithImageFour?: BLMCard;
            blmCardWithImageFive?: BLMCard;
            blmCardWithImageSix?: BLMCard;
            cardImageOne?: any;
            cardImageTwo?: any;
            cardImageThree?: any;
            cardImageFour?: any;
            cardImageFix?: any;
            cardImageSix?: any;
            blmSoftwareTextComponentOne?: BLMSoftwareTextComponentData;
            blmSoftwareTextComponentTwo?: BLMSoftwareTextComponentData;
            blmSoftwareTextComponentThree?: BLMSoftwareTextComponentData;
            blmSoftwareTextComponentFour?: BLMSoftwareTextComponentData;
            blmSoftwareTextImageOne?: any;
            blmSoftwareTextImageTwo?: any;
            blmSoftwareTextImageThree?: any;
            blmSoftwareTextImageFour?: any;
        };
    };
}

export interface BLMSoftwareTextComponentData {
    id?: number;
    heading?: string;
    description?: string;
    imagePositionedLeft?: boolean;
    backgroundColor?: string;
}

export interface BLMTechnicalSpecificationsComponent {
    id?: number;
    item?: string;
    description?: string;
}

export interface BLMSoftwareSectionOneComponent {
    id?: number;
    title?: string;
    description?: string;
}

export interface BLMSoftwareCardsSectionOneComponent {
    id?: number;
    title?: string;
    content?: string;
}

export interface BMLSoftwareSectionTwoComponent {
    id?: number;
    title?: string;
    subtitle?: string;
}

export interface BLMCard {
    id?: number;
    title?: string;
    description?: string;
    image?: any;
}

export interface BLMSoftwareSectionThreeComponent {
    id?: number;
    title?: string;
    subtitle?: string;
    technicalSpecsTitle?: string;
}

export interface BLMSoftwareCardsSectionThreeComponent
    extends BLMSoftwareCardsSectionOneComponent {}

export interface ServicesData {
    data: {
        attributes: {
            headerTitle?: string;
            locale?: string;
            laserCuttingOfPipesService?: BasicServiceData;
            laserCuttingOfSheetsService?: BasicServiceData;
            bendingService?: BasicServiceData;
            laserCuttingOfPipesImage?: any;
            laserCuttingOfSheetsImage?: any;
            bendingImage?: any;
            seo: SEOData;
            headerVide?: string;
        };
    };
}

export interface BasicServiceData {
    id?: number;
    title?: string;
    description?: string;
    imagePositionedLeft?: boolean;
    backgroundColor?: string;
    urlLabel?: string;
    btnLabel?: string;
}

export interface ServicesComponentData {
    id?: number;
    title?: string;
    description?: string;
    media?: any;
    serviceFeatureListComponent?: ServiceFeature[];
    buttonLabel?: string;
    serviceUrl?: string;
}

export interface ServiceFeature {
    feature?: string;
}

export interface PrimaData {
    data: {
        attributes: {
            headerTitle?: string;
            title?: string;
            description?: string;
            image?: any;
            cuttingOptionsTablePrima?: PrimaCuttingOptions;
        };
    };
}

export interface PrimaCuttingOptions {
    label?: string;
    inoxLabel?: string;
    inoxCuttingOption?: string;
    steelLabel?: string;
    steelCuttingOption?: string;
    aluminiumCuttingOption?: string;
    aluminiumLabel?: string;
}

export interface BystronicPageData {
    data?: {
        attributes?: {
            headerTitle?: string;
            title?: string;
            description?: string;
            images?: any;
            cuttingOptionsTableBystronic?: CuttingOptionsTableBystronic;
        };
    };
}

export interface BendingPageData {
    data?: {
        attributes?: {
            headerTitle?: string;
            title?: string;
            description?: string;
            cuttingOptionsTableBending?: CuttingOptionsTableBending;
            images?: any;
            isoCertificate9001?: any;
            isoCertificate14001?: any;
            video?: any;
        };
    };
}

export interface CuttingOptionsTableBending {
    id?: number;
    label?: string;
    inoxLabel?: string;
    inoxCuttingOption?: string;
    steelLabel?: string;
    steelCuttingOption?: string;
    aluminiumLabel?: string;
    aluminiumCuttingOption?: string;
}

export interface Images {
    data?: [
        attributes?: {
            url?: string;
        },
    ];
}

export interface CuttingOptionsTableBystronic {
    id?: number;
    label?: string;
    inoxLabel?: string;
    inoxCuttingOption?: string;
    steelLabel?: string;
    steelCuttingOption?: string;
    aluminiumLabel?: string;
    aluminiumCuttingOption?: string;
    copperLabel?: string;
    copperCuttingOption?: string;
    brassLabel?: string;
    brassCuttingOption?: string;
}

export interface LaserCuttingOfSheetsData {
    data?: {
        attributes?: {
            headerTitle?: string;
            mainTitle?: string;
            mainSubtitle?: string;
            contentTitle?: string;
            contentDescriptionTop?: string;
            contentDescriptionBottom?: string;
            video?: any;
            primaImage?: any;
            bystronicImage?: any;
            bystronicLaserCuttingComponent: BystronicLaserCuttingComponent;
            primaLaserCuttingComponent: PrimaLaserCuttingComponent;
        };
    };
}

export interface LaserCuttingOfPipesData {
    data?: {
        attributes?: {
            headerTitle?: string;
            title?: string;
            mainDescription?: any;
            video?: any;
        };
    };
}

export interface BystronicLaserCuttingComponent {
    id?: number;
    title?: string;
    description?: string;
    urlLabel?: string;
}

export interface PrimaLaserCuttingComponent {
    id?: number;
    title?: string;
    description?: string;
    urlLabel?: string;
}

export interface LaserCuttingOfSheetsData {
    data?: {
        attributes?: {
            headerTitle?: string;
            mainTitle?: string;
            mainSubtitle?: string;
            contentTitle?: string;
            contentDescriptionTop?: string;
            contentDescriptionBottom?: string;
            video?: any;
            primaImage?: any;
            bystronicImage?: any;
            bystronicLaserCuttingComponent: BystronicLaserCuttingComponent;
            primaLaserCuttingComponent: PrimaLaserCuttingComponent;
        };
    };
}

export interface LaserCuttingOfPipesData {
    data?: {
        attributes?: {
            headerTitle?: string;
            title?: string;
            mainDescription?: any;
            video?: any;
        };
    };
}

export interface BystronicLaserCuttingComponent {
    id?: number;
    title?: string;
    description?: string;
    urlLabel?: string;
}

export interface PrimaLaserCuttingComponent {
    id?: number;
    title?: string;
    description?: string;
    urlLabel?: string;
}
