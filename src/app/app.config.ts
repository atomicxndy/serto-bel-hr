import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    provideHttpClient,
    withFetch,
    withInterceptorsFromDi
} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {LoadingIndicatorService} from "./components/loading-indicator/loading-indicator.service";
import {LoadingInterceptor} from "./core/interceptors/loading.interceptor";
import {NgcCookieConsentService} from "ngx-cookieconsent";

export const appConfig: ApplicationConfig = {
    providers: [
        HttpClient,
        BrowserModule,
        LoadingIndicatorService,
        NgcCookieConsentService,
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideClientHydration(), provideAnimationsAsync(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },]
};
