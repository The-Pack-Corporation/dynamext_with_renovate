import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextGeneratorFormComponent } from './text-generator-form.component';

describe('TextGeneratorFormComponent', () => {
  let component: TextGeneratorFormComponent;
  let fixture: ComponentFixture<TextGeneratorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextGeneratorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextGeneratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
