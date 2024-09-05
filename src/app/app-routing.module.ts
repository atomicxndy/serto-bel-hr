import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: "",
        loadComponent: () =>
            import("./pages/homepage/homepage.component").then(
                (c) => c.HomepageComponent,
            ),
        title: "Home",
    },
    {
        path: "about-us",
        loadComponent: () =>
            import("./pages/about/about.component").then((c) => c.AboutComponent),
        title: "About Us",
    },
    {
        path: "contact-us",
        loadComponent: () =>
            import("./pages/contact/contact.component").then(
                (c) => c.ContactComponent,
            ),
        title: "Contact Us",
    },
    {
        path: "faq",
        loadComponent: () =>
            import("./pages/faq/faq.component").then((c) => c.FaqComponent),
        title: "FAQ",
    },
    {
        path: "gdpr",
        loadComponent: () =>
            import("./pages/gdpr/gdpr.component").then((c) => c.GdprComponent),
        title: "GDPR",
    },
    {
        path: "eu-fonds",
        loadComponent: () =>
            import("./pages/eu-fonds/eu-fonds.component").then(
                (c) => c.EuFondsComponent,
            ),
        title: "EU Fonds",
    },
    {
        path: "terms-and-privacy",
        loadComponent: () =>
            import("./pages/terms-and-policy/terms-and-policy.component").then(
                (c) => c.TermsAndPolicyComponent,
            ),
        title: "Terms and Privacy",
    },
    {
        path: "services",
        loadComponent: () =>
            import("./pages/services/services.component").then(
                (c) => c.ServicesComponent,
            ),
        title: "Services",
    },
    {
        path: "bending-of-sheets",
        loadComponent: () =>
            import(
                "./pages/services/bending-of-sheets/bending-of-sheets.component"
                ).then((c) => c.BendingOfSheetsComponent),
        title: "Bending of sheets",
    },
    {
        path: "laser-cutting-of-pipes",
        loadComponent: () =>
            import(
                "./pages/services/laser-cutting-of-pipes/laser-cutting-of-pipes.component"
                ).then((c) => c.LaserCuttingOfPipesComponent),
        title: "Laser cutting of pipes",
    },
    {
        path: "laser-cutting-of-sheets",
        loadComponent: () =>
            import(
                "./pages/services/laser-cutting-of-sheets/laser-cutting-of-sheets.component"
                ).then((c) => c.LaserCuttingOfSheetsComponent),
        title: "Laser cutting of sheets",
    },
    {
        path: "blm",
        loadComponent: () =>
            import("./pages/services/blm/blm.component").then((c) => c.BlmComponent),
        title: "BLM",
    },
    {
        path: "blm-software",
        loadComponent: () =>
            import("./pages/services/blm-software/blm-software.component").then(
                (c) => c.BlmSoftwareComponent,
            ),
        title: "BLM Software",
    },
    {
        path: "prima",
        loadComponent: () =>
            import("./pages/services/prima/prima.component").then(
                (c) => c.PrimaComponent,
            ),
        title: "Prima",
    },
    {
        path: "bystronic",
        loadComponent: () =>
            import("./pages/services/bystronic/bystronic.component").then(
                (c) => c.BystronicComponent,
            ),
        title: "Bystronic",
    },
    {
        path: "gallery",
        loadComponent: () =>
            import("./pages/gallery/gallery.component").then(
                (c) => c.GalleryComponent,
            ),
        title: "Gallery",
    },
    {
        path: "careers",
        loadComponent: () =>
            import("./pages/careers/careers.component").then(
                (c) => c.CareersComponent,
            ),
        title: "Careers",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
