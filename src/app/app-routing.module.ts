import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { TemplateContentEditorComponent } from "./template-content-editor/template-content-editor.component";
import { TemplateListComponent } from "./template/template-list/template-list.component";
import { TemplateComponent } from "./template/template.component";
import { AuthGuardService } from "./services/auth-guard.service";

const appRoutes: Routes = [
    {path : '', redirectTo: '/auth', pathMatch: 'full'},
    {path : 'auth', component: AuthenticationComponent},
    {path : 'editor', canActivate:[AuthGuardService], component: TemplateContentEditorComponent},
    {path : 'editor/:templateId', canActivate:[AuthGuardService], component: TemplateContentEditorComponent},
    {path : 'myTemplates', canActivate:[AuthGuardService], component: TemplateListComponent}
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes) ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}