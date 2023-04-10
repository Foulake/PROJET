import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApproviComponent } from './add-approvi.component';

describe('AddApproviComponent', () => {
  let component: AddApproviComponent;
  let fixture: ComponentFixture<AddApproviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApproviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApproviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
