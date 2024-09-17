import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BystronicPageData } from "../../../shared/constants/service-pages";
import { ServicesPageService } from "../services-page.service";
import { HeaderComponent } from "../../../components/header/header.component";
import { AsyncPipe } from "@angular/common";
import { BystronicImagesComponent } from "./bystronic-images/bystronic-images.component";

@Component({
  selector: "sb-bystronic",
  standalone: true,
  imports: [HeaderComponent, AsyncPipe, BystronicImagesComponent],
  templateUrl: "./bystronic.component.html",
  styleUrl: "./bystronic.component.scss",
})
export class BystronicComponent implements OnInit {
  data$!: Observable<BystronicPageData>;

  constructor(private servicesPageService: ServicesPageService) {}

  ngOnInit() {
    this.data$ = this.servicesPageService.getBystronicPageData();
  }
}
