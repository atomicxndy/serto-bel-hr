import { Component, Input } from "@angular/core";
import { HomepageData } from "../../../shared/constants/homepage";

@Component({
  selector: "sb-achievement-section",
  standalone: true,
  imports: [],
  templateUrl: "./achievement-section.component.html",
  styleUrl: "./achievement-section.component.scss",
})
export class AchievementSectionComponent {
  @Input() data!: HomepageData;
}
