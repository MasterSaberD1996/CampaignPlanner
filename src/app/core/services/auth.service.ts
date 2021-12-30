import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app.module";
import {BehaviorSubject, Observable} from "rxjs";
import firebase from "firebase/compat";

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

  public signInWithEmail(email: string, password: string): void {
    void signInWithEmailAndPassword(auth, email, password);
  }

  public signInWithGoogle(): void {
    const provider = new GoogleAuthProvider();
    void signInWithPopup(auth, provider);
  }

  public signUpWithEmail(email: string, password: string): void {
    void createUserWithEmailAndPassword(auth, email, password);
  }
}
