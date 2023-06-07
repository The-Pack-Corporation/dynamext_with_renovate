import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateVariable } from 'src/app/models/template-variable.model';
import { Template } from 'src/app/models/template.model';
import { TemplateService } from 'src/app/services/template.service';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { TextGeneratorFormComponent } from 'src/app/text-generator-form/text-generator-form.component';


export interface TemplateResponse{

  id: number,
  templateName: string,
  templateContent: string,
  templateHTML: string,
  templateVariables: [{
    variableName: string,
    variableType: string,
    id: number
  }]

}
@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {

  templateList: Template[] = [];
  templateToDelete: Template;


  @ViewChild('reactiveFormModal', {static : false}) reactiveFormModal : TextGeneratorFormComponent;
  @ViewChild('deleteConfirmation', {static:true}) deleteConfirmation: ConfirmationModalComponent;


  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {

    this.loadMyTemplates();
    
    this.templateService.templateDataEvent.subscribe((template: Template) => {
      this.loadMyTemplates();
    })

    this.templateService.templateSelectedEvent.subscribe( (template: Template) => {
      this.reactiveFormModal.show(template);
    })
  }

  loadMyTemplates() {
    this.templateList = [];
    this.templateService.getTemplatesbyUserId()
    .then((response) => {
       response.data.forEach((element:TemplateResponse)  => {
        this.templateList.push(
          new Template(
            element.templateName,
            element.templateContent,
            element.templateHTML,
            element.templateVariables,
            element.id
          )
        )
      });      
    })

  }

  onDeleteTemplate(template: Template) {
    this.templateToDelete = template;
    this.deleteConfirmation.show();
  }

  onDeleteTemplateConfirmed(){
    this.templateService.deleteTemplateVariablesbyTempId(this.templateToDelete.id)
    .then((result) => {
      return this.templateService.deleteTemplate(this.templateToDelete)
    })
    .then((r) => {
      let index = this.templateList.findIndex(temp => temp.id === this.templateToDelete.id);
      this.templateList.splice(index,1);
      console.log(r);
      this.templateToDelete = null;
    });

  }

  onDeleteTemplateCancelled() {
    this.templateToDelete = null;
  }
  



}
