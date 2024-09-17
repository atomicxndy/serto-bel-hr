import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LaserCuttingOfSheetsData } from "../../../shared/constants/service-pages";
import { ServicesPageService } from "../services-page.service";
import { RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: "sb-laser-cutting-of-sheets",
  standalone: true,
  imports: [RouterLink, AsyncPipe, HeaderComponent],
  templateUrl: "./laser-cutting-of-sheets.component.html",
  styleUrl: "./laser-cutting-of-sheets.component.scss",
})
export class LaserCuttingSheetsComponent implements OnInit {
  data$!: Observable<LaserCuttingOfSheetsData>;

  constructor(private servicesPageService: ServicesPageService) {}

  ngOnInit() {
    this.data$ = this.servicesPageService.getLaserCuttingOfSheetsPageData();
  }
}
