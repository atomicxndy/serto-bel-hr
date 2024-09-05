import {Component, Input} from '@angular/core';
import {ContactUsPage} from "../../../shared/constants/common";

@Component({
  selector: 'sb-additional-info',
  standalone: true,
  imports: [],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.scss'
})
export class AdditionalInfoComponent {
  @Input() data!: ContactUsPage;
}
