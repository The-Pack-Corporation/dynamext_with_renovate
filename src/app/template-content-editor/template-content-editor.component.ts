import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TemplateVariable } from '../models/template-variable.model';
import { Template } from '../models/template.model';
import { TemplateService } from '../services/template.service';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';
import { TemplateResponse } from '../template/template-list/template-list.component';
@Component({
  selector: 'app-template-content-editor',
  templateUrl: './template-content-editor.component.html',
  styleUrls: ['./template-content-editor.component.css']
})
export class TemplateContentEditorComponent implements OnInit {


  defaultType = "Text";
  variableTypeList =["Text", "Number", "Date", "Time", "Dropdown"];
  templateContent: string;
  templateHTML: string;
  templateVariables: TemplateVariable[] = [];
  templateTitle: string = "";
  templateId: number;
  editFlag: boolean;
  templateVariableToDelete: TemplateVariable;

  @ViewChild('closeModal', {static:true}) closeModal!: ElementRef;
  @ViewChild('closeTitleModal', {static:true}) closeTitleModal!: ElementRef;
  @ViewChild('variableForm', {static: true}) variableForm!: NgForm;
  @ViewChild('templateEditor', {static:true}) templateEditor! : ElementRef;
  @ViewChild('deleteConfirmation', {static:true}) deleteConfirmation: ConfirmationModalComponent;



  constructor(private renderer:Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private templateService : TemplateService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['templateId']) {
        this.templateId = +params['templateId'];
        this.addTemplateToEditor(this.templateId);  
      }
    })
  }

  addTemplateToEditor(templateId: number) {

    this.templateService.getTemplatebyTemplateId(templateId)
    .then((response) => {
      response.data.forEach((element: TemplateResponse) => {
              this.renderer.setProperty(this.templateEditor.nativeElement,
      'innerHTML', element.templateHTML);
    this.templateVariables = element.templateVariables;
    this.templateTitle = element.templateName;
    this.editFlag = true;
      });

    })
    

  }

  addTemplateToEditorByTemplate(template: Template) {
    this.renderer.setProperty(this.templateEditor.nativeElement,
      'innerHTML', template.templateHTML);
  }


  pasteHtmlAtCaret(variableName: string, selectPastedContent) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        var offsetIndex = sel.anchorOffset;
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            var el = document.createElement("div");

            var link = this.renderer.createElement('a');
            this.renderer.setAttribute(link,'contenteditable','false');
            this.renderer.setAttribute(link,'style','color:blue');
            this.renderer.setProperty(link,'innerHTML','__@'+variableName+'@__');
            this.renderer.appendChild(el, link);

            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            var firstNode = frag.firstChild;
            range.insertNode(frag);

            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                if (selectPastedContent) {
                    range.setStartBefore(firstNode);
                } else {
                    range.collapse(true);
                }
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } 
}



  onSubmitTemplateEditorContent() {
    const template = new Template(
      this.templateTitle,
      this.templateEditor.nativeElement.innerText,
      this.templateEditor.nativeElement.innerHTML,
      this.templateVariables
    );

    if(this.editFlag) {
      template.id = this.templateId;
      this.templateService.updateTemplate(template);
    } else {
      this.templateService.saveTemplate(
        template
      );  
    }
    console.log(this.templateEditor.nativeElement.innerText);
    this.templateTitle = "";
    this.closeTitleModal.nativeElement.click();
    this.router.navigate(['myTemplates']);

  }

  onSaveTemplateVariable(form : NgForm) {

    var json = form.value;
    this.templateVariables.push(
      new TemplateVariable(json.templateVariableName, json.variableType)
    );
    this.variableForm.reset();
    this.closeModal.nativeElement.click();
  }

  onDeleteTempVar(templateVariable: TemplateVariable) {
    this.templateVariableToDelete = templateVariable;
    this.deleteConfirmation.show();

  }

  onDeleteTempVarConfirmed() {
    const index = this.templateVariables.indexOf(this.templateVariableToDelete);

    if(index > -1) {
      this.templateVariables.splice(index, 1);
    }

    this.templateService.deleteTemplateVariable(this.templateVariableToDelete)
    .then(() => {
      this.deleteTemplateVariablePlaceHolder(this.templateVariableToDelete.variableName);
    })

  }

  deleteTemplateVariablePlaceHolder(templateVariableName: string) {

      let regexObj = new RegExp("__@" + templateVariableName + "@__", "ig");
      let templateContent = this.templateEditor.nativeElement.innerText;
      templateContent = templateContent.replace(regexObj, "");
      let templateHTML = this.templateEditor.nativeElement.innerHTML;
      regexObj = new RegExp('<a _ngcontent-[a-z]{3}-c52="" contenteditable="false" style="color:blue">__@'+templateVariableName+'@__+</a>', "ig");
      templateHTML = templateHTML.replace(regexObj, "");

      this.templateService.updateTemplateContentAndHtml(this.templateId, 
        templateContent, templateHTML)
      .then((result) => {
        this.templateVariableToDelete = null;
        const template = result.data[0];
        this.addTemplateToEditorByTemplate(new Template(template.templateName,
          template.templateContent, template.templateHTML, template.id));
      })
      
  }


  onDeleteTempVarCancelled() {
    this.templateVariableToDelete = null;
  }

}
