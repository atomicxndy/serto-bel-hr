import {Component, Input} from '@angular/core';
import {HomepageData} from "../../../shared/constants/homepage";

@Component({
  selector: 'sb-about-section',
  standalone: true,
  imports: [],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss'
})
export class AboutSectionComponent {
  homepageData!: HomepageData;
  resolvedImgUrl!: string;

  @Input("data")
  set basicAboutSectionData(data: HomepageData) {
    this.homepageData = data;
    this.resolvedImgUrl =
        data.data.attributes.aboutSectionImage.data.attributes.url;
  }
}
