import { Component, Input } from "@angular/core";
import { BLMPageData } from "../../../../shared/constants/service-pages";

@Component({
  selector: "sb-blm-section-one",
  standalone: true,
  imports: [],
  templateUrl: "./blm-section-one.component.html",
  styleUrl: "./blm-section-one.component.scss",
})
export class BlmSectionOneComponent {
  resolvedImgUrl!: string;
  blmPageData!: BLMPageData;

  @Input("pageData")
  set pageData(value: BLMPageData) {
    this.blmPageData = value;
    this.resolvedImgUrl =
      value.data?.attributes?.imageSectionOne.data.attributes.url;
  }
}
