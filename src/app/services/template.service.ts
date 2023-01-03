import { EventEmitter, Injectable, Output } from '@angular/core';
import { Template } from '../models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  public templateList: Template[] = [];

  @Output() templateSelectedEvent: EventEmitter<Template> = new EventEmitter();

  constructor() { }

  saveTemplate(template: Template) {
    this.templateList.push(template);
  }

  getTemplates() {
    return this.templateList.slice();
  }
}
