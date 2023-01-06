import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { DbConnectionService } from './db-connection.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = new BehaviorSubject<User>(null);
  supabase : SupabaseClient;
  constructor(private supabaseService: DbConnectionService,
    private router: Router) {

    this.supabase = this.supabaseService.supabase;    
    this.supabase.auth.onAuthStateChange((event, session: Session) => {
      if(event === "TOKEN_REFRESHED" || event === "SIGNED_IN") {
        this.user.next(session.user);
      }
    });

   }
  

  signUp(email: string, password: string) {

    return this.supabase.auth.signUp({
      email: email,
      password: password
    })

  }

  logIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

  }

  setSession(access_token, refresh_token) {
    this.supabase.auth.setSession({
      access_token,
      refresh_token
    }).then((response) => {
      console.log("session set", response);
    })
    
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    this.supabase.auth.signOut();
  }



}
