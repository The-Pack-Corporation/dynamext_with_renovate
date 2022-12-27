import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TemplateContentEditorComponent } from './template-content-editor/template-content-editor.component';
import { TemplateComponent } from './template/template.component';
import { TemplateItemComponent } from './template/template-item/template-item.component';
import { TemplateListComponent } from './template/template-list/template-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TemplateContentEditorComponent,
    TemplateComponent,
    TemplateItemComponent,
    TemplateListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
