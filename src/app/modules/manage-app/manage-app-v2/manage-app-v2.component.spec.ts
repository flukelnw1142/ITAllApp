import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppV2Component } from './manage-app-v2.component';

describe('ManageAppV2Component', () => {
  let component: ManageAppV2Component;
  let fixture: ComponentFixture<ManageAppV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAppV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAppV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
