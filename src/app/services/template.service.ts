import { EventEmitter, Injectable, Output } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { TemplateVariable } from '../models/template-variable.model';
import { Template } from '../models/template.model';
import { AuthenticationService } from './authentication.service';
import { DbConnectionService } from './db-connection.service';


@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  public templateList: Template[] = [];
  supabase: SupabaseClient;

  @Output() templateSelectedEvent: EventEmitter<Template> = new EventEmitter();
  @Output() templateDataEvent: EventEmitter<Template> = new EventEmitter();

  constructor(private supabaseConn: DbConnectionService,
    private auth: AuthenticationService) {

    this.supabase = this.supabaseConn.supabase;
   }


  saveTemplate(template: Template) {
    var user_id ='';
    this.auth.user.subscribe(user => {
      user_id = user.id;
    });
    
    this.supabase
    .from('template')
    .insert([
      {user_id : user_id, 
      templateName: template.templateName,
      templateContent: template.templateContent,
      templateHTML: template.templateHTML },
    ])
    .select()
    .then(result => {
      const templateId = result.data[0].id;
      this.addVariablesToTemplate(templateId, template.templateVariables);
    });

    this.templateDataEvent.emit(template);

  }

  addVariablesToTemplate(templateId: string, templateVariables: TemplateVariable[]) {
    var templateInsertValue = [];
    templateVariables.forEach(element => {
      templateInsertValue.push({templateId: templateId, 
      variableName: element.variableName,
    variableType: element.variableType});
    });

    this.supabase
    .from('templateVariables')
    .insert(templateInsertValue)
    .select()
    .then((result) => {
      console.log(result);
    });

  }

  getTemplatesbyUserId() {
    var user_id ='';
    this.auth.user.subscribe(user => {
      if(user) {
        user_id = user.id;
      }
    });
  return this.supabase
  .from('template')
  .select(`
    templateName,
    templateContent,
    templateHTML,
    templateVariables (
      variableName,
      variableType
    )
  `)
  .eq('user_id', user_id)
  
}

  getTemplatebyTemplateId(templateId) {
    var user_id ='';
    this.auth.user.subscribe(user => {
      if(user) {
        user_id = user.id;
      }
    });
  this.supabase
  .from('template')
  .select(`
  templateName,
  templateContent,
  templateHTML,
  templateVariables (
    variableName,
    variableType
  )
`)
  .eq('user_id', user_id)
  .eq('id', 5)
  .then((data) => {
    console.log("templateByID", data);
  }); 

  }
  

  getTemplates() {
    return this.templateList.slice();
  }
}
