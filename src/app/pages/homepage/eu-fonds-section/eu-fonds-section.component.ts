import {Component, Input} from '@angular/core';
import {HomepageData} from "../../../shared/constants/homepage";

@Component({
  selector: 'sb-eu-fonds-section',
  standalone: true,
  imports: [],
  templateUrl: './eu-fonds-section.component.html',
  styleUrl: './eu-fonds-section.component.scss'
})
export class EuFondsSectionComponent {
  @Input() data!: HomepageData;
}
