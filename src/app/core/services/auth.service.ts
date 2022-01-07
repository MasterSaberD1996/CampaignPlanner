import {Injectable} from '@angular/core';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import {auth} from "../../app.module";
import {BehaviorSubject, catchError, from, map, Observable, of} from "rxjs";
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any | null> = new BehaviorSubject<firebase.User | null>(null);
  public currentUser: Observable<firebase.User | null> = this.userSubject.asObservable();
  private initSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public init$: Observable<boolean> = this.initSubject.asObservable();

  constructor() {
    auth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
      if (!this.initSubject.value) {
        this.initSubject.next(true);
      }
    })
  }

  public setUserInitialized(isInitialized: boolean): void {
    this.initSubject.next(isInitialized);
  }

  public signInWithEmail(email: string, password: string): Observable<boolean> {
    return from(signInWithEmailAndPassword(auth, email, password)).pipe(
      map((user) => {
        return !!user;
      }),
      catchError((err: FirebaseError) => {
        return of(false);
      })
    );
  }

  public signInWithGoogle(): Observable<boolean> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(auth, provider))
      .pipe(
        map((user) => {
          return !!user;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public signUpWithEmail(email: string, password: string): Observable<boolean> {
    return from(createUserWithEmailAndPassword(auth, email, password))
      .pipe(
        map((user) => {
          return !!user;
        }),
        catchError((err: FirebaseError) => {
          return of(false);
        })
      );
  }
}
