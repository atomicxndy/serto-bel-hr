import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {LaserCuttingOfPipesData} from "../../../shared/constants/service-pages";
import {ServicesPageService} from "../services-page.service";
import {AsyncPipe} from "@angular/common";
import {HeaderComponent} from "../../../components/header/header.component";

@Component({
  selector: 'sb-laser-cutting-of-pipes',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent
  ],
  templateUrl: './laser-cutting-of-pipes.component.html',
  styleUrl: './laser-cutting-of-pipes.component.scss'
})
export class LaserCuttingOfPipesComponent {
  data$!: Observable<LaserCuttingOfPipesData>;

  constructor(private servicesPageService: ServicesPageService) {}

  ngOnInit() {
    this.data$ = this.servicesPageService.getLaserCuttingOfPipesPageData();
  }
}
