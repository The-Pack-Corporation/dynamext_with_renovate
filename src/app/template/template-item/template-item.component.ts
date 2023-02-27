import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Template } from 'src/app/models/template.model';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.css']
})
export class TemplateItemComponent implements OnInit { 

  @Input() template: Template; 
  @Output() deleteTemplate: EventEmitter<Template> = new EventEmitter();

  constructor(public templateService : TemplateService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onClickGenerate(template: Template) {
    this.templateService.templateSelectedEvent.emit(template);
  }

  onClickEdit(template: Template) {
    console.log(template);
    this.router.navigate(['editor', template.id]);;
  }

  onClickDelete(template: Template) {
    this.deleteTemplate.emit(template);
  }

}
