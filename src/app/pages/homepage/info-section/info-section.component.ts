import { Component, Input } from "@angular/core";
import { HomepageData } from "../../../shared/constants/homepage";

@Component({
  selector: "sb-info-section",
  standalone: true,
  imports: [],
  templateUrl: "./info-section.component.html",
  styleUrl: "./info-section.component.scss",
})
export class InfoSectionComponent {
  @Input() data!: HomepageData;
}
