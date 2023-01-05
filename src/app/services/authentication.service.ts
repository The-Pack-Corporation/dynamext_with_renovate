import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { DbConnectionService } from './db-connection.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;


  constructor(private supabaseService: DbConnectionService) { }
  supabase = this.supabaseService.supabase;

  signUp(email: string, password: string) {

    return this.supabase.auth.signUp({
      email: email,
      password: password,
    });

  }

  logIn() {

    return this.supabase.auth.signInWithPassword({
      email: 'example@email.com',
      password: 'example-password',
    });

  }

  logOut() {
    return this.supabase.auth.signOut();
    //max have handled it differently
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogOut(expirationDuration);
    }

  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);

  }

  private handleAuthentication( //call it with sign in and sign up
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

}
