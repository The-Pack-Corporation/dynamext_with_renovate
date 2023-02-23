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
      console.log("templateInserted", result);
      const templateId = result.data[0].id;
      template.id = templateId;
      this.addVariablesToTemplate(templateId, template.templateVariables);
    });

    this.templateDataEvent.emit(template);

  }

  updateTemplate(template: Template) {
    var user_id ='';
    this.auth.user.subscribe(user => {
      user_id = user.id;
    });

    this.supabase
    .from('template')
    .update({ templateName: template.templateName,
              templateContent: template.templateContent,
              templateHTML: template.templateHTML })
    .eq('id', template.id)
    .select()
    .then(result => {
      this.updateTemplateVariables(template.id, template.templateVariables);
    });

  }



  addVariablesToTemplate(templateId: number, templateVariables: TemplateVariable[]) {
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

  updateTemplateVariables(templateId: number, templateVariables: TemplateVariable[]) {
    var templatesToInsert = [];
    var templateUpdateValue = [];

    templateVariables.forEach(element => {
      //if id available upsert or else insert
      if(element.id){
        templateUpdateValue.push({ 
          id: element.id,
          templateId: templateId,
          variableName: element.variableName,
          variableType: element.variableType});    
      } else {
        templatesToInsert.push(element); 
      }
    });

    this.supabase
    .from('templateVariables')
    .upsert(templateUpdateValue)
    .select()
    .then((result) => {
      console.log(result);
      this.addVariablesToTemplate(templateId, templatesToInsert);
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
    id,
    templateName,
    templateContent,
    templateHTML,
    templateVariables (
      variableName,
      variableType,
      id
    )
  `)
  .eq('user_id', user_id)
  
}

  getTemplatebyTemplateId(templateId: number) {
    var user_id ='';
    this.auth.user.subscribe(user => {
      if(user) {
        user_id = user.id;
      }
    });
  return this.supabase
  .from('template')
  .select(`
  id,
  templateName,
  templateContent,
  templateHTML,
  templateVariables (
    variableName,
    variableType,
    id
  )
`)
  .eq('user_id', user_id)
  .eq('id', templateId);
  }
  

  getTemplates() {
    return this.templateList.slice();
  }

  deleteTemplateVariable(templateVariable: TemplateVariable) {

  return this.supabase
  .from('templateVariables')
  .delete()
  .eq('id', templateVariable.id);
  }

}
