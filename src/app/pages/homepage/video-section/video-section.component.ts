import { Component, Input } from "@angular/core";
import { HomepageData } from "../../../shared/constants/homepage";
import { RouterLink } from "@angular/router";

@Component({
  selector: "sb-video-section",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./video-section.component.html",
  styleUrl: "./video-section.component.scss",
})
export class VideoSectionComponent {
  homepageData!: HomepageData;
  video!: string;
  videoType!: string;
  resolvedImgUrl!: string;

  @Input("data")
  set videoBackgroundUrl(data: HomepageData) {
    this.homepageData = data;
    const videoData = data.data.attributes.videoBackground;
    const imageData = data.data.attributes.videoBackgroundLogo.data.attributes;

    this.video = videoData?.data.attributes.url!;
    this.resolvedImgUrl = imageData.url;
    this.videoType = videoData?.data.attributes.mime!;
  }
}
