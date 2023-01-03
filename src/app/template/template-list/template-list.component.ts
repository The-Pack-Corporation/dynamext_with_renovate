import { Component, OnInit, ViewChild } from '@angular/core';
import { Template } from 'src/app/models/template.model';
import { TemplateService } from 'src/app/services/template.service';
import { TextGeneratorFormComponent } from 'src/app/text-generator-form/text-generator-form.component';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {

  templateList: Template[] = [];


  @ViewChild('reactiveFormModal', {static : false}) reactiveFormModal : TextGeneratorFormComponent;


  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
    this.templateList = this.templateService.getTemplates();

    this.templateService.templateSelectedEvent.subscribe( (template: Template) => {
      this.reactiveFormModal.show(template);
    })
  }

  



}
