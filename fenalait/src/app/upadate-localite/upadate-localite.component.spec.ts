import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpadateLocaliteComponent } from './upadate-localite.component';

describe('UpadateLocaliteComponent', () => {
  let component: UpadateLocaliteComponent;
  let fixture: ComponentFixture<UpadateLocaliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpadateLocaliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpadateLocaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
