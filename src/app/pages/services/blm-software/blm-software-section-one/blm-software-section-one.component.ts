import {Component, Input} from '@angular/core';
import {BLMSoftwarePageData} from "../../../../shared/constants/service-pages";

@Component({
  selector: 'sb-blm-software-section-one',
  standalone: true,
  imports: [],
  templateUrl: './blm-software-section-one.component.html',
  styleUrl: './blm-software-section-one.component.scss'
})
export class BlmSoftwareSectionOneComponent {
  blmSoftwarePageData!: BLMSoftwarePageData;
  images!: any[];
  imagesUrls: string[] = [];

  @Input("pageData")
  set blmPageData(data: BLMSoftwarePageData) {
    this.blmSoftwarePageData = data;

    this.images =
        this.blmSoftwarePageData.data?.attributes?.sectionOneImages.data;

    this.images.forEach((image: any) => {
      this.imagesUrls.push(image.attributes.url);
    });
  }
}

