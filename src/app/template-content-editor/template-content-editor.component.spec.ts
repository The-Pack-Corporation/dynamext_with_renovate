import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateContentEditorComponent } from './template-content-editor.component';

describe('TemplateContentEditorComponent', () => {
  let component: TemplateContentEditorComponent;
  let fixture: ComponentFixture<TemplateContentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateContentEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateContentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
