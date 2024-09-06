import {Component, Input} from '@angular/core';
import {BLMPageData} from "../../../../shared/constants/service-pages";

@Component({
  selector: 'sb-blm-section-two',
  standalone: true,
  imports: [],
  templateUrl: './blm-section-two.component.html',
  styleUrl: './blm-section-two.component.scss'
})
export class BlmSectionTwoComponent {
  resolvedImgUrl!: string;
  blmPageData!: BLMPageData;

  @Input("pageData")
  set pageData(value: BLMPageData) {
    this.blmPageData = value;
    this.resolvedImgUrl =
        value.data?.attributes?.imageSectionTwo.data.attributes.url;
  }
}
