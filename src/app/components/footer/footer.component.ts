import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FooterData} from "../../shared/constants/common";
import {HttpClient} from "@angular/common/http";
import {EndpointBuilderService} from "../../shared/services/endpoint-builder.service";
import {commonPagesEndpoints} from "../../shared/endpoints/endpoints";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'sb-footer',
  standalone: true,
    imports: [
        AsyncPipe,
        RouterLink
    ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  email = "laser@serto-bel.hr";
  footer$!: Observable<FooterData>;

  instagram: string = "https://www.instagram.com/sertobel_industry/";
  linkedin: string = "https://hr.linkedin.com/company/sbindustry";
  facebook: string = "https://www.facebook.com/sertobelindustry";

  constructor(
      private httpClient: HttpClient,
      private endpointBuilderService: EndpointBuilderService,
  ) {}

  ngOnInit() {
    this.footer$ = this.getFooterData();
  }

  getFooterData(): Observable<FooterData> {
    const url = this.endpointBuilderService.buildEndpointUrl(
        commonPagesEndpoints.footerData
    );
    return this.httpClient.get<FooterData>(url);
  }
}
