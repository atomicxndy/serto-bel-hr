export interface Service {
  id?: string;
  serviceTitle?: string;
  serviceDescription?: string;
}

export interface FAQ {
  id?: string;
  faqTitle?: string;
  faqDescription?: string;
}

export interface HomepageData {
  data: {
    attributes: {
      videoBackgroundLogo?: any;
      videoBackgroundSubtitle?: string;
      videoBackgroundServicesCta?: string;
      videoBackground?: VideoData;
      createdAt?: Date;
      updatedAt: Date;
      publishedAt?: Date;
      locale?: string;
      aboutSectionTitle?: string;
      aboutSectionDescription?: string;
      aboutSectionBtnLabel?: string;
      aboutSectionImage?: any;
      servicesSectionTitle?: string;
      servicesSectionDescription?: string;
      servicesSectionBtnLabel?: string;
      servicesSectionList?: Service[];
      faqSectionTitle?: string;
      faqSectionDescription?: string;
      faqSectionBtnLabel?: string;
      faqSectionList?: FAQ[];
      homepageCta?: HomepageCta;
      seo?: SEOData;
      homepageBasicInfoComponent?: HomepageBasicInfoComponent;
      additionalInfo?: any;
    };
  };
  meta: any;
}

export interface HomepageBasicInfoComponent {
  id?: number;
  yearsLabel?: string;
  yearsNumber?: string;
  industriesLabel?: string;
  industriesNumber?: string;
  soldProductsLabel?: string;
  soldProductsNumber?: string;
}

export interface SEOData {
  id?: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  preventIndexing?: boolean;
}

export interface HomepageCta {
  id?: number;
  label?: string;
  mainText?: string;
  ctaButtonLabel?: string;
}

export interface VideoData {
  data: {
    attributes: {
      name?: string;
      url?: string;
      provider?: string;
      mime?: string;
    };
  };
}

export interface HeaderLogo {
  data?: {
    attributes?: {
      mainLogo?: any;
    };
  };
}
