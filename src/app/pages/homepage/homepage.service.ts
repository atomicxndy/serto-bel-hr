import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EndpointBuilderService} from "../../shared/services/endpoint-builder.service";
import {HeaderLogo, HomepageData} from "../../shared/constants/homepage";
import {commonPagesEndpoints} from "../../shared/endpoints/endpoints";

@Injectable({providedIn: "root"})
export class HomepageService {
    constructor(
        private httpClient: HttpClient,
        private endpointBuilderService: EndpointBuilderService,
    ) {
    }

    getHomepageData(): Observable<HomepageData> {
        const endpoint = this.endpointBuilderService.buildEndpointUrl(
            commonPagesEndpoints.homepageData,
            [
                {
                    key: "lang",
                    value: "hr",
                },
            ],
        );
        return this.httpClient.get<HomepageData>(endpoint);
    }

    getHeaderLogos(): Observable<HeaderLogo> {
        const endpoint = this.endpointBuilderService.buildEndpointUrl(
            commonPagesEndpoints.headerLogo,
            [
                {
                    key: "lang",
                    value: "hr",
                },
            ],
        );
        return this.httpClient.get<HeaderLogo>(endpoint);
    }
}
