import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EndpointBuilderService} from "../../shared/services/endpoint-builder.service";
import {
    BendingPageData, BLMPageData,
    BLMSoftwarePageData, BystronicPageData,
    LaserCuttingOfPipesData,
    LaserCuttingOfSheetsData, PrimaData,
    ServicesData
} from "../../shared/constants/service-pages";
import {servicesPageEndpoints} from "../../shared/endpoints/endpoints";


@Injectable({providedIn: "any"})
export class ServicesPageService {
    constructor(
        private httpClient: HttpClient,
        private endpointBuilderService: EndpointBuilderService,
    ) {
    }

    getServicesPageData(): Observable<ServicesData> {
        const url = this.endpointBuilderService.buildEndpointUrl(
            servicesPageEndpoints.servicesPageData,
            [
                {
                    key: "lang",
                    value: "hr",
                },
            ],
        );
        return this.httpClient.get<ServicesData>(url);
    }

    getBLMSoftwarePageData(): Observable<BLMSoftwarePageData> {
        const url = this.endpointBuilderService.buildEndpointUrl(
            servicesPageEndpoints.blmSoftwarePageData,
            [
                {
                    key: "lang",
                    value: "hr",
                },
            ],
        );
        return this.httpClient.get<BLMSoftwarePageData>(url);
    }

    getLaserCuttingOfSheetsPageData(): Observable<LaserCuttingOfSheetsData> {
        const url = this.endpointBuilderService.buildEndpointUrl(
            servicesPageEndpoints.laserCuttingOfSheet,
            [
                {
                    key: "lang",
                    value: "hr",
                },
            ],
        );

        return this.httpClient.get<LaserCuttingOfSheetsData>(url);
    }

    getLaserCuttingOfPipesPageData(): Observable<LaserCuttingOfPipesData> {
        const url = this.endpointBuilderService.buildEndpointUrl(
            servicesPageEndpoints.laserCuttingOfPipe,
            [
                {
                    key: "lang",
                    value: "hr",
                },
            ],
        );

        return this.httpClient.get<LaserCuttingOfPipesData>(url);
    }

    getPrimaPageData(): Observable<PrimaData> {
        const url = this.endpointBuilderService.buildEndpointUrl(
            servicesPageEndpoints.primaPageData,
            [
                {
                    key: "lang",
                    value: "hr",
                },
            ],
        );
        return this.httpClient.get<PrimaData>(url);
    }

    getBystronicPageData(): Observable<BystronicPageData> {
        const url = this.endpointBuilderService.buildEndpointUrl(
            servicesPageEndpoints.bystronicPageData,
            [
                {
                    key: "lang",
                    value: "hr",
                },
            ],
        );

        return this.httpClient.get<BystronicPageData>(url);
    }

    getBLMPageData(): Observable<BLMPageData> {
        const url = this.endpointBuilderService.buildEndpointUrl(
            servicesPageEndpoints.blmPageData,
            [
                {
                    key: "lang",
                    value: "hr",
                },
            ],
        );
        return this.httpClient.get<BLMPageData>(url);
    }

    getBendingPageData(): Observable<BendingPageData> {
        const url = this.endpointBuilderService.buildEndpointUrl(
            servicesPageEndpoints.bendingPageData,
            [
                {
                    key: "lang",
                    value: "hr",
                },
            ],
        );
        return this.httpClient.get<BendingPageData>(url);
    }
}
