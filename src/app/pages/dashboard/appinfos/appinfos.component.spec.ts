import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppinfosComponent } from './appinfos.component';

describe('AppinfosComponent', () => {
  let component: AppinfosComponent;
  let fixture: ComponentFixture<AppinfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppinfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppinfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
