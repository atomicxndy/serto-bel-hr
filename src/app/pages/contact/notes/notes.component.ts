import {Component, Input} from '@angular/core';
import {ContactUsPage} from "../../../shared/constants/common";

@Component({
  selector: 'sb-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  @Input() data!: ContactUsPage;
}
