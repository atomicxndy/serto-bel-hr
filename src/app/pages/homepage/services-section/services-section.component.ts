import { Component, Input } from "@angular/core";
import { HomepageData } from "../../../shared/constants/homepage";
import { RouterLink } from "@angular/router";

@Component({
  selector: "sb-services-section",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./services-section.component.html",
  styleUrl: "./services-section.component.scss",
})
export class ServicesSectionComponent {
  @Input() data!: HomepageData;
}
