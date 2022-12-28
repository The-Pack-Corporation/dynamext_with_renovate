import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TemplateContentEditorComponent } from './template-content-editor/template-content-editor.component';
import { TemplateComponent } from './template/template.component';
import { TemplateItemComponent } from './template/template-item/template-item.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { CreateTemplateComponent } from './template/create-template/create-template.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TemplateContentEditorComponent,
    TemplateComponent,
    TemplateItemComponent,
    TemplateListComponent,
    CreateTemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
