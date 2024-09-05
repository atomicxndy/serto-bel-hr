import { PipeTransform, Pipe } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
    name: "bypassSecurity",
    standalone: true,
})
export class BypassSecurityPipe implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) {}

    transform(v: string): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(v);
    }
}
