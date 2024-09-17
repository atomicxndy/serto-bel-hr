import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class EndpointBuilderService {
  buildEndpointUrl(
    url: string,
    urlParams?: { key: string; value: any }[],
    queryParams?: { key: string; value: any }[],
  ): string {
    urlParams?.forEach((value) => {
      url = url.replace(`{${value.key}}`, value.value);
    });

    queryParams?.forEach((param) => {
      url = url.replace(`|${param.key}|`, param.value);
    });

    return `${environment.baseUrl}${url}`;
  }
}
