import { Component, OnInit } from "@angular/core";
import { Observable, take } from "rxjs";
import { BLMPageData } from "../../../shared/constants/service-pages";
import { ServicesPageService } from "../services-page.service";
import { HeaderComponent } from "../../../components/header/header.component";
import { AsyncPipe } from "@angular/common";
import { BlmSectionOneComponent } from "./blm-section-one/blm-section-one.component";
import { BlmSectionTwoComponent } from "./blm-section-two/blm-section-two.component";
import { BlmSectionThreeComponent } from "./blm-section-three/blm-section-three.component";
import { BlmSectionFourComponent } from "./blm-section-four/blm-section-four.component";

@Component({
  selector: "sb-blm",
  standalone: true,
  imports: [
    HeaderComponent,
    AsyncPipe,
    BlmSectionOneComponent,
    BlmSectionTwoComponent,
    BlmSectionThreeComponent,
    BlmSectionFourComponent,
  ],
  templateUrl: "./blm.component.html",
  styleUrl: "./blm.component.scss",
})
export class BlmComponent implements OnInit {
  title = "title";
  data$!: Observable<BLMPageData>;
  resolvedImgUrl!: string;

  constructor(private servicesPageService: ServicesPageService) {}

  ngOnInit() {
    this.data$ = this.servicesPageService.getBLMPageData();

    this.resolveImageUrl();
  }

  resolveImageUrl() {
    this.servicesPageService
      .getBLMPageData()
      .pipe(take(1))
      .subscribe((data) => {
        this.resolvedImgUrl =
          data.data?.attributes?.largeImage.data.attributes.url;
      });
  }
}
