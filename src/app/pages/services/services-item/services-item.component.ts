import {Component, Input} from '@angular/core';
import {BasicServiceData} from "../../../shared/constants/service-pages";
import {RouterLink} from "@angular/router";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'sb-services-item',
  standalone: true,
  imports: [
    RouterLink,
    NgStyle
  ],
  templateUrl: './services-item.component.html',
  styleUrl: './services-item.component.scss'
})
export class ServicesItemComponent {
  @Input() service!: BasicServiceData;
  @Input() image!: any;
}
