import { Component, Input } from "@angular/core";
import { BLMPageData } from "../../../../shared/constants/service-pages";

@Component({
  selector: "sb-blm-section-three",
  standalone: true,
  imports: [],
  templateUrl: "./blm-section-three.component.html",
  styleUrl: "./blm-section-three.component.scss",
})
export class BlmSectionThreeComponent {
  @Input() pageData!: BLMPageData;
}
