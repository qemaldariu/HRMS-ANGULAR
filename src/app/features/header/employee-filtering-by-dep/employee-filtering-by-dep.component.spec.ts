import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFilteringByDepComponent } from './employee-filtering-by-dep.component';

describe('EmployeeFilteringByDepComponent', () => {
  let component: EmployeeFilteringByDepComponent;
  let fixture: ComponentFixture<EmployeeFilteringByDepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeFilteringByDepComponent]
    });
    fixture = TestBed.createComponent(EmployeeFilteringByDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
