import { Component, OnInit } from "@angular/core";
import { GdprPageData } from "../../shared/constants/common";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EndpointBuilderService } from "../../shared/services/endpoint-builder.service";
import { DomSanitizer } from "@angular/platform-browser";
import { commonPagesEndpoints } from "../../shared/endpoints/endpoints";
import { AsyncPipe } from "@angular/common";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: "sb-gdpr",
  standalone: true,
  imports: [AsyncPipe, HeaderComponent],
  templateUrl: "./gdpr.component.html",
  styleUrl: "./gdpr.component.scss",
})
export class GdprComponent implements OnInit {
  gdprPageData$!: Observable<GdprPageData>;
  title!: string;

  constructor(
    private httpClient: HttpClient,
    private endpointBuilderService: EndpointBuilderService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.gdprPageData$ = this.getGdprPageData();
  }

  getGdprPageData() {
    const url = this.endpointBuilderService.buildEndpointUrl(
      commonPagesEndpoints.gdprPage,
    );
    return this.httpClient.get<GdprPageData>(url);
  }
}
