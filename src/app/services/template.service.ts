import { EventEmitter, Injectable, Output } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { Template } from '../models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  public templateList: Template[] = [];

  @Output() templateSelectedEvent: EventEmitter<Template> = new EventEmitter();

  constructor() { }

  supabase = createClient('https://jjvwmwclufvreosovsow.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqdndtd2NsdWZ2cmVvc292c293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI5MTc4MjMsImV4cCI6MTk4ODQ5MzgyM30.2zvSxAyDCQwCPQrKLEgbOnlvhEyXkXe-Mq-ZFQ_J6xE');

  saveTemplate(template: Template) {
    this.templateList.push(template);
  }

  getTemplates() {
    return this.templateList.slice();
  }
}
