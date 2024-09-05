import {Component, Input} from '@angular/core';
import {HomepageData} from "../../../shared/constants/homepage";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'sb-cta-section',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './cta-section.component.html',
  styleUrl: './cta-section.component.scss'
})
export class CtaSectionComponent {
  @Input() data!: HomepageData;
}
