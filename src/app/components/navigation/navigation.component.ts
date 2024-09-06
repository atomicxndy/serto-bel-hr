import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {HeaderLogo, HomepageData} from "../../shared/constants/homepage";
import {filter, Observable, take} from "rxjs";
import {NavigationData, NavigationService} from "./navigation.service";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {HomepageService} from "../../pages/homepage/homepage.service";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'sb-navigation',
  standalone: true,
    imports: [
        RouterLink,
        AsyncPipe,
        NgOptimizedImage,
        NgbCollapse
    ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, AfterContentChecked  {
  url!: string;
  selectedLang!: string;
  mainLogoUrl!: string;
  isMenuCollapsed = true;
  data$!: Observable<NavigationData>;

  availableLangs = ["hr", "en"];

  constructor(
      private router: Router,
      private homepageService: HomepageService,
      private navigationService: NavigationService,
  ) {}

  ngOnInit() {
    this.homepageService
        .getHeaderLogos()
        .pipe(take(1))
        .subscribe((header: HeaderLogo) => {
          this.mainLogoUrl =
              header.data?.attributes?.mainLogo.data.attributes.url;
        });

    this.homepageService
        .getHomepageData()
        .pipe(take(1))
        .subscribe((homepageData: HomepageData) => {
          this.selectedLang = homepageData.data.attributes.locale!;
        });

    this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
          // @ts-ignore
          this.route = event["url"];
        });

    this.data$ = this.navigationService.getMainNavigationData();
  }

  ngAfterContentChecked() {
    this.url = this.router.url;
  }

  setPageLanguage(value: string) {
    if (value === "hr") {
      this.router.navigateByUrl("/");
    } else if (value === "en") {
        // change url to correct one after deployment
      window.open("https://serto-bel-eng.web.app/", "_blank");
    }
  }
}
