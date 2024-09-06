import {Inject} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Inject({ providedIn: "root" })
export class LoadingIndicatorService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    loadingOn() {
        this.loadingSubject.next(true);
    }

    loadingOff() {
        this.loadingSubject.next(false);
    }
}