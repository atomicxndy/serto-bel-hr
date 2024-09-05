import {Component, Input} from '@angular/core';
import {AboutUsPageData} from "../../../shared/constants/common";

@Component({
  selector: 'sb-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  aboutUsPageData!: AboutUsPageData;
  resolvedImgUrl!: string;

  @Input("data")
  set aboutUsData(aboutUsPage: AboutUsPageData) {
    this.aboutUsPageData = aboutUsPage;

    this.resolvedImgUrl =
        this.aboutUsPageData.data?.attributes?.aboutUsMainImage.data.attributes.url;
  }
}
