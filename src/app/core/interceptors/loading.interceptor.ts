import { Injectable } from "@angular/core";
import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { LoadingIndicatorService } from "../../components/loading-indicator/loading-indicator.service";
import { finalize, Observable } from "rxjs";

export const SkipLoading = new HttpContextToken<boolean>(() => false);

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingIndicatorService: LoadingIndicatorService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.context.get(SkipLoading)) {
      return next.handle(req);
    }

    this.loadingIndicatorService.loadingOn();

    return next.handle(req).pipe(
      finalize(() => {
        this.loadingIndicatorService.loadingOff();
      }),
    );
  }
}
