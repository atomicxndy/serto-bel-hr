import { Component, Input } from "@angular/core";
import { HomepageData } from "../../../shared/constants/homepage";
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "sb-eu-fonds-section",
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: "./eu-fonds-section.component.html",
  styleUrl: "./eu-fonds-section.component.scss",
})
export class EuFondsSectionComponent {
  @Input() data!: HomepageData;
}
