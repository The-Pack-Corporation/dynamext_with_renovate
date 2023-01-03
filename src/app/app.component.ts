import { Component, OnInit, ViewChild } from '@angular/core';
import { TextGeneratorFormComponent } from './text-generator-form/text-generator-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamext';

  @ViewChild('modal', {static : false}) modal : TextGeneratorFormComponent;


}
