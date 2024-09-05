import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ContactUsPage} from "../../shared/constants/common";
import {HttpClient} from "@angular/common/http";
import {EndpointBuilderService} from "../../shared/services/endpoint-builder.service";
import {commonPagesEndpoints} from "../../shared/endpoints/endpoints";
import {GoogleMapComponent} from "./google-map/google-map.component";
import {NotesComponent} from "./notes/notes.component";
import {AdditionalInfoComponent} from "./additional-info/additional-info.component";
import {AsyncPipe} from "@angular/common";
import {HeaderComponent} from "../../components/header/header.component";

@Component({
  selector: 'sb-contact',
  standalone: true,
  imports: [
    GoogleMapComponent,
    NotesComponent,
    AdditionalInfoComponent,
    AsyncPipe,
    HeaderComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  pageData$!: Observable<ContactUsPage>;

  constructor(
      private httpClient: HttpClient,
      private endpointBuilderService: EndpointBuilderService,
  ) {}

  ngOnInit() {
    this.pageData$ = this.getPageData();
  }

  getPageData(): Observable<ContactUsPage> {
    const url = this.endpointBuilderService.buildEndpointUrl(commonPagesEndpoints.contactUsPage);
    return this.httpClient.get<ContactUsPage>(url);
  }

  downloadPdfFile() {
    const link = document.createElement("a");
    link.download = "opci_uvjeti_rezanja.pdf";
    link.href = "./assets/media/opci-uvjeti-rezanja.pdf";
    link.click();
  }
}
