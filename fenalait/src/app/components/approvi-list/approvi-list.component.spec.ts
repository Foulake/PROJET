import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproviListComponent } from './approvi-list.component';

describe('ApproviListComponent', () => {
  let component: ApproviListComponent;
  let fixture: ComponentFixture<ApproviListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproviListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproviListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
