import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementEmpListComponent } from './paiement-emp-list.component';

describe('PaiementEmpListComponent', () => {
  let component: PaiementEmpListComponent;
  let fixture: ComponentFixture<PaiementEmpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementEmpListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementEmpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
