import { Component, Input } from "@angular/core";

@Component({
  selector: "sb-video-header",
  standalone: true,
  imports: [],
  templateUrl: "./video-header.component.html",
  styleUrl: "./video-header.component.scss",
})
export class VideoHeaderComponent {
  pageData!: any;
  video!: string;
  videoType!: string;

  @Input("emptyPageTitle") title!: string;

  @Input("data")
  set pageVideoHeader(pageData: any) {
    this.pageData = pageData;
    const videoData = this.pageData.data.attributes.headerVideo;

    this.video = videoData?.data.attributes.url!;
    this.videoType = videoData?.data.attributes.mime!;
  }
}
