import { Component, OnInit } from "@angular/core";
import { ServicesPageService } from "./services-page.service";
import { Observable } from "rxjs";
import { ServicesData } from "../../shared/constants/service-pages";
import { AsyncPipe } from "@angular/common";
import { VideoHeaderComponent } from "../../components/video-header/video-header.component";
import { ServicesItemComponent } from "./services-item/services-item.component";

@Component({
  selector: "sb-services",
  standalone: true,
  imports: [AsyncPipe, VideoHeaderComponent, ServicesItemComponent],
  templateUrl: "./services.component.html",
  styleUrl: "./services.component.scss",
  providers: [ServicesPageService],
})
export class ServicesComponent implements OnInit {
  services$!: Observable<ServicesData>;

  constructor(private servicesPageService: ServicesPageService) {}

  ngOnInit() {
    this.services$ = this.servicesPageService.getServicesPageData();
  }
}
