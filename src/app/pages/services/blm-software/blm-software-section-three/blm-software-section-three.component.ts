import {Component, Input} from '@angular/core';
import {BLMSoftwarePageData} from "../../../../shared/constants/service-pages";

@Component({
  selector: 'sb-blm-software-section-three',
  standalone: true,
  imports: [],
  templateUrl: './blm-software-section-three.component.html',
  styleUrl: './blm-software-section-three.component.scss'
})
export class BlmSoftwareSectionThreeComponent {
  blmSoftwarePageData!: BLMSoftwarePageData;

  @Input("pageData")
  set blmPageData(value: BLMSoftwarePageData) {
    this.blmSoftwarePageData = value;
  }
}
