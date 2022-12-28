import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-template-content-editor',
  templateUrl: './template-content-editor.component.html',
  styleUrls: ['./template-content-editor.component.css']
})
export class TemplateContentEditorComponent implements OnInit {

  defaultType = "default"
  variableType =["1", "2", "3", "default"];
  templateVariables = ["text", "number", "date"];

  @ViewChild('templateEditor', {static:true}) templateEditor! : ElementRef;

  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
  }


  onSubmitTemplateEditorContent() {
    console.log(this.templateEditor.nativeElement.innerHTML);
  }

  onSaveTemplateVariable(form : NgForm) {
    console.log(form);
  }

}
