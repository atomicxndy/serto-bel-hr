import { Component, Input } from "@angular/core";
import { BLMSoftwarePageData } from "../../../../shared/constants/service-pages";
import { BlmSoftwareCardComponent } from "./blm-software-card/blm-software-card.component";

@Component({
  selector: "sb-blm-software-section-two",
  standalone: true,
  imports: [BlmSoftwareCardComponent],
  templateUrl: "./blm-software-section-two.component.html",
  styleUrl: "./blm-software-section-two.component.scss",
})
export class BlmSoftwareSectionTwoComponent {
  blmSoftwarePageData!: BLMSoftwarePageData;
  resolvedImageUrl?: string;

  @Input("pageData")
  set blmPageData(value: BLMSoftwarePageData) {
    this.blmSoftwarePageData = value;
    this.resolvedImageUrl =
      this.blmSoftwarePageData.data?.attributes?.sectionTwoImage.data.attributes.url;
  }
}
