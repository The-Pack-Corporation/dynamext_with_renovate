import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse, SupabaseClient} from '@supabase/supabase-js';
import { AuthenticationService } from '../services/authentication.service';
import { DbConnectionService } from '../services/db-connection.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginMode: boolean = true;

  constructor( private authService: AuthenticationService,
    private router: Router) {
     }

  

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
    console.log(this.loginMode);
  }

  onSubmit(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;

    var auth: Promise<AuthResponse>;

    if(this.loginMode) {
      auth = this.authService.logIn(email, password);
    } else {
       auth = this.authService.signUp(email, password);
    }

    auth.then((resData)=>{
      if(resData.error) {
        alert(resData.error.message); 
      } else {
        console.log(resData);
        this.authService.user.next(resData.data.user);
        this.authService.setSession(resData.data.session.access_token, resData.data.session.refresh_token);
        this.router.navigate(['/editor']);
      }
      authForm.reset();
    }).catch((error) => {
      console.log(error);
    });
    
  }

}
