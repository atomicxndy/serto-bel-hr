import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BLMSoftwarePageData } from "../../../shared/constants/service-pages";
import { ServicesPageService } from "../services-page.service";
import { HeaderComponent } from "../../../components/header/header.component";
import { BlmSoftwareSectionOneComponent } from "./blm-software-section-one/blm-software-section-one.component";
import { BlmSoftwareSectionTwoComponent } from "./blm-software-section-two/blm-software-section-two.component";
import { BlmImageTextComponent } from "./blm-image-text/blm-image-text.component";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "sb-blm-software",
  standalone: true,
  imports: [
    HeaderComponent,
    BlmSoftwareSectionOneComponent,
    BlmSoftwareSectionTwoComponent,
    BlmImageTextComponent,
    AsyncPipe,
  ],
  templateUrl: "./blm-software.component.html",
  styleUrl: "./blm-software.component.scss",
})
export class BlmSoftwareComponent implements OnInit {
  title = "title";
  data$!: Observable<BLMSoftwarePageData>;

  constructor(private servicesPageService: ServicesPageService) {}

  ngOnInit() {
    this.data$ = this.servicesPageService.getBLMSoftwarePageData();
  }
}
