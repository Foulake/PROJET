import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCatfourComponent } from './update-catfour.component';

describe('UpdateCatfourComponent', () => {
  let component: UpdateCatfourComponent;
  let fixture: ComponentFixture<UpdateCatfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCatfourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCatfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
