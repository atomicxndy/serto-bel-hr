import {Routes} from "@angular/router";
import {ContactComponent} from "./pages/contact/contact.component";
import {FaqComponent} from "./pages/faq/faq.component";
import {GdprComponent} from "./pages/gdpr/gdpr.component";
import {EuFondsComponent} from "./pages/eu-fonds/eu-fonds.component";
import {TermsAndPolicyComponent} from "./pages/terms-and-policy/terms-and-policy.component";
import {ServicesComponent} from "./pages/services/services.component";
import {BendingOfSheetsComponent} from "./pages/services/bending-of-sheets/bending-of-sheets.component";
import {LaserCuttingOfPipesComponent} from "./pages/services/laser-cutting-of-pipes/laser-cutting-of-pipes.component";
import {BlmComponent} from "./pages/services/blm/blm.component";
import {BlmSoftwareComponent} from "./pages/services/blm-software/blm-software.component";
import {PrimaComponent} from "./pages/services/prima/prima.component";
import {BystronicComponent} from "./pages/services/bystronic/bystronic.component";
import {GalleryComponent} from "./pages/gallery/gallery.component";
import {CareersComponent} from "./pages/careers/careers.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {AboutComponent} from "./pages/about/about.component";
import {LaserCuttingSheetsComponent} from "./pages/services/laser-cutting-of-sheets/laser-cutting-of-sheets.component";

export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent,
        pathMatch: 'full'
    },
    {
        path: "about-us",
        component: AboutComponent,
        pathMatch: 'full'
    },
    {
        path: "contact-us",
        component: ContactComponent,
        pathMatch: 'full'
    },
    {
        path: "faq",
        component: FaqComponent,
        pathMatch: 'full'
    },
    {
        path: "gdpr",
        component: GdprComponent,
        pathMatch: 'full'
    },
    {
        path: "eu-fonds",
        component: EuFondsComponent,
        pathMatch: 'full'
    },
    {
        path: "terms-and-privacy",
        component: TermsAndPolicyComponent,
        pathMatch: 'full'
    },
    {
        path: "services",
        component: ServicesComponent,
        pathMatch: 'full'
    },
    {
        path: "bending-of-sheets",
        component: BendingOfSheetsComponent,
        pathMatch: 'full'
    },
    {
        path: "laser-cutting-of-pipes",
        component: LaserCuttingOfPipesComponent,
        pathMatch: 'full'
    },
    {
        path: "laser-cutting-of-sheets",
        component: LaserCuttingSheetsComponent,
        pathMatch: 'full'
    },
    {
        path: "blm",
        component: BlmComponent,
        pathMatch: 'full'
    },
    {
        path: "blm-software",
        component: BlmSoftwareComponent,
        pathMatch: 'full'
    },
    {
        path: "prima",
        component: PrimaComponent,
        pathMatch: 'full'
    },
    {
        path: "bystronic",
        component: BystronicComponent,
        pathMatch: 'full'
    },
    {
        path: "gallery",
        component: GalleryComponent,
        pathMatch: 'full'
    },
    {
        path: "careers",
        component: CareersComponent,
        pathMatch: 'full'
    },
];