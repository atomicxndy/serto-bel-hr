import { Component, OnInit } from "@angular/core";
import { PrimaData } from "../../../shared/constants/service-pages";
import { Observable } from "rxjs";
import { ServicesPageService } from "../services-page.service";
import { AsyncPipe } from "@angular/common";
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: "sb-prima",
  standalone: true,
  imports: [AsyncPipe, HeaderComponent],
  templateUrl: "./prima.component.html",
  styleUrl: "./prima.component.scss",
})
export class PrimaComponent implements OnInit {
  data$!: Observable<PrimaData>;

  constructor(private servicesPageService: ServicesPageService) {}

  ngOnInit() {
    this.data$ = this.servicesPageService.getPrimaPageData();

    console.log(
      this.servicesPageService
        .getPrimaPageData()
        .subscribe((data) => console.log(data)),
    );
  }
}
