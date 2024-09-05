import {Component, Input} from '@angular/core';
import {AboutUsPageData} from "../../../shared/constants/common";

@Component({
  selector: 'sb-cta',
  standalone: true,
  imports: [],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {
  @Input() data!: AboutUsPageData;
}
