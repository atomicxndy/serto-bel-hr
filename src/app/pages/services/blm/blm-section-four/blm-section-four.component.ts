import {Component, Input} from '@angular/core';
import {BLMPageData} from "../../../../shared/constants/service-pages";

@Component({
  selector: 'sb-blm-section-four',
  standalone: true,
  imports: [],
  templateUrl: './blm-section-four.component.html',
  styleUrl: './blm-section-four.component.scss'
})
export class BlmSectionFourComponent {
  @Input() pageData!: BLMPageData;
}
