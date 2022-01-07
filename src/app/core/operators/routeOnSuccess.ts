import {Router} from "@angular/router";
import {Observable} from "rxjs";

export function routeOnSuccess(router: Router, ...route: string[]) {
  return (source: Observable<boolean>): Observable<boolean> => {
    return new Observable<boolean>(subscriber => {
      source.subscribe({
        next(value: boolean) {
          if (value) {
            router.navigate([...route])
          }
          subscriber.next(value);
        },
        error(error) {
          subscriber.error(error)
        },
        complete() {
          subscriber.complete()
        }
      });
    });
  }
}
