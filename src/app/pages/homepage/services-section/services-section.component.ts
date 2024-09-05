import {Component, Input} from '@angular/core';
import {HomepageData} from "../../../shared/constants/homepage";

@Component({
  selector: 'sb-services-section',
  standalone: true,
  imports: [],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {
  @Input() data!: HomepageData
}
