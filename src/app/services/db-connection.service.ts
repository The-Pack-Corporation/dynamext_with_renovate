import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbConnectionService {

  public supabase = createClient('',
  '');

  constructor() { }
}
