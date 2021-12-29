import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
