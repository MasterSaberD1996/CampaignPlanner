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

  constructor() {
    auth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
    })
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

  public signInWithGoogle(): void {
    const provider = new GoogleAuthProvider();
    void signInWithPopup(auth, provider);
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
