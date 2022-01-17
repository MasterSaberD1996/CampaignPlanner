import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ICampaign} from "../models/campaign.model";

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

export function routeToCampaignOnSuccess(router: Router) {
  return (source: Observable<ICampaign>): Observable<ICampaign> => {
    return new Observable<ICampaign>(subscriber => {
      source.subscribe({
        next(value: ICampaign) {
          void router.navigate(['campaigns', value.id])
          subscriber.next(value);
        },
        error(error) {
          subscriber.error(error)
        },
        complete() {
          subscriber.complete();
        }
      })
    })
  }
}
