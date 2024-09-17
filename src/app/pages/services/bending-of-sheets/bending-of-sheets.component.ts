import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BendingPageData } from "../../../shared/constants/service-pages";
import { ServicesPageService } from "../services-page.service";
import { VideoHeaderComponent } from "../../../components/video-header/video-header.component";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "sb-bending-of-sheets",
  standalone: true,
  imports: [VideoHeaderComponent, AsyncPipe],
  templateUrl: "./bending-of-sheets.component.html",
  styleUrl: "./bending-of-sheets.component.scss",
})
export class BendingOfSheetsComponent implements OnInit {
  data$!: Observable<BendingPageData>;

  constructor(private servicesPageService: ServicesPageService) {}

  ngOnInit() {
    this.data$ = this.servicesPageService.getBendingPageData();
  }
}
