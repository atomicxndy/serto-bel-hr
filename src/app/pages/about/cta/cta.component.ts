import {Component, Input} from '@angular/core';
import {AboutUsPageData} from "../../../shared/constants/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'sb-cta',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {
  @Input() data!: AboutUsPageData;
}
