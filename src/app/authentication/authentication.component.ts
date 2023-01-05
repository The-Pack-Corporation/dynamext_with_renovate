import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbConnectionService } from '../services/db-connection.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private supabaseService: DbConnectionService) { }

  supabase = this.supabaseService.supabase;

  ngOnInit(): void {
  }

  onSubmit(authForm: NgForm) {

    
   

    

    
  }

}
