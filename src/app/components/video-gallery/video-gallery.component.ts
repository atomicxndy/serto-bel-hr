import {Component, Input} from '@angular/core';
import {GalleryPageData} from "../../shared/constants/common";

@Component({
  selector: 'sb-video-gallery',
  standalone: true,
  imports: [],
  templateUrl: './video-gallery.component.html',
  styleUrl: './video-gallery.component.scss'
})
export class VideoGalleryComponent {
  galleryPageData!: GalleryPageData;
  videos!: any[];
  videosUrls: string[] = [];

  //public player;

  @Input("data")
  set galleryPage(data: GalleryPageData) {
    this.galleryPageData = data;

    this.videos = this.galleryPageData.data?.attributes?.videos.data;

    this.videos.forEach((video: any) => {
      this.videosUrls.push(video.attributes.url);
    });
  }
}
