import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocaliteComponent } from './update-localite.component';

describe('UpdateLocaliteComponent', () => {
  let component: UpdateLocaliteComponent;
  let fixture: ComponentFixture<UpdateLocaliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLocaliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLocaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
