import {Component} from '@angular/core';
import {ServicesPageService} from "./services-page.service";

@Component({
    selector: 'sb-services',
    standalone: true,
    imports: [],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss',
    providers: [ServicesPageService]
})
export class ServicesComponent {

}
