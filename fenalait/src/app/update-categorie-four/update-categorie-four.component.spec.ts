import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategorieFourComponent } from './update-categorie-four.component';

describe('UpdateCategorieFourComponent', () => {
  let component: UpdateCategorieFourComponent;
  let fixture: ComponentFixture<UpdateCategorieFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCategorieFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategorieFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
