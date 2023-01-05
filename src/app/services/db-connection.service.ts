import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DbConnectionService {

  public supabase = createClient('', '');

  constructor() { }
}
