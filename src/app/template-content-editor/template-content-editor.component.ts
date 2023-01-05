import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TemplateVariabe } from '../models/template-variable.model';
import { Template } from '../models/template.model';
import { TemplateService } from '../services/template.service';
@Component({
  selector: 'app-template-content-editor',
  templateUrl: './template-content-editor.component.html',
  styleUrls: ['./template-content-editor.component.css']
})
export class TemplateContentEditorComponent implements OnInit {

  defaultType = "Text";
  variableTypeList =["Text", "Number", "Date", "Time", "Dropdown"];
  templateVariables: TemplateVariabe[] = [];
  templateTitle = ""

  @ViewChild('closeModal', {static:true}) closeModal!: ElementRef;
  @ViewChild('closeTitleModal', {static:true}) closeTitleModal!: ElementRef;
  @ViewChild('variableForm', {static: true}) variableForm!: NgForm;
  @ViewChild('templateEditor', {static:true}) templateEditor! : ElementRef;


  constructor(private renderer:Renderer2,
    private router: Router,
    private templateService : TemplateService) { }

  ngOnInit(): void {
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
    this.templateService.saveTemplate(
      new Template(
        this.templateTitle,
        this.templateEditor.nativeElement.innerText,
        this.templateEditor.nativeElement.innerHTML,
        this.templateVariables
      )
    );
    console.log(this.templateEditor.nativeElement.innerText);
    this.templateTitle = "";
    this.closeTitleModal.nativeElement.click();
    this.router.navigate(['myTemplates']);

  }

  onSaveTemplateVariable(form : NgForm) {

    var json = form.value;
    this.templateVariables.push(
      new TemplateVariabe(json.templateVariableName, json.variableType)
    );
    this.variableForm.reset();
    this.closeModal.nativeElement.click();
  }

}
