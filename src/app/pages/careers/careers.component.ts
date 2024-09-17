import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CareersPageData } from "../../shared/constants/common";
import { HttpClient } from "@angular/common/http";
import { EndpointBuilderService } from "../../shared/services/endpoint-builder.service";
import { commonPagesEndpoints } from "../../shared/endpoints/endpoints";
import { HeaderComponent } from "../../components/header/header.component";
import { AsyncPipe } from "@angular/common";
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "sb-careers",
  standalone: true,
  imports: [
    HeaderComponent,
    AsyncPipe,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody,
  ],
  templateUrl: "./careers.component.html",
  styleUrl: "./careers.component.scss",
})
export class CareersComponent implements OnInit {
  data$!: Observable<CareersPageData>;

  constructor(
    private httpClient: HttpClient,
    private endpointBuilderService: EndpointBuilderService,
  ) {}

  ngOnInit() {
    this.data$ = this.getCareersPageData();
  }

  getCareersPageData(): Observable<CareersPageData> {
    const url = this.endpointBuilderService.buildEndpointUrl(
      commonPagesEndpoints.careers,
    );

    return this.httpClient.get<CareersPageData>(url);
  }
}
