import {Component, Input} from '@angular/core';
import {BystronicPageData} from "../../../../shared/constants/service-pages";

@Component({
  selector: 'sb-bystronic-images',
  standalone: true,
  imports: [],
  templateUrl: './bystronic-images.component.html',
  styleUrl: './bystronic-images.component.scss'
})
export class BystronicImagesComponent {
  bystronicPageData!: BystronicPageData;
  images!: string[];
  imagesUrls: string[] = [];

  @Input("images")
  set imagesData(data: BystronicPageData) {
    this.bystronicPageData = data;

    this.images = this.bystronicPageData.data?.attributes?.images?.data;

    this.images.forEach((image: any) => {
      this.imagesUrls.push(image.attributes.url);
    });
  }
}
