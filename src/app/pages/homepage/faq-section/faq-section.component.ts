import { Component, Input } from "@angular/core";
import { HomepageData } from "../../../shared/constants/homepage";
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
} from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";

@Component({
  selector: "sb-faq-section",
  standalone: true,
  imports: [
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody,
    RouterLink,
  ],
  templateUrl: "./faq-section.component.html",
  styleUrl: "./faq-section.component.scss",
})
export class FaqSectionComponent {
  @Input() data!: HomepageData;
}
