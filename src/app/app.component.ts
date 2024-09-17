import {Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HomepageService} from "./pages/homepage/homepage.service";
import {ServicesPageService} from "./pages/services/services-page.service";
import {NavigationService} from "./components/navigation/navigation.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoadingIndicatorComponent} from "./components/loading-indicator/loading-indicator.component";
import {AppModule} from "./app.module";

import {DOCUMENT} from "@angular/common";

const COOKIE_CONSENT = "Cookie Consent"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        AppModule,
        RouterOutlet,
        NavigationComponent,
        FooterComponent,
        NgbModule,
        LoadingIndicatorComponent,
    ],
    providers: [HomepageService, ServicesPageService, NavigationService]
})
export class AppComponent implements OnInit {

    constructor(@Inject(DOCUMENT) private document: Document) {}

    ngOnInit() {
        this.setCookieBotScript();
    }

    setCookieBotScript() {

        const script = this.document.createElement('script');
        script.setAttribute('data-cbid', '036e141a-e4f8-4600-b432-9d811b086581')
        script.id = "Cookiebot";
        script.type = "text/javascript";
        script.src = "https://consent.cookiebot.com/uc.js";

        this.document.head.appendChild(script);
    }
}
