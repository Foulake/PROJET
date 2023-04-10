import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaiementEmplComponent } from './add-paiement-empl.component';

describe('AddPaiementEmplComponent', () => {
  let component: AddPaiementEmplComponent;
  let fixture: ComponentFixture<AddPaiementEmplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaiementEmplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPaiementEmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
