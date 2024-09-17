import { Component, OnInit } from "@angular/core";
import { EndpointBuilderService } from "../../shared/services/endpoint-builder.service";
import { Observable } from "rxjs";
import { FAQData } from "../../shared/constants/common";
import { HttpClient } from "@angular/common/http";
import { commonPagesEndpoints } from "../../shared/endpoints/endpoints";
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
} from "@ng-bootstrap/ng-bootstrap";
import { BypassSecurityPipe } from "../../shared/pipes/bypass-security.pipe";
import { HeaderComponent } from "../../components/header/header.component";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "sb-faq",
  standalone: true,
  imports: [
    NgbAccordionDirective,
    NgbAccordionItem,
    BypassSecurityPipe,
    HeaderComponent,
    AsyncPipe,
    NgbAccordionHeader,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody,
  ],
  templateUrl: "./faq.component.html",
  styleUrl: "./faq.component.scss",
})
export class FaqComponent implements OnInit {
  data$!: Observable<FAQData>;

  constructor(
    private httpClient: HttpClient,
    private endpointBuilderService: EndpointBuilderService,
  ) {}

  ngOnInit() {
    this.data$ = this.getFaqPadeData();
  }

  getFaqPadeData() {
    const url = this.endpointBuilderService.buildEndpointUrl(
      commonPagesEndpoints.faqPage,
    );
    return this.httpClient.get<FAQData>(url);
  }
}
