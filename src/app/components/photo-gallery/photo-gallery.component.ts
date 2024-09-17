import { Component, Input } from "@angular/core";
import { GalleryPageData } from "../../shared/constants/common";
import { InfiniteScrollDirective } from "ngx-infinite-scroll";

@Component({
  selector: "sb-photo-gallery",
  standalone: true,
  imports: [InfiniteScrollDirective],
  templateUrl: "./photo-gallery.component.html",
  styleUrl: "./photo-gallery.component.scss",
})
export class PhotoGalleryComponent {
  galleryPageData!: GalleryPageData;
  images!: any[];
  imagesUrls: string[] = [];

  @Input("data")
  set galleryPage(data: GalleryPageData) {
    this.galleryPageData = data;
    this.images = this.galleryPageData.data?.attributes?.images.data;

    this.images.forEach((image: any) => {
      this.imagesUrls.push(image.attributes.url);
    });
  }
}
