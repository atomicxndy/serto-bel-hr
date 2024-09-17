import { Component, Input } from "@angular/core";
import { BLMSoftwareTextComponentData } from "../../../../shared/constants/service-pages";
import { NgStyle } from "@angular/common";

@Component({
  selector: "sb-blm-image-text",
  standalone: true,
  imports: [NgStyle],
  templateUrl: "./blm-image-text.component.html",
  styleUrl: "./blm-image-text.component.scss",
})
export class BlmImageTextComponent {
  @Input() data!: BLMSoftwareTextComponentData;
  @Input() image!: any;
}
