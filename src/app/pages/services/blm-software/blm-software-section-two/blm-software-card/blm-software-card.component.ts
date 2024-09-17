import { Component, Input } from "@angular/core";
import { BLMCard } from "../../../../../shared/constants/service-pages";

@Component({
  selector: "sb-blm-software-card",
  standalone: true,
  imports: [],
  templateUrl: "./blm-software-card.component.html",
  styleUrl: "./blm-software-card.component.scss",
})
export class BlmSoftwareCardComponent {
  @Input() cardData!: BLMCard;
  @Input() image!: any;
}
