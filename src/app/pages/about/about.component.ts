import { Component, OnInit } from "@angular/core";
import { VideoHeaderComponent } from "../../components/video-header/video-header.component";
import { AsyncPipe } from "@angular/common";
import { CtaComponent } from "./cta/cta.component";
import { ContentComponent } from "./content/content.component";
import { AboutUsPageData } from "../../shared/constants/common";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EndpointBuilderService } from "../../shared/services/endpoint-builder.service";
import { commonPagesEndpoints } from "../../shared/endpoints/endpoints";

@Component({
  selector: "sb-about",
  standalone: true,
  imports: [VideoHeaderComponent, AsyncPipe, CtaComponent, ContentComponent],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.scss",
})
export class AboutComponent implements OnInit {
  aboutUsData$!: Observable<AboutUsPageData>;

  constructor(
    private httpClient: HttpClient,
    private endpointBuilderService: EndpointBuilderService,
  ) {}

  ngOnInit() {
    this.aboutUsData$ = this.getAboutUsPageData();
  }

  getAboutUsPageData(): Observable<AboutUsPageData> {
    const url = this.endpointBuilderService.buildEndpointUrl(
      commonPagesEndpoints.aboutUsPageData,
    );
    return this.httpClient.get<AboutUsPageData>(url);
  }
}
