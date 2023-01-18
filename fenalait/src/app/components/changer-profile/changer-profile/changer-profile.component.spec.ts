import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerProfileComponent } from './changer-profile.component';

describe('ChangerProfileComponent', () => {
  let component: ChangerProfileComponent;
  let fixture: ComponentFixture<ChangerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangerProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
