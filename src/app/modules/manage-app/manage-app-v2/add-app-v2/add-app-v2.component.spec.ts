import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppV2Component } from './add-app-v2.component';

describe('AddAppV2Component', () => {
  let component: AddAppV2Component;
  let fixture: ComponentFixture<AddAppV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAppV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAppV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
