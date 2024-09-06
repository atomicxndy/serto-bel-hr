import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {Observable, tap} from "rxjs";
import {LoadingIndicatorService} from "./loading-indicator.service";
import {NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router} from "@angular/router";
import {AsyncPipe, NgTemplateOutlet} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'sb-loading-indicator',
  standalone: true,
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    MatProgressSpinner
  ],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent implements OnInit {
  loading$!: Observable<boolean>;
  @Input() detectRouteTransitions = false;

  constructor(
      private loadingIndicatorService: LoadingIndicatorService,
      private router: Router
  ) {
    this.loading$ = this.loadingIndicatorService.loading$;
  }

  ngOnInit() {
    this.router.events.pipe(tap((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingIndicatorService.loadingOn();
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingIndicatorService.loadingOff()
      }
    })).subscribe()
  }
}
