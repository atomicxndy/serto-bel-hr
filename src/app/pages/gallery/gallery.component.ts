import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GalleryPageData} from "../../shared/constants/common";
import {HttpClient} from "@angular/common/http";
import {EndpointBuilderService} from "../../shared/services/endpoint-builder.service";
import {commonPagesEndpoints} from "../../shared/endpoints/endpoints";
import {HeaderComponent} from "../../components/header/header.component";
import {PhotoGalleryComponent} from "../../components/photo-gallery/photo-gallery.component";
import {VideoGalleryComponent} from "../../components/video-gallery/video-gallery.component";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'sb-gallery',
    standalone: true,
    imports: [
        HeaderComponent,
        PhotoGalleryComponent,
        VideoGalleryComponent,
        AsyncPipe
    ],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
    data$!: Observable<GalleryPageData>;

    constructor(
        private httpClient: HttpClient,
        private endpointBuilderService: EndpointBuilderService,
    ) {
    }

    ngOnInit() {
        this.data$ = this.getImageAndVideoGalleryPageData();
    }

    getImageAndVideoGalleryPageData(): Observable<GalleryPageData> {
        const url = this.endpointBuilderService.buildEndpointUrl(
            commonPagesEndpoints.galleryPage);
        return this.httpClient.get<GalleryPageData>(url);
    }
}
