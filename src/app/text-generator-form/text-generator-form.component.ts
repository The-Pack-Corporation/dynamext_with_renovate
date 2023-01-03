import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Template } from '../models/template.model';

@Component({
  selector: 'app-text-generator-form',
  templateUrl: './text-generator-form.component.html',
  styleUrls: ['./text-generator-form.component.css']
})
export class TextGeneratorFormComponent implements OnInit {

  template: Template;
  textGeneratorForm : FormGroup
  isFormSubmitted : boolean = false;
  generatedText : string;
  
  @ViewChild('showModal', {static : false}) showModal : ElementRef;
  @ViewChild('finalText', {static:true}) finalText! : ElementRef;


  constructor(private renderer : Renderer2) { }

  ngOnInit(): void {
  }

  show(template: Template) {
    
    this.textGeneratorForm = new FormGroup({});
    this.template = template;
    for( let data of this.template.templateVariables) {
      this.textGeneratorForm.addControl(data.variableName, new FormControl("", Validators.email));
    }  
    this.showModal.nativeElement.click();

  }

  onFormSubmit() {
    console.log(this.template);
    console.log(this.textGeneratorForm.value);
    var finalText = this.template.templateContent;
    var textReplaceable = this.textGeneratorForm.value;
    for (let property in textReplaceable) {
        var dynamicPart = property;
        var regexObj = new RegExp("__@" + dynamicPart + "@__", "ig");
        finalText = finalText.replace(regexObj, textReplaceable[property]);
    }
    this.isFormSubmitted = true;
    this.generatedText = finalText;


    // const p = 'The __$quick$__ brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

    // console.log(p.replaceAll('dog', 'monkey'));
    // expected output: "The quick brown fox jumps over the lazy monkey. If the monkey reacted, was it really lazy?"


    // Global flag required when calling replaceAll with regex

    // const regex = /__\$[A-Za-z0-9]*\$__/ig;
    // console.log(p.replaceAll(regex, 'ferret'));
    //gmix
  }


}
