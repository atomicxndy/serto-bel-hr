import {Component, Input} from '@angular/core';
import {HomepageData} from "../../../shared/constants/homepage";
import {NgbAccordionDirective, NgbAccordionItem} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'sb-faq-section',
  standalone: true,
  imports: [
    NgbAccordionDirective,
    NgbAccordionItem
  ],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss'
})
export class FaqSectionComponent {
  @Input() data!: HomepageData;
}
