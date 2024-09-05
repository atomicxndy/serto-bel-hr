import {Component, OnInit} from '@angular/core';
import {commonPagesEndpoints} from "../../shared/endpoints/endpoints";
import {EUFondsPageData} from "../../shared/constants/common";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {EndpointBuilderService} from "../../shared/services/endpoint-builder.service";
import {HeaderComponent} from "../../components/header/header.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'sb-eu-fonds',
  standalone: true,
  imports: [
    HeaderComponent,
    AsyncPipe
  ],
  templateUrl: './eu-fonds.component.html',
  styleUrl: './eu-fonds.component.scss'
})
export class EuFondsComponent implements OnInit {
  data$!: Observable<EUFondsPageData>;

  constructor(
      private httpClient: HttpClient,
      private endpointBuilderService: EndpointBuilderService,
  ) {}

  ngOnInit() {
    this.data$ = this.getEUFondsPageData();
  }

  getEUFondsPageData(): Observable<EUFondsPageData> {
    const url = this.endpointBuilderService.buildEndpointUrl(
        commonPagesEndpoints.euFondsPage
    );

    return this.httpClient.get<EUFondsPageData>(url);
  }
}
