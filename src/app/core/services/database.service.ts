import { Injectable } from '@angular/core';
import { database } from '../../app.module';
import {filter, from, map, Observable, switchMap} from "rxjs";
import {AuthService} from "./auth.service";
import { ref, getDatabase, goOnline, query } from 'firebase/database';
import { app } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public loadedData$: Observable<any>;

  constructor(
    private readonly authService: AuthService
  ) {
    this.loadedData$ = this.authService.currentUser
      .pipe(
        filter((user) => !!user),
        map((user) => {
          if (!user) {
            throw "User expected"
          }
          const database = getDatabase(app);
          goOnline(database);
          return query(ref(database, `users/${user.uid}/campaigns`)).toJSON();
        })
      );
  }
}
