import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HomepageService} from "./pages/homepage/homepage.service";
import {ServicesPageService} from "./pages/services/services-page.service";
import {HttpClientModule} from "@angular/common/http";
import {NavigationService} from "./components/navigation/navigation.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoadingIndicatorComponent} from "./components/loading-indicator/loading-indicator.component";
import {
    NgcCookieConsentConfig,
    NgcCookieConsentService, NgcInitializationErrorEvent, NgcInitializingEvent, NgcNoCookieLawEvent,
    NgcStatusChangeEvent
} from "ngx-cookieconsent";
import {AppModule} from "./app.module";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        AppModule,
        HttpClientModule,
        RouterOutlet,
        NavigationComponent,
        FooterComponent,
        NgbModule,
        LoadingIndicatorComponent,
    ],
    providers: [HomepageService, ServicesPageService, NavigationService, NgcCookieConsentConfig]
})
export class AppComponent implements OnInit, OnDestroy {

    //keep refs to subscriptions to be able to unsubscribe later
    private popupOpenSubscription!: Subscription;
    private popupCloseSubscription!: Subscription;
    private initializingSubscription!: Subscription;
    private initializedSubscription!: Subscription;
    private initializationErrorSubscription!: Subscription;
    private statusChangeSubscription!: Subscription;
    private revokeChoiceSubscription!: Subscription;
    private noCookieLawSubscription!: Subscription;

    /* TO DO: add cookie bot consents */


    constructor(private ccService: NgcCookieConsentService) {
    }

    ngOnInit() {

        // subscribe to cookieconsent observables to react to main events
        this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.initializingSubscription = this.ccService.initializing$.subscribe(
            (event: NgcInitializingEvent) => {
                // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
                console.log(`initializing: ${JSON.stringify(event)}`);
            });

        this.initializedSubscription = this.ccService.initialized$.subscribe(
            () => {
                // the cookieconsent has been successfully initialized.
                // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
                console.log(`initialized: ${JSON.stringify(event)}`);
            });

        this.initializationErrorSubscription = this.ccService.initializationError$.subscribe(
            (event: NgcInitializationErrorEvent) => {
                // the cookieconsent has failed to initialize...
                console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
            });

        this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
            (event: NgcStatusChangeEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
            });

        this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
            (event: NgcNoCookieLawEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
            });
    }


    ngOnDestroy() {
        // unsubscribe to cookieconsent observables to prevent memory leaks
        this.popupOpenSubscription.unsubscribe();
        this.popupCloseSubscription.unsubscribe();
        this.initializingSubscription.unsubscribe();
        this.initializedSubscription.unsubscribe();
        this.initializationErrorSubscription.unsubscribe();
        this.statusChangeSubscription.unsubscribe();
        this.revokeChoiceSubscription.unsubscribe();
        this.noCookieLawSubscription.unsubscribe();
    }
}
