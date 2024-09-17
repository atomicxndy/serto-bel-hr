import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { TermsAndConditionsPageData } from "../../shared/constants/common";
import { HttpClient } from "@angular/common/http";
import { EndpointBuilderService } from "../../shared/services/endpoint-builder.service";
import { commonPagesEndpoints } from "../../shared/endpoints/endpoints";
import { AsyncPipe } from "@angular/common";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: "sb-terms-and-policy",
  standalone: true,
  imports: [AsyncPipe, HeaderComponent],
  templateUrl: "./terms-and-policy.component.html",
  styleUrl: "./terms-and-policy.component.scss",
})
export class TermsAndPolicyComponent implements OnInit {
  data$!: Observable<TermsAndConditionsPageData>;

  constructor(
    private httpClient: HttpClient,
    private endpointBuilderService: EndpointBuilderService,
  ) {}

  ngOnInit() {
    this.data$ = this.getTermsAndConditionsPageData();
  }

  getTermsAndConditionsPageData() {
    const url = this.endpointBuilderService.buildEndpointUrl(
      commonPagesEndpoints.termsAndConditions,
    );
    return this.httpClient.get<TermsAndConditionsPageData>(url);
  }

  downloadISO9001File() {
    const link = document.createElement("a");
    link.download = "iso_9001.pdf";
    link.href = "./assets/media/iso_9001.pdf";
    link.click();
  }

  downloadISO14001File() {
    const link = document.createElement("a");
    link.download = "iso_14001.pdf";
    link.href = "./assets/media/iso_14001.pdf";
    link.click();
  }
}
