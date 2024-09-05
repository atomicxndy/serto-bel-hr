import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HomepageData} from "../../shared/constants/homepage";
import {HomepageService} from "./homepage.service";
import {AsyncPipe} from "@angular/common";
import {VideoSectionComponent} from "./video-section/video-section.component";
import {AchievementSectionComponent} from "./achievement-section/achievement-section.component";
import {AboutSectionComponent} from "./about-section/about-section.component";
import {ServicesSectionComponent} from "./services-section/services-section.component";
import {FaqSectionComponent} from "./faq-section/faq-section.component";
import {InfoSectionComponent} from "./info-section/info-section.component";
import {CtaSectionComponent} from "./cta-section/cta-section.component";
import {EuFondsSectionComponent} from "./eu-fonds-section/eu-fonds-section.component";

@Component({
  selector: 'sb-homepage',
  standalone: true,
  imports: [
    AsyncPipe,
    VideoSectionComponent,
    AchievementSectionComponent,
    AboutSectionComponent,
    ServicesSectionComponent,
    FaqSectionComponent,
    InfoSectionComponent,
    CtaSectionComponent,
    EuFondsSectionComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  data$!: Observable<HomepageData>

  constructor(private homepageService: HomepageService) {}

  ngOnInit() {
    this.data$ = this.homepageService.getHomepageData();
  }
}
