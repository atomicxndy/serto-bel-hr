import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HomepageService} from "./pages/homepage/homepage.service";
import {ServicesPageService} from "./pages/services/services-page.service";
import {HttpClientModule} from "@angular/common/http";
import {NavigationService} from "./components/navigation/navigation.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoadingIndicatorComponent} from "./components/loading-indicator/loading-indicator.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        HttpClientModule,
        RouterOutlet,
        NavigationComponent,
        FooterComponent,
        NgbModule,
        LoadingIndicatorComponent,
    ],
    providers: [HomepageService, ServicesPageService, NavigationService]
})
export class AppComponent {
    title = 'serto-bel-hr';
}
