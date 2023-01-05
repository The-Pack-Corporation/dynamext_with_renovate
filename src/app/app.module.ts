import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TemplateContentEditorComponent } from './template-content-editor/template-content-editor.component';
import { TemplateComponent } from './template/template.component';
import { TemplateItemComponent } from './template/template-item/template-item.component';
import { TemplateListComponent } from './template/template-list/template-list.component';
import { AppRoutingModule } from './app-routing.module';
import { TextGeneratorFormComponent } from './text-generator-form/text-generator-form.component';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TemplateContentEditorComponent,
    TemplateComponent,
    TemplateItemComponent,
    TemplateListComponent,
    TextGeneratorFormComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
