import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {commonPagesEndpoints} from "../../shared/endpoints/endpoints";
import {EndpointBuilderService} from "../../shared/services/endpoint-builder.service";

export interface NavigationData {
    data?: {
        id?: number;
        attributes?: {
            homepageLabel?: string;
            aboutUsLabel?: string;
            galleryLabel?: string;
            contactUsLabel?: string;
            faqLabel?: string;
            laserCuttingOfSheetsLabel?: string;
            primaLabel?: string;
            bystronicLabel?: string;
            laserCuttingOfPipesLabel?: string;
            blmLabel?: string;
            blmSoftwareLabel?: string;
            bendingLabel?: string;
            servicesLabel?: string;
        };
    };
}

@Injectable({ providedIn: "root" })
export class NavigationService {

    constructor(
        private httpClient: HttpClient,
        private endpointBuilderService: EndpointBuilderService,
    ) {}

    getMainNavigationData(): Observable<NavigationData> {
        const endpoint = this.endpointBuilderService.buildEndpointUrl(
            commonPagesEndpoints.mainNavigation
        );

        return this.httpClient.get<NavigationData>(endpoint);
    }
}
