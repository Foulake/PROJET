import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatProduitComponent } from './add-cat-produit.component';

describe('AddCatProduitComponent', () => {
  let component: AddCatProduitComponent;
  let fixture: ComponentFixture<AddCatProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCatProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCatProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
