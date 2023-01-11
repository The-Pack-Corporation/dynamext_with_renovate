import { TemplateVariable } from "./template-variable.model";

export class Template{

    constructor(       
        public templateName: string,
        public templateContent: string,
        public templateHTML: string,
        public templateVariables?: TemplateVariable[],
        public id?: number,
    ) {
        
    }
}